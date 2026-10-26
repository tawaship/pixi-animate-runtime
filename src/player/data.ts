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

import type {
	IMovieClipSymbolDef, ISpriteSymbolDef, IBitmapSymbolDef, ITweenDef, IPropMapDef, ISlotDef,
	IManifestEntryDef, ISpriteSheetDef, IGraphicsDef, TFrameValue
} from '@tawaship/animate-data-converter';

export type {
	ISlotDef, ITweenDef, IStateEntryDef, IGraphicsDef, IGraphicsCommandDef, ISpriteDef, IBitmapDef,
	IFilterDef, ICacheDef, IButtonDef, IFilterCacheEntryDef, IRectDef, IDataMap, IPropMapDef,
	IManifestEntryDef, ISpriteSheetDef, ILabelDef, IMemberDef, TTargetDef, TFrameValue, TDataValue,
	ISpriteSymbolDef, IBitmapSymbolDef
} from '@tawaship/animate-data-converter';

/**
 * The pixi-animate-runtime versions whose runtime content this player plays
 * (npm's range notation). Raised when the player stops playing runtime
 * content older versions made.
 */
export const RUNTIME_CONTENT_RANGE = '0.x';

export interface IRuntimeActionDef {
	/** Timeline position the action sits on */
	position: number;
	/** Index into the runtime content's script list */
	script: number;
	params: TFrameValue[] | null;
}

export interface IRuntimeTweenDef extends Omit<ITweenDef, 'actions'> {
	actions: IRuntimeActionDef[];
	/**
	 * Index into the runtime content's writer list: the function that writes a frame's
	 * values (frames[position]) to the target, one property after another by
	 * name (null when the tween writes no property)
	 */
	writer: number | null;
}

export interface IRuntimeSlotDef extends ISlotDef {
	/** Index into the runtime content's writer list: the function that writes the slot's initial values (init) */
	initWriter: number | null;
}

export interface IRuntimeMovieClipDef extends Omit<IMovieClipSymbolDef, 'tweens' | 'slots' | 'graphics' | 'members'> {
	slots: IRuntimeSlotDef[];
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
	symbols: { [id: string]: TRuntimeSymbolDef };
}
