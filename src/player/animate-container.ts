import * as PIXI from 'pixi.js';
import { DisplayObject } from './display';
import { MovieClip } from './movieclip';
import { tick, resolveState } from './content';

/** The frame rate a root plays at when its content does not give one */
const DEFAULT_FPS = 60;
/** How many of the latest deltas the usual delta of the display is the median of */
const DELTA_SAMPLES = 30;
/** The share of its distance from the real time the steady clock moves by on each call */
const PULL = 0.05;

interface ITarget {
	root: MovieClip;
	/** Frames owed by the real time (the deltas as given) */
	t: number;
	/** Frames owed by the steady clock (the usual delta on every call), kept within a frame of t */
	clock: number;
	isFirst: boolean;
}

/**
 * Plays the content roots put on a Pixi container at their content's frame
 * rate (the rate the content was published with). AnimateContainer is a Pixi
 * container with one; a container of another framework can hold one too.
 *
 * Each handleTick call owes every root `delta x speed x fps / 60` frames
 * (delta being the ticker's: 1 per frame of a 60 fps display) and plays the
 * whole frames owed. With `smooth`, the frames played follow a steady clock
 * instead of the deltas themselves: it advances by the usual delta of the
 * display (the median of the latest ones) on every call, so that small changes
 * of the delta do not play a frame early or late (0 frames on one call and 2
 * on the next), and it is pulled toward the real time a little on every call,
 * and set to it when they are a frame apart (a frame of the display was
 * missed), so that the content keeps the real time. One frame is createjs's
 * tick phase followed by its resolve phase. The first call after a root is put
 * on only settles it on its first frame.
 */
export class AnimateController {
	/** Playback speed (1 is the content's own frame rate) */
	speed = 1;
	/** Whether one call may play more than one frame (when the display runs slower than the content) */
	overSpeed = true;
	/** Whether frames are played by a steady clock, so that small changes of the delta do not make the playing uneven */
	smooth = true;
	private readonly _container: PIXI.Container;
	private _targets: { [id: number]: ITarget } = {};
	private _nextId = 0;
	/** The latest deltas (a ring of DELTA_SAMPLES) */
	private _deltas: number[] = [];
	private _nextDelta = 0;

	/** @param container The container the roots are put on */
	constructor(container: PIXI.Container) {
		this._container = container;
	}

	handleTick(delta: number): void {
		const d = delta * this.speed;
		const usual = this._usualDelta(delta) * this.speed;
		const targets = this._targets;

		Object.keys(targets).forEach(key => {
			const target = targets[Number(key)];
			if (!target) {
				return;
			}
			const fps = target.root.contentFps != null ? target.root.contentFps : DEFAULT_FPS;
			target.t += d * fps / 60;

			// The steady clock follows the real time half a step ahead, so that it sits
			// midway between whole frames, not on one (where the pull alone would move it across)
			const step = usual * fps / 60;
			const lead = Math.min(step, 1) / 2;

			if (target.isFirst) {
				target.isFirst = false;
				target.clock = target.t + lead;
				resolveState(target.root);
				return;
			}

			if (this.smooth) {
				target.clock += step;
				const behind = target.t + lead - target.clock;
				if (behind >= 1 || behind <= -1) {
					target.clock = target.t + lead;
				} else {
					target.clock += behind * PULL;
				}
			} else {
				target.clock = target.t;
			}

			const whole = Math.max(Math.floor(target.clock), 0);
			const frames = this.overSpeed ? whole : Math.min(whole, 1);
			target.t -= whole;
			target.clock -= whole;
			for (let f = 0; f < frames; f++) {
				tick(target.root);
			}
		});
	}

	/** Records a delta and gives the median of the latest ones */
	private _usualDelta(delta: number): number {
		const deltas = this._deltas;
		deltas[this._nextDelta] = delta;
		this._nextDelta = (this._nextDelta + 1) % DELTA_SAMPLES;
		const sorted = deltas.slice().sort((a, b) => a - b);
		const middle = sorted.length >> 1;
		return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
	}

	/** Puts a content object on the container; a MovieClip plays from then on */
	addCreatejs<T extends DisplayObject>(obj: T): T {
		this._register(obj);
		this._container.addChild(obj.pixi);
		return obj;
	}

	addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T {
		this._register(obj);
		this._container.addChildAt(obj.pixi, index);
		return obj;
	}

	removeCreatejs<T extends DisplayObject>(obj: T): T {
		this._container.removeChild(obj.pixi);
		return obj;
	}

	/**
	 * A MovieClip is played while its node is on the container. Coming from
	 * another parent, it starts over from its first frame.
	 */
	private _register(obj: DisplayObject): void {
		if (!(obj instanceof MovieClip)) {
			return;
		}
		const node = obj.pixi;
		const previous = node.parent;
		node.once('added', () => {
			if (node.parent !== previous) {
				obj.gotoAndPlay(0);
			}
			const id = this._nextId++;
			this._targets[id] = { root: obj, t: 0, clock: 0, isFirst: true };
			node.once('removed', () => {
				delete this._targets[id];
			});
		});
	}
}

/**
 * A Pixi container that plays the content roots put on it at their
 * content's frame rate (see AnimateController).
 *
 * Call handleTick from the application's ticker:
 * `app.ticker.add(container.handleTick, container)`.
 */
export class AnimateContainer extends PIXI.Container {
	private readonly _controller: AnimateController = new AnimateController(this);

	/** Playback speed (1 is the content's own frame rate) */
	get speed(): number { return this._controller.speed; }
	set speed(value: number) { this._controller.speed = value; }

	/** Whether one call may play more than one frame (when the display runs slower than the content) */
	get overSpeed(): boolean { return this._controller.overSpeed; }
	set overSpeed(value: boolean) { this._controller.overSpeed = value; }

	/** Whether frames are played by a steady clock, so that small changes of the delta do not make the playing uneven */
	get smooth(): boolean { return this._controller.smooth; }
	set smooth(value: boolean) { this._controller.smooth = value; }

	handleTick(delta: number): void {
		this._controller.handleTick(delta);
	}

	/** Puts a content object on this container; a MovieClip plays from then on */
	addCreatejs<T extends DisplayObject>(obj: T): T {
		return this._controller.addCreatejs(obj);
	}

	addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T {
		return this._controller.addCreatejsAt(obj, index);
	}

	removeCreatejs<T extends DisplayObject>(obj: T): T {
		return this._controller.removeCreatejs(obj);
	}
}
