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
import type { IMovieClipSymbolDef, ISpriteSymbolDef, IBitmapSymbolDef, ITweenDef, IPropMapDef, ISlotDef, IManifestEntryDef, ISpriteSheetDef, IGraphicsCommandDef, IStateEntryDef, TDataValue, TFrameValue } from '@tawaship/animate-data-converter';
import { TEase } from './ease';
/** A kind of drawing command: its type and the names of its props, in order */
export type TRuntimeCommandKind = [string, string[]];
/** A drawing command as written in runtime content: the index of its kind, then its props' values in the kind's order */
export type TRuntimeCommand = TDataValue[];
/** A drawing as written in runtime content */
export interface IRuntimeGraphicsData {
    commands: TRuntimeCommand[];
}
/** A drawing's commands as the player draws them, from their written form */
export declare function commandsOf(kinds: TRuntimeCommandKind[], graphics: IRuntimeGraphicsData): IGraphicsCommandDef[];
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
/**
 * A frame value as written in runtime content: a display list (`state`) may
 * give an entry that places a slot as it is (no props) as the slot's index
 */
export type TRuntimeFrameValue = TFrameValue | Array<IStateEntryDef | number>;
/**
 * A position, or a stretch of positions, of a tween as written in runtime
 * content: the index of the position's values, or an interpolated stretch
 * [from, to, length, ease] whose positions run from values[from] toward
 * values[to] (the position after the stretch) as CreateJS interpolates a
 * step with that ease (see interpolated)
 */
export type TRuntimeFrameRef = number | [number, number, number, string];
/** A tween as written in runtime content (tweenOf makes its values for every position) */
export interface IRuntimeTweenData extends Omit<IRuntimeTweenDef, 'values' | 'frames'> {
    values: TRuntimeFrameValue[][];
    frames: TRuntimeFrameRef[];
}
/**
 * The values at a position of a step, as CreateJS's Tween computes them: the
 * ratio of the position in the step, eased, then each value from its start
 * toward its end (a value that is not a number, or does not change, keeps its
 * start until the eased ratio reaches 1).
 */
export declare function interpolated(from: TFrameValue[], to: TFrameValue[], position: number, length: number, ease: TEase | null): TFrameValue[];
/**
 * A tween with the values of every position: its display lists (the values of
 * its `state` prop) as entries, and its interpolated stretches computed (each
 * position of a stretch gets values of its own)
 */
export declare function tweenOf(data: IRuntimeTweenData): IRuntimeTweenDef;
export interface IRuntimeSlotDef extends Omit<ISlotDef, 'init'> {
    /** Index into the runtime content's writer list: the function that writes the slot's initial values (initValues) */
    initWriter: number | null;
    /** The slot's initial values, in the order its writer writes them */
    initValues: TFrameValue[] | null;
}
/** The values a slot's fields have when runtime content leaves them out */
export declare const SLOT_DEFAULTS: Omit<IRuntimeSlotDef, 'kind'>;
/**
 * A slot template as written in runtime content: its kind, and the fields not
 * at their defaults (SLOT_DEFAULTS); its initial values are the slot's own
 */
export type TRuntimeSlotData = Pick<IRuntimeSlotDef, 'kind'> & Partial<Omit<IRuntimeSlotDef, 'kind' | 'initValues'>>;
/**
 * A slot as written in a symbol: the index of its template in the content's
 * slotTemplates, with its initial values when it has some
 */
export type TRuntimeSlotRef = number | [number, TFrameValue[]];
/** A slot from its template (the fields left out at their defaults) and its initial values */
export declare function slotOf(templates: TRuntimeSlotData[], ref: TRuntimeSlotRef): IRuntimeSlotDef;
export interface IRuntimeMovieClipDef extends Omit<IMovieClipSymbolDef, 'tweens' | 'slots' | 'graphics' | 'members'> {
    /** The slots as written (templates and initial values; slotOf makes them whole) */
    slots: TRuntimeSlotRef[];
    /** The tweens as written (display lists with slot indexes; tweenOf turns them back into entries) */
    tweens: IRuntimeTweenData[];
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
    /** Every drawing of the content, identical ones merged (shared by every symbol that shows them); commandsOf reads them */
    graphics: IRuntimeGraphicsData[];
    /** The kinds of the drawings' commands (a type and the names of its props) */
    commandKinds: TRuntimeCommandKind[];
    /** The slots of every symbol but their initial values, identical ones merged */
    slotTemplates: TRuntimeSlotData[];
    symbols: {
        [id: string]: TRuntimeSymbolDef;
    };
}
