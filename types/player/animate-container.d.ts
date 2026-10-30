import * as PIXI from 'pixi.js';
import { DisplayObject } from './display';
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
export declare class AnimateController {
    /** Playback speed (1 is the content's own frame rate) */
    speed: number;
    /** Whether one call may play more than one frame (when the display runs slower than the content) */
    overSpeed: boolean;
    /** Whether frames are played by a steady clock, so that small changes of the delta do not make the playing uneven */
    smooth: boolean;
    private readonly _container;
    private _targets;
    private _nextId;
    /** The latest deltas (a ring of DELTA_SAMPLES) */
    private _deltas;
    private _nextDelta;
    /** @param container The container the roots are put on */
    constructor(container: PIXI.Container);
    handleTick(delta: number): void;
    /** Records a delta and gives the median of the latest ones */
    private _usualDelta;
    /** Puts a content object on the container; a MovieClip plays from then on */
    addCreatejs<T extends DisplayObject>(obj: T): T;
    addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T;
    removeCreatejs<T extends DisplayObject>(obj: T): T;
    /**
     * A MovieClip is played while its node is on the container. Coming from
     * another parent, it starts over from its first frame.
     */
    private _register;
}
/**
 * A Pixi container that plays the content roots put on it at their
 * content's frame rate (see AnimateController).
 *
 * Call handleTick from the application's ticker:
 * `app.ticker.add(container.handleTick, container)`.
 */
export declare class AnimateContainer extends PIXI.Container {
    private readonly _controller;
    /** Playback speed (1 is the content's own frame rate) */
    get speed(): number;
    set speed(value: number);
    /** Whether one call may play more than one frame (when the display runs slower than the content) */
    get overSpeed(): boolean;
    set overSpeed(value: boolean);
    /** Whether frames are played by a steady clock, so that small changes of the delta do not make the playing uneven */
    get smooth(): boolean;
    set smooth(value: boolean);
    handleTick(delta: number): void;
    /** Puts a content object on this container; a MovieClip plays from then on */
    addCreatejs<T extends DisplayObject>(obj: T): T;
    addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T;
    removeCreatejs<T extends DisplayObject>(obj: T): T;
}
