import * as PIXI from 'pixi.js';
import { DisplayObject, Container, IOwnedNode } from './display';
import { Event } from './events';
import { Rectangle } from './geom';
import type { IGraphicsCommandDef, TDataValue } from './data';
export declare class PixiGraphics extends PIXI.Graphics implements IOwnedNode {
    owner: DisplayObject | null;
    /**
     * Shows another (shared) geometry. Pixi 5 can share a geometry between
     * Graphics (new Graphics(geometry), as clone() does) but has no way to
     * change it afterwards, and does not declare the field that holds it; it is
     * set by name here, and what Pixi derives from the geometry (the batches,
     * their vertices and tint) is marked stale so it is built again.
     */
    setGeometry(geometry: PIXI.GraphicsGeometry): void;
    /**
     * Pixi 5's Graphics keeps the blend mode in the batches it builds, and
     * builds them again only when the geometry changes: a blend mode set later
     * would not be drawn. The batches are marked stale so they are built again.
     */
    setBlendMode(mode: PIXI.BLEND_MODES): void;
}
export declare class PixiSprite extends PIXI.Sprite implements IOwnedNode {
    owner: DisplayObject | null;
}
export declare class PixiText extends PIXI.Text implements IOwnedNode {
    owner: DisplayObject | null;
}
/**
 * Where a content's images come from: manifest images by id, and frames of
 * its sprite sheets (the images published code draws from a frame for a
 * bitmap fill).
 */
export interface ITextureSource {
    image(id: string): PIXI.Texture | null;
    frame(sheet: string, index: number): PIXI.Texture | null;
    imageAsset(id: string): IImageAsset | null;
    frameAsset(sheet: string, index: number): IImageAsset | null;
}
interface IColor {
    color: number;
    alpha: number;
}
/**
 * A CSS color as createjs writes it (#RGB, #RRGGBB, rgb(), rgba(), a few names).
 */
export declare function parseColor(value: TDataValue | undefined): IColor | null;
/**
 * A linear or radial gradient as createjs makes it (the props of a Fill or
 * Stroke style made by beginLinearGradientFill and the like): colors at
 * ratios along the line from (x0, y0) to (x1, y1), or between the circles
 * (x0, y0, r0) and (x1, y1, r1), in the shape's coordinates.
 */
export interface IGradient {
    type: 'linear' | 'radial';
    colors: string[];
    ratios: number[];
    x0: number;
    y0: number;
    r0: number;
    x1: number;
    y1: number;
    r1: number;
}
/**
 * A gradient drawn into a canvas by the browser's own gradient (so its
 * colors are what canvas, and createjs, paints), as a texture that Pixi's
 * Graphics fills and strokes with through a matrix. `gradient` is the
 * gradient in the shape's coordinates, `local` the same gradient in the
 * texture's pixels, and `toShape` takes texture pixels to the shape's
 * coordinates. Outside the drawn area the texture's edge pixels repeat
 * (Pixi clamps), which is how canvas pads a gradient with its end colors.
 */
export declare class GradientTexture extends PIXI.Texture {
    readonly gradient: IGradient;
    readonly local: IGradient;
    readonly toShape: PIXI.Matrix;
    constructor(canvas: HTMLCanvasElement, gradient: IGradient, local: IGradient, toShape: PIXI.Matrix);
}
/**
 * Draws createjs drawing commands into a Pixi Graphics. Pixi takes the paint
 * first, so each path is replayed under the paint that follows it, with the
 * holes canvas's nonzero fill would cut (holes: the MoveTo commands that
 * start holes, see Graphics.holes).
 */
export declare function drawCommands(target: PIXI.Graphics, commands: IGraphicsCommandDef[], textures: ITextureSource, holes?: IGraphicsCommandDef[] | null): void;
/**
 * A drawing command as createjs keeps it (Graphics.MoveTo, Graphics.Fill, ...):
 * the command's own properties, with fill and stroke styles as objects whose
 * `props` are the arguments they were made with.
 */
export declare class GraphicsCommand {
}
/** The createjs drawing command class names */
export declare const GRAPHICS_COMMANDS: string[];
/**
 * Draws the path of createjs drawing commands filled, ignoring their fills
 * and strokes: the shape a createjs mask clips with (all the drawing as one
 * path, with the holes named by holes, see Graphics.maskHoles).
 */
export declare function drawMaskPath(target: PIXI.Graphics, commands: IGraphicsCommandDef[], holes?: IGraphicsCommandDef[] | null): void;
/**
 * createjs-compatible Graphics holding the drawing commands of a definition.
 */
export declare class Graphics {
    readonly commands: IGraphicsCommandDef[];
    readonly textures: ITextureSource;
    private _instructions;
    private _holes;
    private _maskHoles;
    private _geometry;
    private _maskGeometry;
    constructor(commands: IGraphicsCommandDef[], textures: ITextureSource);
    /** The commands as createjs's command objects (made when first read) */
    get instructions(): GraphicsCommand[];
    isEmpty(): boolean;
    /**
     * The MoveTo commands that start holes in the filled paths (worked out once
     * per drawing and shared by every shape that shows it)
     */
    holes(): IGraphicsCommandDef[];
    /**
     * The drawing as a Pixi geometry, drawn the first time it is asked for and
     * shared from then on by every shape that shows this drawing (a shape's
     * Pixi node must therefore not be drawn into: that would change it for all)
     */
    geometry(): PIXI.GraphicsGeometry;
    /** The drawing as a mask (its path filled), shared the same way */
    maskGeometry(): PIXI.GraphicsGeometry;
    /** The holes of the drawing as a mask (all of it one path) */
    maskHoles(): IGraphicsCommandDef[];
}
/**
 * createjs-compatible Shape on a Pixi Graphics.
 */
export declare class Shape extends DisplayObject {
    readonly pixiGraphics: PixiGraphics;
    private _graphics;
    /** The shape as a mask (made when first used as one), a child of this shape's node */
    private _maskGraphics;
    constructor(graphics?: Graphics | null);
    get graphics(): Graphics | null;
    set graphics(value: Graphics | null);
    _clipsAsMask(): boolean;
    _setBlendMode(mode: PIXI.BLEND_MODES): void;
    /**
     * createjs clips with the shape's path alone (Graphics.drawAsPath, then
     * clip), whatever its fill and stroke; published masks are paths with no
     * fill. The mask node is that path, filled. It is a child of the shape's
     * node, so it moves with the shape (the shape's own node is not drawn while
     * it serves as a mask).
     */
    _pixiMaskNode(): PIXI.Container;
    _releaseMaskNode(): void;
    toString(): string;
}
/**
 * A frame of a sprite sheet, as createjs describes it.
 */
export interface ISpriteFrame {
    image: IImageAsset;
    rect: Rectangle;
}
/**
 * An image as content sees it (`src` names it).
 */
export interface IImageAsset {
    src: string;
    texture: PIXI.Texture;
}
/**
 * createjs-compatible SpriteSheet: frames cut from an atlas image.
 */
export declare class SpriteSheet {
    readonly frames: ISpriteFrame[];
    readonly textures: PIXI.Texture[];
    framerate: number;
    complete: boolean;
    constructor(image: IImageAsset, rects: number[][]);
    getFrame(index: number): ISpriteFrame | null;
    getNumFrames(): number;
}
/**
 * createjs-compatible Sprite (frame by frame from a sprite sheet).
 */
export declare class Sprite extends DisplayObject {
    readonly pixiSprite: PixiSprite;
    spriteSheet: SpriteSheet;
    currentFrame: number;
    paused: boolean;
    framerate: number;
    constructor(spriteSheet: SpriteSheet, frame?: number);
    play(): void;
    stop(): void;
    gotoAndPlay(frame: number): void;
    gotoAndStop(frame: number): void;
    advance(): void;
    _goto(frame: number): void;
    _tick(event: Event): void;
    _setBlendMode(mode: PIXI.BLEND_MODES): void;
    toString(): string;
}
/**
 * createjs-compatible Bitmap.
 */
export declare class Bitmap extends DisplayObject {
    readonly pixiSprite: PixiSprite;
    private _image;
    private _sourceRect;
    constructor(image?: IImageAsset | null);
    get image(): IImageAsset | null;
    set image(value: IImageAsset | null);
    get sourceRect(): Rectangle | null;
    set sourceRect(value: Rectangle | null);
    private _updateTexture;
    _setBlendMode(mode: PIXI.BLEND_MODES): void;
    toString(): string;
}
/**
 * createjs-compatible Text on a Pixi Text.
 */
export declare class Text extends DisplayObject {
    readonly pixiText: PixiText;
    private _text;
    private _font;
    private _color;
    private _textAlign;
    private _textBaseline;
    private _lineHeight;
    private _lineWidth;
    private _maxWidth;
    private _outline;
    constructor(text?: string, font?: string, color?: string);
    get text(): string;
    set text(value: string);
    get font(): string;
    set font(value: string);
    get color(): string;
    set color(value: string);
    get textAlign(): string;
    set textAlign(value: string);
    get textBaseline(): string;
    set textBaseline(value: string);
    get lineHeight(): number;
    set lineHeight(value: number);
    get lineWidth(): number | null;
    set lineWidth(value: number | null);
    get maxWidth(): number | null;
    set maxWidth(value: number | null);
    get outline(): number;
    set outline(value: number);
    private _updateText;
    _setBlendMode(mode: PIXI.BLEND_MODES): void;
    toString(): string;
}
/**
 * createjs-compatible ColorFilter on a Pixi ColorMatrixFilter.
 */
export declare class ColorFilter {
    readonly pixiFilter: PIXI.filters.ColorMatrixFilter;
    private _values;
    constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number, redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number);
    get redMultiplier(): number;
    set redMultiplier(value: number);
    get greenMultiplier(): number;
    set greenMultiplier(value: number);
    get blueMultiplier(): number;
    set blueMultiplier(value: number);
    get alphaMultiplier(): number;
    set alphaMultiplier(value: number);
    get redOffset(): number;
    set redOffset(value: number);
    get greenOffset(): number;
    set greenOffset(value: number);
    get blueOffset(): number;
    set blueOffset(value: number);
    get alphaOffset(): number;
    set alphaOffset(value: number);
    private _set;
    private _updateMatrix;
    toString(): string;
}
/**
 * Members ButtonHelper needs from its target (a MovieClip).
 */
export interface IButtonTarget extends Container {
    paused: boolean;
    actionsEnabled: boolean;
    gotoAndPlay(frame: string | number): void;
    gotoAndStop(frame: string | number): void;
    _reset(): void;
}
/**
 * createjs-compatible ButtonHelper: sends its target to the out / over /
 * down frames on mouse events, and stops it on the out frame from the start.
 */
export declare class ButtonHelper {
    readonly target: IButtonTarget;
    overLabel: string | number;
    outLabel: string | number;
    downLabel: string | number;
    play: boolean;
    _isPressed: boolean;
    _isOver: boolean;
    _enabled: boolean;
    private _originalReset;
    constructor(target: IButtonTarget, outLabel?: string | number | null, overLabel?: string | number | null, downLabel?: string | number | null, play?: boolean, hitArea?: IButtonTarget | null, hitLabel?: string | number | null);
    get enabled(): boolean;
    set enabled(value: boolean);
    handleEvent(event: Event): void;
    toString(): string;
}
export {};
