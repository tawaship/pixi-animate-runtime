import * as PIXI from 'pixi.js';
import { DisplayObject } from './display';
import { MovieClip } from './movieclip';
import { tick, resolveState } from './content';

/** The frame rate a root plays at when its content does not give one */
const DEFAULT_FPS = 60;

interface ITarget {
	root: MovieClip;
	/** Frames owed to the content's frame rate */
	t: number;
	isFirst: boolean;
}

/**
 * A Pixi container that plays the content roots put on it at their
 * content's frame rate (the rate the content was published with).
 *
 * Call handleTick from the application's ticker:
 * `app.ticker.add(container.handleTick, container)`. Each call adds
 * `delta x speed x fps / 60` to every root (delta being the ticker's: 1 per
 * frame of a 60 fps display) and plays as many whole frames as that makes,
 * one frame being createjs's tick phase followed by its resolve phase. The
 * first call after a root is put on only settles it on its first frame.
 */
export class AnimateContainer extends PIXI.Container {
	/** Playback speed (1 is the content's own frame rate) */
	speed = 1;
	/** Whether one call may play more than one frame (when the display runs slower than the content) */
	overSpeed = true;
	private _targets: { [id: number]: ITarget } = {};
	private _nextId = 0;

	handleTick(delta: number): void {
		const d = delta * this.speed;
		const targets = this._targets;

		Object.keys(targets).forEach(key => {
			const target = targets[Number(key)];
			if (!target) {
				return;
			}
			const fps = target.root.contentFps != null ? target.root.contentFps : DEFAULT_FPS;
			target.t += d * fps / 60;
			const whole = target.t | 0;
			const frames = this.overSpeed ? whole : Math.min(whole, 1);

			if (target.isFirst) {
				target.isFirst = false;
				resolveState(target.root);
				return;
			}

			target.t -= whole;
			for (let f = 0; f < frames; f++) {
				tick(target.root);
			}
		});
	}

	/** Puts a content object on this container; a MovieClip plays from then on */
	addCreatejs<T extends DisplayObject>(obj: T): T {
		this._register(obj);
		this.addChild(obj.pixi);
		return obj;
	}

	addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T {
		this._register(obj);
		this.addChildAt(obj.pixi, index);
		return obj;
	}

	removeCreatejs<T extends DisplayObject>(obj: T): T {
		this.removeChild(obj.pixi);
		return obj;
	}

	/**
	 * A MovieClip is played while its node is on this container. Coming from
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
			this._targets[id] = { root: obj, t: 0, isFirst: true };
			node.once('removed', () => {
				delete this._targets[id];
			});
		});
	}
}
