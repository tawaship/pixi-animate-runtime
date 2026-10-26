import * as PIXI from 'pixi.js';
import { DisplayObject } from './display';
/**
 * Plays the content roots put on a Pixi container at their content's frame
 * rate (the rate the content was published with). AnimateContainer is a Pixi
 * container with one; a container of another framework can hold one too.
 *
 * Each handleTick call adds `delta x speed x fps / 60` to every root (delta
 * being the ticker's: 1 per frame of a 60 fps display) and plays as many whole
 * frames as that makes, one frame being createjs's tick phase followed by its
 * resolve phase. The first call after a root is put on only settles it on its
 * first frame.
 */
export declare class AnimateController {
    /** Playback speed (1 is the content's own frame rate) */
    speed: number;
    /** Whether one call may play more than one frame (when the display runs slower than the content) */
    overSpeed: boolean;
    private readonly _container;
    private _targets;
    private _nextId;
    /** @param container The container the roots are put on */
    constructor(container: PIXI.Container);
    handleTick(delta: number): void;
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
    handleTick(delta: number): void;
    /** Puts a content object on this container; a MovieClip plays from then on */
    addCreatejs<T extends DisplayObject>(obj: T): T;
    addCreatejsAt<T extends DisplayObject>(obj: T, index: number): T;
    removeCreatejs<T extends DisplayObject>(obj: T): T;
}
