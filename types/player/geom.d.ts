import * as PIXI from 'pixi.js';
/**
 * createjs-compatible Rectangle (its own members are exactly x, y, width,
 * height, as createjs's; Pixi's Rectangle also carries a shape type).
 */
export declare class Rectangle {
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(x?: number, y?: number, width?: number, height?: number);
    setValues(x?: number, y?: number, width?: number, height?: number): this;
    copy(rect: Rectangle): this;
    clone(): Rectangle;
    contains(x: number, y: number, width?: number, height?: number): boolean;
    isEmpty(): boolean;
    toPixi(): PIXI.Rectangle;
    toString(): string;
}
