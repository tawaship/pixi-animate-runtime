import * as PIXI from 'pixi.js';
import { DisplayObject, Container } from './display';
import { Rectangle } from './geom';
import { Event, EventDispatcher } from './events';
import { MovieClip, TScript, TWriter, TMemberWriter } from './movieclip';
import { Shape, Graphics, Sprite, SpriteSheet, Bitmap, Text, ColorFilter, ButtonHelper, ITextureSource, IImageAsset } from './objects';
import { IRuntimeData, IRuntimeMovieClipDef, IRuntimeSlotDef, ISpriteDef, IBitmapDef } from './data';
export type TMovieClipClass = new (mode?: string | null, startPosition?: number | null, loop?: boolean | number | null) => MovieClip;
export type TSpriteClass = new () => Sprite;
export type TBitmapClass = new () => Bitmap;
export type TSymbolClass = TMovieClipClass | TSpriteClass | TBitmapClass;
/**
 * The symbol classes of a content by symbol id: what published code calls `lib`.
 */
export interface ILibrary {
    [id: string]: TSymbolClass;
}
/**
 * The createjs-compatible names frame scripts reach as `cjs` / `createjs`.
 */
export declare const namespace: {
    DisplayObject: typeof DisplayObject;
    Container: typeof Container;
    MovieClip: typeof MovieClip;
    Shape: typeof Shape;
    Graphics: typeof Graphics;
    Sprite: typeof Sprite;
    SpriteSheet: typeof SpriteSheet;
    Bitmap: typeof Bitmap;
    Text: typeof Text;
    ColorFilter: typeof ColorFilter;
    ButtonHelper: typeof ButtonHelper;
    Event: typeof Event;
    EventDispatcher: typeof EventDispatcher;
    Rectangle: typeof Rectangle;
    Point: typeof PIXI.Point;
};
export type TNamespace = typeof namespace;
/** What frame scripts get for the template's global playSound: nothing is played */
export interface ISilentSound {
    paused: boolean;
    volume: number;
    addEventListener(): void;
    removeEventListener(): void;
    on(): void;
    stop(): void;
    play(): void;
}
export interface IGeneratedContent {
    data: IRuntimeData;
    scripts: TScript[];
    writers: TWriter[];
    memberWriters: TMemberWriter[];
}
/**
 * What runtime content exports: given the names frame scripts refer
 * to, it returns the content's data and its frame scripts (as code, closed
 * over those names). exportRoot and stage are passed as undefined: they are
 * the template's root and stage, which a player of any symbol does not have.
 */
export type TContentFactory = (cjs: TNamespace, createjs: TNamespace, lib: ILibrary, exportRoot: undefined, stage: undefined, playSound: () => ISilentSound) => IGeneratedContent;
export interface IContentAssets {
    /** Textures of the manifest images (sprite sheet atlases included), by manifest id */
    images?: {
        [id: string]: PIXI.Texture;
    };
}
/** A value of the published lib.properties (width, height, fps, color, ...) */
export type TContentProperty = number | string | boolean | null;
export interface IContentProperties {
    [key: string]: TContentProperty;
}
/**
 * A loaded content, as the application uses it.
 */
export interface IContent {
    /** The composition id (lib.properties.id of the published content) */
    readonly id: string;
    /** The symbol classes by symbol name: what frame scripts reach as `lib` */
    readonly lib: ILibrary;
    /** The values of the published lib.properties (its lists, such as the manifest, left out) */
    readonly properties: Readonly<IContentProperties>;
    /**
     * An instance of a symbol for the application to place, set up as the HTML
     * template sets up the root it creates.
     */
    create(id: string): DisplayObject;
}
/** A MovieClip symbol as the player builds its instances from: its slots with every field */
interface IMovieClipPlan extends Omit<IRuntimeMovieClipDef, 'slots'> {
    slots: IRuntimeSlotDef[];
}
/**
 * A content: the symbol classes built from generated data, sharing one
 * definition per symbol. Not part of the API: applications get an IContent.
 * @internal
 */
export declare class Content implements ITextureSource {
    readonly data: IRuntimeData;
    readonly scripts: TScript[];
    readonly writers: TWriter[];
    readonly memberWriters: TMemberWriter[];
    readonly lib: ILibrary;
    readonly images: {
        [id: string]: IImageAsset;
    };
    /** One Graphics per drawing of the content, shared by every symbol that shows it */
    readonly graphics: Graphics[];
    readonly spriteSheets: {
        [name: string]: SpriteSheet;
    };
    private readonly _frameAssets;
    constructor(factory: TContentFactory, assets?: IContentAssets);
    /**
     * Sets the textures of the content's images (by manifest id) and the sprite
     * sheets cut from them. Done before any instance is made: the constructor's
     * assets, or the textures a loader read for the content afterwards.
     */
    _applyImages(textures: {
        [id: string]: PIXI.Texture;
    }): void;
    image(id: string): PIXI.Texture | null;
    frame(sheet: string, index: number): PIXI.Texture | null;
    imageAsset(id: string): IImageAsset | null;
    /** The image a frame of a sheet is drawn into for a bitmap fill (named after the atlas and the frame) */
    frameAsset(sheet: string, index: number): IImageAsset | null;
    /**
     * An instance of a symbol for the application to place, set up as the HTML
     * template sets up the root it creates: a clip that re-caches its children's
     * color effects (it has a filterCacheList) gets the filter cache handling,
     * which published code otherwise gets from the symbol that creates it (an
     * instance made by `new lib[id]()` in a frame script gets none, as in
     * CreateJS). The handling does not change what the player draws (it draws
     * color effects without caches); it keeps the instance's state the
     * template's.
     */
    create(id: string): DisplayObject;
    private _movieClipClass;
    private _spriteClass;
    private _bitmapClass;
    private _sheet;
    private _image;
    _applySprite(sprite: Sprite, def: ISpriteDef | null): void;
    _applyBitmap(bitmap: Bitmap, def: IBitmapDef | null): void;
    private _createSlot;
    /**
     * Builds an instance of a MovieClip symbol: what the published
     * constructor builds, from the shared definition.
     */
    _populate(self: MovieClip, def: IMovieClipPlan, graphics: Graphics[]): void;
}
/**
 * What the application gets of a content: the content itself stays out of
 * reach, the methods closing over it.
 */
export declare function contentInterface(content: Content): IContent;
/**
 * Plays one frame of a display tree the way createjs does on a stage update:
 * the tick phase (playheads advance, children in reverse order, tick
 * listeners), then the resolve phase (each MovieClip settles its timeline,
 * children in reverse order).
 */
export declare function tick(root: DisplayObject, event?: Event): void;
/**
 * The resolve phase alone: each MovieClip settles its timeline (children in
 * reverse order), without playing a frame.
 */
export declare function resolveState(node: DisplayObject): void;
export {};
