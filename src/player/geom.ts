import * as PIXI from 'pixi.js';

/**
 * createjs-compatible Rectangle (its own members are exactly x, y, width,
 * height, as createjs's; Pixi's Rectangle also carries a shape type).
 */
export class Rectangle {
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(x?: number, y?: number, width?: number, height?: number) {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
	}

	setValues(x?: number, y?: number, width?: number, height?: number): this {
		this.x = x || 0;
		this.y = y || 0;
		this.width = width || 0;
		this.height = height || 0;
		return this;
	}

	copy(rect: Rectangle): this {
		return this.setValues(rect.x, rect.y, rect.width, rect.height);
	}

	clone(): Rectangle {
		return new Rectangle(this.x, this.y, this.width, this.height);
	}

	contains(x: number, y: number, width?: number, height?: number): boolean {
		const w = width || 0;
		const h = height || 0;
		return x >= this.x && x + w <= this.x + this.width && y >= this.y && y + h <= this.y + this.height;
	}

	isEmpty(): boolean {
		return this.width <= 0 || this.height <= 0;
	}

	toPixi(): PIXI.Rectangle {
		return new PIXI.Rectangle(this.x, this.y, this.width, this.height);
	}

	toString(): string {
		return '[Rectangle (x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height + ')]';
	}
}
