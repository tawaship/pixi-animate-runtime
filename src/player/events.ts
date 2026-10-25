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

export class Event {
	type: string;
	target: EventDispatcher | null = null;
	currentTarget: EventDispatcher | null = null;
	eventPhase = 0;
	bubbles: boolean;
	cancelable: boolean;
	timeStamp: number;
	defaultPrevented = false;
	propagationStopped = false;
	immediatePropagationStopped = false;
	removed = false;
	/** Time since the last tick, for tick events (createjs Ticker events carry it) */
	delta: number | undefined;
	paused: boolean | undefined;

	constructor(type: string, bubbles?: boolean, cancelable?: boolean) {
		this.type = type;
		this.bubbles = !!bubbles;
		this.cancelable = !!cancelable;
		this.timeStamp = Date.now();
	}

	preventDefault(): void {
		this.defaultPrevented = this.cancelable;
	}

	stopPropagation(): void {
		this.propagationStopped = true;
	}

	stopImmediatePropagation(): void {
		this.immediatePropagationStopped = this.propagationStopped = true;
	}

	remove(): void {
		this.removed = true;
	}

	clone(): Event {
		return new Event(this.type, this.bubbles, this.cancelable);
	}

	set(props: { [key: string]: string | number | boolean | null }): Event {
		Object.keys(props).forEach(key => {
			Reflect.set(this, key, props[key]);
		});
		return this;
	}

	toString(): string {
		return '[Event (type=' + this.type + ')]';
	}
}

function callListener(listener: TEventListener, event: Event): void {
	// As createjs: an object with handleEvent is called through it, anything else directly
	if (typeof listener !== 'function') {
		listener.handleEvent(event);
	} else {
		listener(event);
	}
}

export class EventDispatcher {
	_listeners: IListenerMap | null = null;
	_captureListeners: IListenerMap | null = null;

	/** The parent the bubble and capture phases walk through (a display object's parent) */
	get _eventParent(): EventDispatcher | null {
		return null;
	}

	addEventListener(type: string, listener: TEventListener, useCapture?: boolean): TEventListener {
		let listeners: IListenerMap | null = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) {
			listeners = {};
			if (useCapture) {
				this._captureListeners = listeners;
			} else {
				this._listeners = listeners;
			}
		}

		const list = listeners[type];
		if (list) {
			this.removeEventListener(type, listener, useCapture);
			// Removing may have dropped the list
			const again = listeners[type];
			if (again) {
				again.push(listener);
			} else {
				listeners[type] = [listener];
			}
		} else {
			listeners[type] = [listener];
		}
		return listener;
	}

	on(type: string, listener: TEventListener, scope?: object, once?: boolean, data?: TEventData, useCapture?: boolean): TEventListener {
		const owner = typeof listener === 'function' ? (scope || this) : (scope || listener);
		const wrapper = function (event: Event): void {
			if (typeof listener === 'function') {
				listener.call(owner, event, data);
			} else {
				listener.handleEvent.call(owner, event);
			}
			if (once) {
				event.remove();
			}
		};
		return this.addEventListener(type, wrapper, useCapture);
	}

	removeEventListener(type: string, listener: TEventListener, useCapture?: boolean): void {
		const listeners = useCapture ? this._captureListeners : this._listeners;
		if (!listeners) {
			return;
		}

		const list = listeners[type];
		if (!list) {
			return;
		}

		for (let i = 0, l = list.length; i < l; i++) {
			if (list[i] === listener) {
				if (l === 1) {
					delete listeners[type];
				} else {
					list.splice(i, 1);
				}
				break;
			}
		}
	}

	off(type: string, listener: TEventListener, useCapture?: boolean): void {
		this.removeEventListener(type, listener, useCapture);
	}

	removeAllEventListeners(type?: string): void {
		if (!type) {
			this._listeners = this._captureListeners = null;
			return;
		}
		if (this._listeners) {
			delete this._listeners[type];
		}
		if (this._captureListeners) {
			delete this._captureListeners[type];
		}
	}

	dispatchEvent(eventOrType: Event | string, bubbles?: boolean, cancelable?: boolean): boolean {
		let event: Event;
		if (typeof eventOrType === 'string') {
			const listeners = this._listeners;
			if (!bubbles && (!listeners || !listeners[eventOrType])) {
				return true;
			}
			event = new Event(eventOrType, bubbles, cancelable);
		} else {
			// An event that has been dispatched already is dispatched as a copy
			event = eventOrType.target ? eventOrType.clone() : eventOrType;
		}

		event.target = this;

		if (!event.bubbles || !this._eventParent) {
			this._dispatchEvent(event, 2);
		} else {
			const chain: EventDispatcher[] = [];
			for (let top: EventDispatcher | null = this; top; top = top._eventParent) {
				chain.push(top);
			}

			// Capture phase, from the top down to the target's parent
			for (let i = chain.length - 1; i >= 0 && !event.propagationStopped; i--) {
				chain[i]._dispatchEvent(event, 1 + (i === 0 ? 1 : 0));
			}
			// Bubble phase, from the target's parent up
			for (let i = 1; i < chain.length && !event.propagationStopped; i++) {
				chain[i]._dispatchEvent(event, 3);
			}
		}

		return !event.defaultPrevented;
	}

	hasEventListener(type: string): boolean {
		const listeners = this._listeners;
		const capture = this._captureListeners;
		return !!((listeners && listeners[type]) || (capture && capture[type]));
	}

	willTrigger(type: string): boolean {
		for (let o: EventDispatcher | null = this; o; o = o._eventParent) {
			if (o.hasEventListener(type)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Phase 1 is capture, 2 the target, 3 bubbling. At the target, the capture
	 * listeners run first and then the others (createjs runs the target phase
	 * twice, the second time as phase 2.1, which reads the non-capture listeners).
	 */
	_dispatchEvent(event: Event, phase: number): void {
		const map = phase <= 2 ? this._captureListeners : this._listeners;
		const found = map ? map[event.type] : undefined;
		if (found && found.length) {
			const list = found.slice();
			event.currentTarget = this;
			event.eventPhase = phase | 0;
			event.removed = false;

			for (let i = 0; i < list.length && !event.immediatePropagationStopped; i++) {
				const listener = list[i];
				callListener(listener, event);
				if (event.removed) {
					this.off(event.type, listener, phase === 1);
					event.removed = false;
				}
			}
		}

		if (phase === 2) {
			this._dispatchEvent(event, 2.1);
		}
	}
}
