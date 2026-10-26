/**
 * The data of runtime content (what the generator writes and the player reads): the definition
 * extracted by @tawaship/animate-data-converter, with every frame script
 * taken out of the data and referenced by its index in the runtime content's
 * script list (the scripts themselves are code in the runtime content), and with
 * the writes of each tween and of each instance's initial values compiled
 * into writer functions (code in the runtime content as well, referenced by index).
 * Drawings are gathered into one table for the whole content, identical
 * ones merged, and a symbol refers to them by index.
 */
import type { IMovieClipSymbolDef, ISpriteSymbolDef, IBitmapSymbolDef, ITweenDef, IPropMapDef, ISlotDef, IManifestEntryDef, ISpriteSheetDef, IGraphicsDef, TFrameValue } from '@tawaship/animate-data-converter';
export type { ISlotDef, ITweenDef, IStateEntryDef, IGraphicsDef, IGraphicsCommandDef, ISpriteDef, IBitmapDef, IFilterDef, ICacheDef, IButtonDef, IFilterCacheEntryDef, IRectDef, IDataMap, IPropMapDef, IManifestEntryDef, ISpriteSheetDef, ILabelDef, IMemberDef, TTargetDef, TFrameValue, TDataValue, ISpriteSymbolDef, IBitmapSymbolDef } from '@tawaship/animate-data-converter';
/**
 * The pixi-animate-runtime versions whose runtime content this player plays
 * (npm's range notation). Raised when the player stops playing runtime
 * content older versions made.
 */
export declare const RUNTIME_CONTENT_RANGE = "0.x";
export interface IRuntimeActionDef {
    /** Timeline position the action sits on */
    position: number;
    /** Index into the runtime content's script list */
    script: number;
    params: TFrameValue[] | null;
}
export interface IRuntimeTweenDef extends Omit<ITweenDef, 'actions' | 'frames'> {
    actions: IRuntimeActionDef[];
    /** The tween's distinct frame values (each the values of its props, in order) */
    values: TFrameValue[][];
    /** For every position, the index of its values in values (a position holding the same values as another shares them) */
    frames: number[];
    /**
     * Index into the runtime content's writer list: the function that writes a frame's
     * values (values[frames[position]]) to the target, one property after another by
     * name (null when the tween writes no property)
     */
    writer: number | null;
}
/**
 * A slot as the player uses it. Its initial values are in code only (the
 * writer), not in the data.
 */
export interface IRuntimeSlotDef extends Omit<ISlotDef, 'init'> {
    /** Index into the runtime content's writer list: the function that writes the slot's initial values (initValues) */
    initWriter: number | null;
    /** The slot's initial values, in the order its writer writes them */
    initValues: TFrameValue[] | null;
}
/** The values a slot's fields have when runtime content leaves them out */
export declare const SLOT_DEFAULTS: Omit<IRuntimeSlotDef, 'kind'>;
/** A slot as written in runtime content: its kind, and the fields not at their defaults (SLOT_DEFAULTS) */
export type TRuntimeSlotData = Pick<IRuntimeSlotDef, 'kind'> & Partial<Omit<IRuntimeSlotDef, 'kind'>>;
/** A slot with the fields runtime content left out at their defaults */
export declare function slotOf(data: TRuntimeSlotData): IRuntimeSlotDef;
export interface IRuntimeMovieClipDef extends Omit<IMovieClipSymbolDef, 'tweens' | 'slots' | 'graphics' | 'members'> {
    /** The slots as written (fields at their defaults left out; slotOf fills them in) */
    slots: TRuntimeSlotData[];
    tweens: IRuntimeTweenDef[];
    /**
     * Index into the runtime content's member writer list: the function that
     * gives an instance its named children (`this.instance = ...`), or null
     * when it has none
     */
    memberWriter: number | null;
    /**
     * The symbol's drawings as indexes into the content's drawing table
     * (graphics[n] is the drawing the symbol's slots and tween values call n)
     */
    graphics: number[];
}
export type TRuntimeSymbolDef = IRuntimeMovieClipDef | ISpriteSymbolDef | IBitmapSymbolDef;
export interface IRuntimeData {
    /** The version of pixi-animate-runtime that generated the runtime content */
    runtimeVersion: string;
    /** Primitive entries of the published lib.properties (width, height, fps, color, ...) */
    properties: IPropMapDef;
    /** Images of the published manifest (sounds are left out) */
    images: IManifestEntryDef[];
    /** The published lib.ssMetadata */
    spriteSheets: ISpriteSheetDef[];
    /** Every drawing of the content, identical ones merged (shared by every symbol that shows them) */
    graphics: IGraphicsDef[];
    symbols: {
        [id: string]: TRuntimeSymbolDef;
    };
}
