import * as PIXI from 'pixi.js';
import { DisplayObject } from './display';
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
export declare class AnimateContainer extends PIXI.Container {
    /** Playback speed (1 is the content's own frame rate) */
    speed: number;
    /** Whether one call may play more than one frame (when the display runs slower than the content) */
    overSpeed: boolean;
    private _targets;
    private _nextId;
    handleTick(delta: number): void;
    /** Puts a content object on this container; a MovieClip plays from then on */
    addCreatejs<T extends DisplayObject>(obj: T): T;
    addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T;
    removeCreatejs<T extends DisplayObject>(obj: T): T;
    /**
     * A MovieClip is played while its node is on this container. Coming from
     * another parent, it starts over from its first frame.
     */
    private _register;
}
