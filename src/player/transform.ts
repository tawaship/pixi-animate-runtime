import * as PIXI from 'pixi.js';

const DEG_TO_RAD = Math.PI / 180;
const RAD_TO_DEG = 180 / Math.PI;

/**
 * A Pixi Transform whose rotation and skew follow createjs.
 *
 * - The createjs values (degrees) are kept as written, so that reading them
 *   back gives exactly what was written (a degrees -> radians -> degrees round
 *   trip does not)
 * - Pixi's own fields carry the same values in Pixi's terms (rotation in
 *   radians, skew.x = -skewX, skew.y = skewY, all in radians), so code that
 *   uses the Pixi node sees consistent values. A write made through Pixi
 *   (node.rotation, node.skew) is taken over as the new createjs value
 * - The local matrix is built the createjs way: skew x (rotation x scale),
 *   i.e. the object is rotated first and then skewed. Pixi composes rotation
 *   and skew the other way round (skewed, then rotated as a whole); the two
 *   agree only while the rotation is 0 or skewX equals skewY. Published
 *   content is the reference, so createjs's composition is used
 */
export class CjsTransform extends PIXI.Transform {
	/** createjs rotation, in degrees */
	degRotation = 0;
	/** createjs skewX / skewY, in degrees */
	degSkewX = 0;
	degSkewY = 0;

	/** The radians last written to the Pixi fields for the values above */
	private _radRotation = 0;
	private _radSkewX = 0;
	private _radSkewY = 0;

	setRotation(degrees: number): void {
		this.degRotation = degrees;
		this._radRotation = degrees * DEG_TO_RAD;
		if (this._rotation !== this._radRotation) {
			this._rotation = this._radRotation;
		}
		this.updateSkew();
	}

	setSkewX(degrees: number): void {
		this.degSkewX = degrees;
		this._radSkewX = -degrees * DEG_TO_RAD;
		// Setting the point calls updateSkew when the value changes
		this.skew.x = this._radSkewX;
		this.updateSkew();
	}

	setSkewY(degrees: number): void {
		this.degSkewY = degrees;
		this._radSkewY = degrees * DEG_TO_RAD;
		this.skew.y = this._radSkewY;
		this.updateSkew();
	}

	protected updateSkew(): void {
		// Values written through Pixi become the createjs values
		if (this._rotation !== this._radRotation) {
			this._radRotation = this._rotation;
			this.degRotation = this._rotation * RAD_TO_DEG;
		}
		if (this.skew.x !== this._radSkewX) {
			this._radSkewX = this.skew.x;
			this.degSkewX = -this.skew.x * RAD_TO_DEG;
		}
		if (this.skew.y !== this._radSkewY) {
			this._radSkewY = this.skew.y;
			this.degSkewY = this.skew.y * RAD_TO_DEG;
		}

		// createjs Matrix2D.appendTransform: (skew) x (rotation, scale)
		let cos = 1;
		let sin = 0;
		if (this.degRotation % 360) {
			const r = this.degRotation * DEG_TO_RAD;
			cos = Math.cos(r);
			sin = Math.sin(r);
		}

		if (this.degSkewX || this.degSkewY) {
			const skewX = this.degSkewX * DEG_TO_RAD;
			const skewY = this.degSkewY * DEG_TO_RAD;
			const a1 = Math.cos(skewY);
			const b1 = Math.sin(skewY);
			const c1 = -Math.sin(skewX);
			const d1 = Math.cos(skewX);
			this._cx = a1 * cos + c1 * sin;
			this._sx = b1 * cos + d1 * sin;
			this._cy = a1 * -sin + c1 * cos;
			this._sy = b1 * -sin + d1 * cos;
		} else {
			this._cx = cos;
			this._sx = sin;
			this._cy = -sin;
			this._sy = cos;
		}

		this._localID++;
	}
}
