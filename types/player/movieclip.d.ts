import { Container, DisplayObject, IOwnedNode } from './display';
import { Event } from './events';
import type { IRuntimeTweenDef, IStateEntryDef, TFrameValue, ILabelDef } from './data';
/** A frame script, called with the clip as `this` */
export type TScript = (...args: Array<object | string | number | boolean | null>) => void;
/** A recorded value as written (Graphics references resolved) */
export type TWrittenValue = object | string | number | boolean | null;
/**
 * A generated writer: writes the recorded values to the target property by
 * property, the names written out in its code (values[i] to the i-th
 * property; resolve turns a recorded Graphics reference into the Graphics).
 * An initial-value writer has its values in its code and takes the target only.
 */
export type TWriter = (target: object, values?: TFrameValue[], resolve?: (value: TFrameValue) => TWrittenValue) => void;
/** Gives an instance its named children: `self.<name> = slots[<slot>]` for each, the names written in the code */
export type TMemberWriter = (self: object, slots: object[]) => void;
/**
 * What a MovieClip instance needs to play a tween of its symbol: how to find
 * the objects a recorded value refers to.
 */
export interface ITweenScope {
    /** The target of a state entry (a slot of the instance) */
    stateTarget(entry: IStateEntryDef): DisplayObject | null;
    /** A recorded value as written (Graphics references resolved) */
    value(value: TFrameValue): TWrittenValue;
    /** A frame script by index */
    script(index: number): TScript;
    /** A writer by index */
    writer(index: number): TWriter;
}
/**
 * The playback state of one tween of an instance. The values come from the
 * shared definition; only the positions are per instance.
 */
export declare class TweenState {
    readonly def: IRuntimeTweenDef;
    /**
     * What the tween writes to: a display object or a filter (through their
     * accessors), or the plain object published code tweens `state` arrays on
     */
    readonly target: object;
    readonly scope: ITweenScope;
    readonly self: MovieClip;
    position: number;
    rawPosition: number;
    /** Distance from the start of the current step (synched children take their frame from it) */
    _stepPosition: number;
    passive: boolean;
    constructor(def: IRuntimeTweenDef, target: object, scope: ITweenScope, self: MovieClip);
    get duration(): number;
    /**
     * Tween.setPosition as a timeline drives it (actions are run separately by
     * the timeline). Nothing happens when the raw position does not change.
     */
    setPosition(rawPosition: number, jump: boolean): void;
    private _updatePosition;
    /** AbstractTween._runActions for this tween's actions */
    _runActions(startRaw: number, endRaw: number, jump: boolean, includeStart: boolean): boolean;
    /** Tween._runActionsRange: runs the actions in the range, stopping when one moves the tween */
    _runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean;
}
interface IActionRunner {
    _runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean;
}
/**
 * The timeline of a MovieClip instance (createjs.Timeline as a MovieClip drives it).
 */
export declare class Timeline implements IActionRunner {
    readonly tweens: TweenState[];
    readonly duration: number;
    loop: number;
    position: number;
    rawPosition: number;
    private readonly _labels;
    private readonly _labelList;
    constructor(duration: number, labels: ILabelDef[]);
    getLabels(): ILabelDef[];
    get currentLabel(): string | null;
    resolve(positionOrLabel: string | number): number | undefined;
    /**
     * AbstractTween.setPosition for the timeline: moves every tween, calls
     * back (the clip resolves its children), then runs the actions passed.
     */
    setPosition(rawPosition: number, skipActions: boolean, jump: boolean, callback: (() => void) | null): void;
    _runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean;
}
export interface IFilterCacheEntry {
    instance: DisplayObject;
    startFrame: number;
    endFrame: number;
    x: number;
    y: number;
    w: number;
    h: number;
}
export declare const INDEPENDENT = "independent";
export declare const SINGLE_FRAME = "single";
export declare const SYNCHED = "synched";
/**
 * createjs-compatible MovieClip. Plays its symbol's timeline from the shared
 * definition with createjs's rules: the two phases (tick: advance the
 * playhead; then resolve: write the tweens and settle the children), the
 * write rule (a tween writes only when its position changes), synched /
 * single children taking their frame from the parent's step, the reset of an
 * independent child when it comes back on the display list, and when frame
 * scripts run.
 */
export declare class MovieClip extends Container {
    static INDEPENDENT: string;
    static SINGLE_FRAME: string;
    static SYNCHED: string;
    mode: string;
    startPosition: number;
    loop: number;
    currentFrame: number;
    paused: boolean;
    actionsEnabled: boolean;
    autoReset: boolean;
    framerate: number | null;
    timeline: Timeline;
    _synchOffset: number;
    _rawPosition: number;
    _t: number;
    _framerate: number | null;
    /**
     * Display objects the timeline placed, with the resolve that last placed
     * them (_resolveCount at that time). One placed in an earlier resolve and
     * not in the current one is removed at its end (createjs marks every entry
     * 1 at the start of a resolve and placed ones 2: an earlier count is its 1)
     */
    _managed: {
        [id: number]: number;
    };
    private _resolveCount;
    /**
     * While a resolve can still leave the display list as it is: the index of
     * the child the next placement has to be for that (createjs moves each placed
     * child to the bottom, so in a resolve that changes nothing they come from
     * the top of the placed block down), -1 once all have come. Null when the
     * placements are done as createjs does them.
     */
    private _expected;
    /** The length of the placed block at the start of the resolve (the children placed last time, at the bottom) */
    private _placedBlock;
    /**
     * Instances to re-cache within frame ranges, read by the filter cache
     * handling (published code sets it in the symbol's constructor)
     */
    filterCacheList?: IFilterCacheEntry[];
    /** The frame rate the content was published with (lib.properties.fps), set on the content's symbols */
    contentFps: number | null;
    private readonly _boundResolve;
    constructor(mode?: string | null, startPosition?: number | null, loop?: boolean | number | null, timeline?: Timeline, pixi?: IOwnedNode);
    get labels(): ILabelDef[];
    get currentLabel(): string | null;
    get totalFrames(): number;
    get duration(): number;
    isVisible(): boolean;
    play(): void;
    stop(): void;
    gotoAndPlay(positionOrLabel: string | number): void;
    gotoAndStop(positionOrLabel: string | number): void;
    advance(time?: number | null): void;
    /** createjs tick phase: advance the playhead, then the children (reverse), then tick listeners */
    _tick(event: Event): void;
    /** createjs resolve phase (MovieClip draw / Stage update) */
    _updateState(): void;
    _goto(positionOrLabel: string | number): void;
    _reset(): void;
    _updateTimeline(rawPosition: number, jump: boolean): void;
    _renderFirstFrame(): void;
    /**
     * MovieClip._resolveState: places every tween target (and state entry) at
     * the bottom of the display list in turn, then removes the children placed
     * before and not now. The placements are skipped while they would leave the
     * display list as it is (_addManagedChild); otherwise everything is done as
     * createjs does it.
     */
    _resolveState(): void;
    /**
     * Stops skipping placements: the children placed so far (the top of the
     * block, from the expected index up) are moved to the bottom as createjs's
     * placements would have left them, with no events (moves within the same
     * parent are silent in createjs).
     */
    _followCreatejs(): void;
    _setState(state: IStateEntryDef[] | object | string | number | boolean | null | undefined, scope: ITweenScope, offset: number): void;
    _addManagedChild(child: DisplayObject, offset: number): void;
    toString(): string;
}
export {};
