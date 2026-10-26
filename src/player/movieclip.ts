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
export class TweenState {
	readonly def: IRuntimeTweenDef;
	/**
	 * What the tween writes to: a display object or a filter (through their
	 * accessors), or the plain object published code tweens `state` arrays on
	 */
	readonly target: object;
	readonly scope: ITweenScope;
	readonly self: MovieClip;
	position = 0;
	rawPosition = -1;
	/** Distance from the start of the current step (synched children take their frame from it) */
	_stepPosition = 0;
	passive = false;

	constructor(def: IRuntimeTweenDef, target: object, scope: ITweenScope, self: MovieClip) {
		this.def = def;
		this.target = target;
		this.scope = scope;
		this.self = self;
	}

	get duration(): number {
		return this.def.duration;
	}

	/**
	 * Tween.setPosition as a timeline drives it (actions are run separately by
	 * the timeline). Nothing happens when the raw position does not change.
	 */
	setPosition(rawPosition: number, jump: boolean): void {
		const duration = this.def.duration;
		const previous = this.rawPosition;
		let raw = rawPosition < 0 ? 0 : rawPosition;
		let position = 0;
		let end: boolean;

		if (duration === 0) {
			end = true;
			if (previous !== -1) {
				return;
			}
		} else {
			const loops = raw / duration | 0;
			position = raw - loops * duration;
			// A tween in a timeline does not loop: it ends at its duration
			end = raw >= duration;
			if (end) {
				raw = position = duration;
			}
			if (raw === previous) {
				return;
			}
		}

		this.position = position;
		this.rawPosition = raw;
		this._updatePosition(jump, end);
	}

	private _updatePosition(jump: boolean, end: boolean): void {
		const def = this.def;
		const position = this.position;

		if (def.writer !== null) {
			this.scope.writer(def.writer)(this.target, def.values[def.frames[position]], this.scope.value);
		}

		// The last step whose start is at or before the position
		const keyframes = def.keyframes;
		let start = 0;
		let found = false;
		for (let i = 0; i < keyframes.length; i++) {
			if (keyframes[i] <= position || i === 0) {
				start = keyframes[i];
				found = true;
			} else {
				break;
			}
		}
		this._stepPosition = found ? position - start : 0;
	}

	/** AbstractTween._runActions for this tween's actions */
	_runActions(startRaw: number, endRaw: number, jump: boolean, includeStart: boolean): boolean {
		if (!this.def.actions.length) {
			return false;
		}
		return runActions(this, this.def.duration, 0, startRaw, endRaw, jump, includeStart);
	}

	/** Tween._runActionsRange: runs the actions in the range, stopping when one moves the tween */
	_runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean {
		const actions = this.def.actions;
		const reverse = start > end;
		const low = reverse ? end : start;
		const high = reverse ? start : end;
		const position = this.position;

		for (let n = 0; n < actions.length; n++) {
			const action = actions[reverse ? actions.length - 1 - n : n];
			const t = action.position;
			if (t === end || (t > low && t < high) || (includeStart && t === start)) {
				const scope = this.scope;
				const params = action.params ? action.params.map(value => scope.value(value)) : [this];
				scope.script(action.script).apply(this.self, params);
				if (position !== this.position) {
					return true;
				}
			}
		}
		return false;
	}
}

interface IActionRunner {
	_runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean;
}

/**
 * AbstractTween._runActions: splits the move from one raw position to another
 * into per-loop ranges and runs the actions of each, as createjs does.
 */
function runActions(runner: IActionRunner, duration: number, loop: number, startRaw: number, endRaw: number, jump: boolean, includeStart: boolean): boolean {
	let startLoop: number;
	let endLoop: number;
	let start: number;
	let end: number;

	if (duration === 0) {
		startLoop = endLoop = start = end = 0;
	} else {
		startLoop = startRaw / duration | 0;
		endLoop = endRaw / duration | 0;
		start = startRaw - startLoop * duration;
		end = endRaw - endLoop * duration;
	}

	if (loop !== -1) {
		if (endLoop > loop) {
			end = duration;
			endLoop = loop;
		}
		if (startLoop > loop) {
			start = duration;
			startLoop = loop;
		}
	}

	if (jump) {
		return runner._runActionsRange(end, end, jump, includeStart);
	}

	if (startLoop !== endLoop || start !== end || jump || includeStart) {
		if (startLoop === -1) {
			startLoop = start = 0;
		}
		const forward = endRaw >= startRaw;
		let n = startLoop;
		let first = includeStart;
		do {
			const rangeStart = n === startLoop ? start : forward ? 0 : duration;
			const rangeEnd = n === endLoop ? end : forward ? duration : 0;
			if (runner._runActionsRange(rangeStart, rangeEnd, jump, first || n !== startLoop)) {
				return true;
			}
			first = false;
		} while ((forward && ++n <= endLoop) || (!forward && --n >= endLoop));
	}
	return false;
}

/**
 * The timeline of a MovieClip instance (createjs.Timeline as a MovieClip drives it).
 */
export class Timeline implements IActionRunner {
	readonly tweens: TweenState[] = [];
	readonly duration: number;
	loop = 0;
	position = 0;
	rawPosition = -1;
	private readonly _labels: { [label: string]: number };
	private readonly _labelList: ILabelDef[];

	constructor(duration: number, labels: ILabelDef[]) {
		this.duration = duration;
		this._labels = {};
		labels.forEach(label => {
			this._labels[label.label] = label.position;
		});
		this._labelList = labels.slice().sort((a, b) => a.position - b.position);
	}

	getLabels(): ILabelDef[] {
		return this._labelList;
	}

	get currentLabel(): string | null {
		const labels = this._labelList;
		let i = 0;
		for (; i < labels.length; i++) {
			if (this.position < labels[i].position) {
				break;
			}
		}
		return i === 0 ? null : labels[i - 1].label;
	}

	resolve(positionOrLabel: string | number): number | undefined {
		const position = Number(positionOrLabel);
		if (!isNaN(position)) {
			return position;
		}
		const label = this._labels[positionOrLabel];
		return label === undefined ? undefined : label;
	}

	/**
	 * AbstractTween.setPosition for the timeline: moves every tween, calls
	 * back (the clip resolves its children), then runs the actions passed.
	 */
	setPosition(rawPosition: number, skipActions: boolean, jump: boolean, callback: (() => void) | null): void {
		const duration = this.duration;
		const loop = this.loop;
		const previous = this.rawPosition;
		let raw = rawPosition < 0 ? 0 : rawPosition;
		let position = 0;

		if (duration === 0) {
			if (previous !== -1) {
				return;
			}
		} else {
			const loops = raw / duration | 0;
			position = raw - loops * duration;
			const end = loop !== -1 && raw >= loop * duration + duration;
			if (end) {
				position = duration;
				raw = duration * loop + duration;
			}
			if (raw === previous) {
				return;
			}
		}

		this.position = position;
		this.rawPosition = raw;
		for (let i = 0; i < this.tweens.length; i++) {
			this.tweens[i].setPosition(position, jump);
		}
		if (callback) {
			callback();
		}
		if (!skipActions) {
			runActions(this, this.duration, this.loop, previous, raw, jump, !jump && previous === -1);
		}
	}

	_runActionsRange(start: number, end: number, jump: boolean, includeStart: boolean): boolean {
		const position = this.position;
		for (let i = 0; i < this.tweens.length; i++) {
			this.tweens[i]._runActions(start, end, jump, includeStart);
			if (position !== this.position) {
				return true;
			}
		}
		return false;
	}
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

export const INDEPENDENT = 'independent';
export const SINGLE_FRAME = 'single';
export const SYNCHED = 'synched';

/**
 * createjs-compatible MovieClip. Plays its symbol's timeline from the shared
 * definition with createjs's rules: the two phases (tick: advance the
 * playhead; then resolve: write the tweens and settle the children), the
 * write rule (a tween writes only when its position changes), synched /
 * single children taking their frame from the parent's step, the reset of an
 * independent child when it comes back on the display list, and when frame
 * scripts run.
 */
export class MovieClip extends Container {
	static INDEPENDENT = INDEPENDENT;
	static SINGLE_FRAME = SINGLE_FRAME;
	static SYNCHED = SYNCHED;

	mode: string;
	startPosition: number;
	loop: number;
	currentFrame = 0;
	paused = false;
	actionsEnabled = true;
	autoReset = true;
	framerate: number | null = null;
	timeline: Timeline;
	_synchOffset = 0;
	_rawPosition = -1;
	_t = 0;
	_framerate: number | null = null;
	/**
	 * Display objects the timeline placed, with the resolve that last placed
	 * them (_resolveCount at that time). One placed in an earlier resolve and
	 * not in the current one is removed at its end (createjs marks every entry
	 * 1 at the start of a resolve and placed ones 2: an earlier count is its 1)
	 */
	_managed: { [id: number]: number } = {};
	private _resolveCount = 0;
	/**
	 * While a resolve can still leave the display list as it is: the index of
	 * the child the next placement has to be for that (createjs moves each placed
	 * child to the bottom, so in a resolve that changes nothing they come from
	 * the top of the placed block down), -1 once all have come. Null when the
	 * placements are done as createjs does them.
	 */
	private _expected: number | null = null;
	/** The length of the placed block at the start of the resolve (the children placed last time, at the bottom) */
	private _placedBlock = 0;
	/**
	 * Instances to re-cache within frame ranges, read by the filter cache
	 * handling (published code sets it in the symbol's constructor)
	 */
	filterCacheList?: IFilterCacheEntry[];
	/** The frame rate the content was published with (lib.properties.fps), set on the content's symbols */
	contentFps: number | null = null;
	private readonly _boundResolve: () => void;

	constructor(mode?: string | null, startPosition?: number | null, loop?: boolean | number | null, timeline?: Timeline, pixi?: IOwnedNode) {
		super(pixi);
		this.mode = mode || INDEPENDENT;
		this.startPosition = startPosition || 0;
		this.loop = loop === true ? -1 : (loop || 0);
		this.timeline = timeline || new Timeline(0, []);
		this._boundResolve = () => this._resolveState();
	}

	get labels(): ILabelDef[] { return this.timeline.getLabels(); }
	get currentLabel(): string | null { return this.timeline.currentLabel; }
	get totalFrames(): number { return this.timeline.duration; }
	get duration(): number { return this.timeline.duration; }

	isVisible(): boolean {
		return !!(this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0);
	}

	play(): void { this.paused = false; }
	stop(): void { this.paused = true; }

	gotoAndPlay(positionOrLabel: string | number): void {
		this.paused = false;
		this._goto(positionOrLabel);
	}

	gotoAndStop(positionOrLabel: string | number): void {
		this.paused = true;
		this._goto(positionOrLabel);
	}

	advance(time?: number | null): void {
		if (this.mode !== INDEPENDENT) {
			return;
		}

		let framerate = this.framerate;
		for (let o = this.parent; o && framerate === null; o = o.parent) {
			if (o instanceof MovieClip && o.mode === INDEPENDENT) {
				framerate = o._framerate;
			}
		}
		this._framerate = framerate;

		if (!this.paused) {
			// As createjs: a missing time (undefined, not null) with a framerate gives NaN, i.e. no advance
			const frames = framerate !== null && framerate !== -1 && time !== null ? Number(time) / (1000 / framerate) + this._t : 1;
			let count = frames | 0;
			this._t = frames - count;
			while (count--) {
				this._updateTimeline(this._rawPosition + 1, false);
			}
		}
	}

	/** createjs tick phase: advance the playhead, then the children (reverse), then tick listeners */
	_tick(event: Event): void {
		this.advance(event ? event.delta : undefined);
		super._tick(event);
	}

	/** createjs resolve phase (MovieClip draw / Stage update) */
	_updateState(): void {
		if (this._rawPosition === -1 || this.mode !== INDEPENDENT) {
			this._updateTimeline(-1, false);
		}
	}

	_goto(positionOrLabel: string | number): void {
		const position = this.timeline.resolve(positionOrLabel);
		if (position != null) {
			this._t = 0;
			this._updateTimeline(position, true);
		}
	}

	_reset(): void {
		this._rawPosition = -1;
		this._t = this.currentFrame = 0;
		this.paused = false;
	}

	_updateTimeline(rawPosition: number, jump: boolean): void {
		const synched = this.mode !== INDEPENDENT;
		const timeline = this.timeline;
		let position = rawPosition;
		if (synched) {
			position = this.startPosition + (this.mode === SINGLE_FRAME ? 0 : this._synchOffset);
		}
		if (position < 0) {
			position = 0;
		}
		if (this._rawPosition !== position || synched) {
			this._rawPosition = position;
			timeline.loop = this.loop;
			timeline.setPosition(position, synched || !this.actionsEnabled, jump, this._boundResolve);
		}
	}

	_renderFirstFrame(): void {
		const timeline = this.timeline;
		const raw = timeline.rawPosition;
		timeline.setPosition(0, true, true, this._boundResolve);
		timeline.rawPosition = raw;
	}

	/**
	 * MovieClip._resolveState: places every tween target (and state entry) at
	 * the bottom of the display list in turn, then removes the children placed
	 * before and not now. The placements are skipped while they would leave the
	 * display list as it is (_addManagedChild); otherwise everything is done as
	 * createjs does it.
	 */
	_resolveState(): void {
		const timeline = this.timeline;
		this.currentFrame = timeline.position;

		const current = ++this._resolveCount;
		const managed = this._managed;
		const children = this.children;

		// The children the timeline placed, from the bottom (a resolve leaves them there): a placement
		// can be skipped only for one of them (it was placed before, so it would not be reset). What
		// is above the block does not matter: createjs's placements put the placed ones below it
		let block = 0;
		while (block < children.length && managed[children[block].id] !== undefined) {
			block++;
		}
		this._placedBlock = block;
		this._expected = block - 1;

		const tweens = timeline.tweens;
		for (let i = 0; i < tweens.length; i++) {
			const tween = tweens[i];
			const target = tween.target;
			if (target !== this && !tween.passive) {
				const offset = tween._stepPosition;
				if (target instanceof DisplayObject) {
					this._addManagedChild(target, offset);
				} else {
					this._setState(Reflect.get(target, 'state'), tween.scope, offset);
				}
			}
		}

		// Children of the block not placed now: put the placed ones in front of them as createjs has them
		this._followCreatejs();

		for (let i = children.length - 1; i >= 0; i--) {
			const id = children[i].id;
			const placed = managed[id];
			// Earlier than this resolve (a resolve nested in this one, from an event, counts as now)
			if (placed !== undefined && placed < current) {
				this.removeChildAt(i);
				delete managed[id];
			}
		}
	}

	/**
	 * Stops skipping placements: the children placed so far (the top of the
	 * block, from the expected index up) are moved to the bottom as createjs's
	 * placements would have left them, with no events (moves within the same
	 * parent are silent in createjs).
	 */
	_followCreatejs(): void {
		const expected = this._expected;
		this._expected = null;
		if (expected === null || expected < 0) {
			return;
		}
		const children = this.children;
		const placed = children.splice(expected + 1, this._placedBlock - expected - 1);
		for (let i = placed.length - 1; i >= 0; i--) {
			children.unshift(placed[i]);
		}
		placed.forEach((child, index) => {
			this.pixi.setChildIndex(child.pixi, index);
		});
	}

	_setState(state: IStateEntryDef[] | object | string | number | boolean | null | undefined, scope: ITweenScope, offset: number): void {
		if (!Array.isArray(state)) {
			return;
		}
		for (let i = state.length - 1; i >= 0; i--) {
			const entry: IStateEntryDef = state[i];
			const target = scope.stateTarget(entry);
			if (!target) {
				continue;
			}
			const props = entry.props;
			if (props) {
				Object.keys(props).forEach(key => {
					Reflect.set(target, key, scope.value(props[key]));
				});
			}
			this._addManagedChild(target, offset);
		}
	}

	_addManagedChild(child: DisplayObject, offset: number): void {
		if (child._off) {
			return;
		}
		const expected = this._expected;
		if (expected !== null) {
			// Moving it to the bottom would put it where it is: the next child of the block down, or
			// the child placed last (placed twice in this resolve: createjs has it at the bottom already).
			// Only what the placement records is done (it was placed before, so no reset)
			const next = expected >= 0 && this.children[expected] === child;
			if (next || (expected + 1 < this._placedBlock && this.children[expected + 1] === child)) {
				if (next) {
					this._expected = expected - 1;
				}
				if (child instanceof MovieClip) {
					child._synchOffset = offset;
				}
				this._managed[child.id] = this._resolveCount;
				return;
			}
			this._followCreatejs();
		}
		this.addChildAt(child, 0);
		if (child instanceof MovieClip) {
			child._synchOffset = offset;
			if (child.mode === INDEPENDENT && child.autoReset && !this._managed[child.id]) {
				child._reset();
			}
		}
		this._managed[child.id] = this._resolveCount;
	}

	toString(): string {
		return '[MovieClip (name=' + this.name + ')]';
	}
}
