/**
 * createjs-compatible events: Event and EventDispatcher, with the capture,
 * target and bubble phases createjs dispatches through the parent chain.
 */
export interface IEventHandlerObject {
    handleEvent(event: Event): void;
}
/** Data passed to a listener added with on() */
export type TEventData = string | number | boolean | object | null | undefined;
export type TEventListener = ((event: Event, data?: TEventData) => void) | IEventHandlerObject;
interface IListenerMap {
    [type: string]: TEventListener[];
}
export declare class Event {
    type: string;
    target: EventDispatcher | null;
    currentTarget: EventDispatcher | null;
    eventPhase: number;
    bubbles: boolean;
    cancelable: boolean;
    timeStamp: number;
    defaultPrevented: boolean;
    propagationStopped: boolean;
    immediatePropagationStopped: boolean;
    removed: boolean;
    /** Time since the last tick, for tick events (createjs Ticker events carry it) */
    delta: number | undefined;
    paused: boolean | undefined;
    constructor(type: string, bubbles?: boolean, cancelable?: boolean);
    preventDefault(): void;
    stopPropagation(): void;
    stopImmediatePropagation(): void;
    remove(): void;
    clone(): Event;
    set(props: {
        [key: string]: string | number | boolean | null;
    }): Event;
    toString(): string;
}
export declare class EventDispatcher {
    _listeners: IListenerMap | null;
    _captureListeners: IListenerMap | null;
    /** The parent the bubble and capture phases walk through (a display object's parent) */
    get _eventParent(): EventDispatcher | null;
    addEventListener(type: string, listener: TEventListener, useCapture?: boolean): TEventListener;
    on(type: string, listener: TEventListener, scope?: object, once?: boolean, data?: TEventData, useCapture?: boolean): TEventListener;
    removeEventListener(type: string, listener: TEventListener, useCapture?: boolean): void;
    off(type: string, listener: TEventListener, useCapture?: boolean): void;
    removeAllEventListeners(type?: string): void;
    dispatchEvent(eventOrType: Event | string, bubbles?: boolean, cancelable?: boolean): boolean;
    hasEventListener(type: string): boolean;
    willTrigger(type: string): boolean;
    /**
     * Phase 1 is capture, 2 the target, 3 bubbling. At the target, the capture
     * listeners run first and then the others (createjs runs the target phase
     * twice, the second time as phase 2.1, which reads the non-capture listeners).
     */
    _dispatchEvent(event: Event, phase: number): void;
}
export {};
