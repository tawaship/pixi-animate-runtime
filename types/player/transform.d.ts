import * as PIXI from 'pixi.js';
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
export declare class CjsTransform extends PIXI.Transform {
    /** createjs rotation, in degrees */
    degRotation: number;
    /** createjs skewX / skewY, in degrees */
    degSkewX: number;
    degSkewY: number;
    /** The radians last written to the Pixi fields for the values above */
    private _radRotation;
    private _radSkewX;
    private _radSkewY;
    setRotation(degrees: number): void;
    setSkewX(degrees: number): void;
    setSkewY(degrees: number): void;
    protected updateSkew(): void;
}
