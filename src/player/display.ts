import * as PIXI from 'pixi.js';
import { Event, EventDispatcher } from './events';
import { CjsTransform } from './transform';
import { Rectangle } from './geom';

/**
 * A Pixi node owned by a createjs-compatible display object.
 */
export interface IOwnedNode extends PIXI.Container {
	owner: DisplayObject | null;
}

export class PixiContainer extends PIXI.Container implements IOwnedNode {
	owner: DisplayObject | null = null;
}

let nextId = 0;

/** A hit area nothing is inside: Pixi's hit test skips a node with it and the node's children */
export const NO_HIT_AREA = new PIXI.Rectangle(0, 0, 0, 0);

/** createjs compositeOperation -> Pixi blend mode (the ones WebGL renders) */
const BLEND_MODES: { [operation: string]: PIXI.BLEND_MODES } = {
	'source-over': PIXI.BLEND_MODES.NORMAL,
	lighter: PIXI.BLEND_MODES.ADD,
	multiply: PIXI.BLEND_MODES.MULTIPLY,
	screen: PIXI.BLEND_MODES.SCREEN
};

/**
 * Members a filter shown through a display object has to provide.
 */
export interface IFilterLike {
	pixiFilter: PIXI.Filter;
}

export interface ICacheState {
	x: number;
	y: number;
	width: number;
	height: number;
	scale: number;
}

/**
 * createjs-compatible display object: a window onto a Pixi node.
 *
 * The values both have in common live on the Pixi node only (x / y on
 * position, scaleX / scaleY on scale, regX / regY on pivot, alpha, visible),
 * read and written through accessors, so a write through the Pixi node and a
 * write through this object are the same write. Members that mean different
 * things in createjs and Pixi keep the createjs meaning here (rotation and
 * skew in degrees, mask, filters, parent); the Pixi node keeps the Pixi one.
 */
export class DisplayObject extends EventDispatcher {
	/** The Pixi node this object shows */
	readonly pixi: IOwnedNode;
	readonly id: number;
	parent: Container | null = null;
	tickEnabled = true;
	mouseEnabled = true;
	cursor: string | null = null;
	hitArea: DisplayObject | null = null;
	shadow: null = null;
	snapToPixel = true;
	/**
	 * Kept off the display list by the timeline (published code sets it on masks
	 * and absent instances). createjs reads it only when its timeline places
	 * children: it does not affect drawing (an _off object on a display list is drawn)
	 */
	/** createjs leaves it unset (undefined) until the timeline or published code sets it */
	private _offValue: boolean | undefined = undefined;
	private _name: string | null = null;
	private _mask: DisplayObject | null = null;
	private _filters: IFilterLike[] | null = null;
	private _compositeOperation: string | null = null;
	/** The composite operation in effect on the parent (createjs draws children under it) */
	private _inheritedComposite: string | null = null;
	/** The cache createjs would draw through (filters show in Pixi without one) */
	bitmapCache: ICacheState | null = null;
	/** Set only when the symbol has them (createjs leaves them undefined otherwise) */
	nominalBounds?: Rectangle | null;
	frameBounds?: Rectangle[] | null;
	_bounds: Rectangle | null = null;
	/** The parent whose Pixi node holds this object's mask node */
	_maskHost: Container | null = null;
	/** The objects this object masks (while they are on a display list) */
	_maskTargets: DisplayObject[] = [];

	constructor(pixi: IOwnedNode) {
		super();
		this.id = nextId++;
		this.pixi = pixi;
		pixi.owner = this;
		pixi.transform = new CjsTransform();
	}

	get _eventParent(): EventDispatcher | null {
		return this.parent;
	}

	private get _transform(): CjsTransform {
		const transform = this.pixi.transform;
		if (transform instanceof CjsTransform) {
			return transform;
		}
		// The Pixi side replaced the transform: keep createjs semantics on a new one
		const replacement = new CjsTransform();
		replacement.setFromMatrix(transform.localTransform);
		this.pixi.transform = replacement;
		return replacement;
	}

	get x(): number { return this.pixi.position.x; }
	set x(value: number) { this.pixi.position.x = value; }
	get y(): number { return this.pixi.position.y; }
	set y(value: number) { this.pixi.position.y = value; }
	get scaleX(): number { return this.pixi.scale.x; }
	set scaleX(value: number) { this.pixi.scale.x = value; }
	get scaleY(): number { return this.pixi.scale.y; }
	set scaleY(value: number) { this.pixi.scale.y = value; }
	get regX(): number { return this.pixi.pivot.x; }
	set regX(value: number) { this.pixi.pivot.x = value; }
	get regY(): number { return this.pixi.pivot.y; }
	set regY(value: number) { this.pixi.pivot.y = value; }
	get rotation(): number { return this._transform.degRotation; }
	set rotation(value: number) { this._transform.setRotation(value); }
	get skewX(): number { return this._transform.degSkewX; }
	set skewX(value: number) { this._transform.setSkewX(value); }
	get skewY(): number { return this._transform.degSkewY; }
	set skewY(value: number) { this._transform.setSkewY(value); }
	get alpha(): number { return this.pixi.alpha; }
	set alpha(value: number) { this.pixi.alpha = value; }
	get visible(): boolean { return this.pixi.visible; }
	set visible(value: boolean) { this.pixi.visible = value; }
	get name(): string | null { return this._name; }
	set name(value: string | null) {
		this._name = value;
		this.pixi.name = value == null ? '' : String(value);
	}

	get _off(): boolean | undefined { return this._offValue; }
	set _off(value: boolean | undefined) {
		this._offValue = value;
	}

	get compositeOperation(): string | null { return this._compositeOperation; }
	set compositeOperation(value: string | null) {
		this._compositeOperation = value;
		this._applyComposite();
	}

	/**
	 * The composite operation createjs draws this object with: its own, or else
	 * the nearest ancestor's (createjs sets it on the context and draws the
	 * children under it, each child saving and restoring the context)
	 */
	_effectiveComposite(): string | null {
		return this._compositeOperation || this._inheritedComposite;
	}

	/** Told by the parent when the composite operation in effect on it changes */
	_setInheritedComposite(value: string | null): void {
		if (value === this._inheritedComposite) {
			return;
		}
		this._inheritedComposite = value;
		this._applyComposite();
	}

	/**
	 * Pixi blends per drawing node (a container has no blend mode of its own),
	 * so the composite operation in effect is set on this object's drawing node
	 * and handed down to the children
	 */
	_applyComposite(): void {
		const composite = this._effectiveComposite();
		const mode = composite ? BLEND_MODES[composite] : undefined;
		this._setBlendMode(mode === undefined ? PIXI.BLEND_MODES.NORMAL : mode);
	}

	get mask(): DisplayObject | null { return this._mask; }
	set mask(value: DisplayObject | null) {
		if (this._mask === value) {
			return;
		}
		const host = this._maskHost;
		if (host) {
			host._detachMask(this);
		}
		this._mask = value;
		this.pixi.mask = null;
		if (this.parent) {
			this.parent._attachMask(this);
		}
	}

	get filters(): IFilterLike[] | null { return this._filters; }
	set filters(value: IFilterLike[] | null) {
		this._filters = value;
		this.pixi.filters = value && value.length ? value.map(filter => filter.pixiFilter) : [];
	}

	/** Blend mode for the Pixi node(s) that draw this object */
	_setBlendMode(mode: PIXI.BLEND_MODES): void {
		const node = this.pixi;
		if (node instanceof PIXI.Sprite || node instanceof PIXI.Graphics) {
			node.blendMode = mode;
		}
	}

	/**
	 * The node is drawn unless Pixi uses it as a mask, or it is in a parent's
	 * node only to carry the mask shape of a sibling (a createjs mask is not on
	 * any display list and is not drawn itself)
	 */
	_updateRenderable(): void {
		const maskOnly = this.pixi.isMask || this._maskTargets.length > 0;
		this.pixi.renderable = !maskOnly;
		// Pixi hit tests nodes that are not drawn: a mask's node is kept out of pointer
		// hits (with its children) by a hit area nothing is inside, as createjs never hits a mask
		if (maskOnly) {
			this.pixi.hitArea = NO_HIT_AREA;
		} else if (this.pixi.hitArea === NO_HIT_AREA) {
			// Back to Pixi's default (null; the type definition does not take null, Pixi does)
			Reflect.set(this.pixi, 'hitArea', null);
		}
	}

	/** Whether this object clips when used as a mask (createjs clips only with a non-empty Graphics) */
	_clipsAsMask(): boolean {
		return false;
	}

	/** The node Pixi masks with when this object is a mask */
	_pixiMaskNode(): PIXI.Container | null {
		return null;
	}

	/** Called when this object stops being some object's Pixi mask */
	_releaseMaskNode(): void {
		// Nothing to release for objects that are not shapes
	}

	/** Sets the Pixi mask from the createjs one: Pixi masks only while the createjs mask would clip */
	_updatePixiMask(): void {
		const mask = this._mask;
		const node = mask && this._maskHost && mask._clipsAsMask() ? mask._pixiMaskNode() : null;
		if (this.pixi.mask !== node) {
			this.pixi.mask = node;
			if (!node && mask) {
				mask._releaseMaskNode();
			}
		}
	}

	setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): this {
		this.x = x || 0;
		this.y = y || 0;
		this.scaleX = scaleX == null ? 1 : scaleX;
		this.scaleY = scaleY == null ? 1 : scaleY;
		this.rotation = rotation || 0;
		this.skewX = skewX || 0;
		this.skewY = skewY || 0;
		this.regX = regX || 0;
		this.regY = regY || 0;
		return this;
	}

	set(props: { [key: string]: string | number | boolean | null }): this {
		Object.keys(props).forEach(key => {
			Reflect.set(this, key, props[key]);
		});
		return this;
	}

	isVisible(): boolean {
		return !!(this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0);
	}

	cache(x: number, y: number, width: number, height: number, scale?: number): void {
		this.bitmapCache = { x, y, width, height, scale: scale || 1 };
	}

	updateCache(): void {
		// Nothing is cached on the Pixi side; filters apply without a cache
	}

	uncache(): void {
		this.bitmapCache = null;
	}

	setBounds(x: number | null, y?: number, width?: number, height?: number): void {
		this._bounds = x == null ? null : new Rectangle(x, y, width, height);
	}

	getChildDepth(): number {
		let depth = 0;
		for (let o = this.parent; o; o = o.parent) {
			depth++;
		}
		return depth;
	}

	/** createjs tick phase: dispatches the tick event to listeners */
	_tick(event: Event): void {
		const listeners = this._listeners;
		if (listeners && listeners.tick) {
			event.target = null;
			event.propagationStopped = event.immediatePropagationStopped = false;
			this.dispatchEvent(event);
		}
	}

	toString(): string {
		return '[DisplayObject (name=' + this.name + ')]';
	}
}

/**
 * createjs-compatible Container. The Pixi node's children are the display
 * list's nodes in the same order, followed by the nodes of the masks the
 * children use (a createjs mask is drawn in its target's parent space, so
 * its node lives in the parent's node).
 */
export class Container extends DisplayObject {
	children: DisplayObject[] = [];
	tickChildren = true;
	mouseChildren = true;
	/** Mask nodes held in this container's node, by the child that uses them */
	private _maskNodes: { [childId: number]: IOwnedNode } = {};

	constructor(pixi?: IOwnedNode) {
		super(pixi || new PixiContainer());
	}

	get numChildren(): number {
		return this.children.length;
	}

	addChild(...children: DisplayObject[]): DisplayObject | null {
		let last: DisplayObject | null = null;
		children.forEach(child => {
			if (child != null) {
				last = this.addChildAt(child, this.children.length);
			}
		});
		return last;
	}

	addChildAt(child: DisplayObject, index: number): DisplayObject {
		if (index < 0 || index > this.children.length) {
			return child;
		}

		const oldParent = child.parent;
		const same = oldParent === this;
		if (oldParent) {
			oldParent._removeChildAt(oldParent.children.indexOf(child), same);
		}
		child.parent = this;
		this.children.splice(index, 0, child);
		this.pixi.addChildAt(child.pixi, index);
		this._attachMask(child);
		child._setInheritedComposite(this._effectiveComposite());
		if (!same) {
			child.dispatchEvent('added');
		}
		return child;
	}

	removeChild(...children: DisplayObject[]): boolean {
		let removed = true;
		children.forEach(child => {
			removed = this._removeChildAt(this.children.indexOf(child)) && removed;
		});
		return removed;
	}

	removeChildAt(...indexes: number[]): boolean {
		const sorted = indexes.slice().sort((a, b) => b - a);
		let removed = true;
		sorted.forEach(index => {
			removed = this._removeChildAt(index) && removed;
		});
		return removed;
	}

	removeAllChildren(): void {
		while (this.children.length) {
			this._removeChildAt(0);
		}
	}

	getChildAt(index: number): DisplayObject | undefined {
		return this.children[index];
	}

	getChildByName(name: string): DisplayObject | null {
		const children = this.children;
		for (let i = 0; i < children.length; i++) {
			if (children[i].name == name) {
				return children[i];
			}
		}
		return null;
	}

	getChildIndex(child: DisplayObject): number {
		return this.children.indexOf(child);
	}

	setChildIndex(child: DisplayObject, index: number): void {
		const children = this.children;
		if (child.parent !== this || index < 0 || index >= children.length) {
			return;
		}
		const current = children.indexOf(child);
		if (current < 0 || current === index) {
			return;
		}
		children.splice(current, 1);
		children.splice(index, 0, child);
		this.pixi.setChildIndex(child.pixi, index);
	}

	swapChildrenAt(index1: number, index2: number): void {
		const children = this.children;
		const a = children[index1];
		const b = children[index2];
		if (!a || !b) {
			return;
		}
		children[index1] = b;
		children[index2] = a;
		this.pixi.swapChildren(a.pixi, b.pixi);
	}

	swapChildren(child1: DisplayObject, child2: DisplayObject): void {
		const index1 = this.children.indexOf(child1);
		const index2 = this.children.indexOf(child2);
		if (index1 >= 0 && index2 >= 0) {
			this.swapChildrenAt(index1, index2);
		}
	}

	sortChildren(compare: (a: DisplayObject, b: DisplayObject) => number): void {
		this.children.sort(compare);
		this.children.forEach((child, index) => {
			this.pixi.setChildIndex(child.pixi, index);
		});
	}

	contains(child: DisplayObject | null): boolean {
		for (let o = child; o; o = o.parent) {
			if (o === this) {
				return true;
			}
		}
		return false;
	}

	_removeChildAt(index: number, silent?: boolean): boolean {
		if (index < 0 || index > this.children.length - 1) {
			return false;
		}
		const child = this.children[index];
		this._detachMask(child);
		child.parent = null;
		this.children.splice(index, 1);
		this.pixi.removeChild(child.pixi);
		// A silent removal is the first half of re-adding to this same container
		// (the timeline does it every resolve): the inherited composite stays
		if (!silent) {
			child._setInheritedComposite(null);
			child.dispatchEvent('removed');
		}
		return true;
	}

	/** Puts the node of a child's mask into this container's node, and sets it as the Pixi mask */
	_attachMask(child: DisplayObject): void {
		const mask = child.mask;
		if (!mask || child.parent !== this) {
			return;
		}
		this._maskNodes[child.id] = mask.pixi;
		this.pixi.addChild(mask.pixi);
		child._maskHost = this;
		mask._maskTargets.push(child);
		mask._updateRenderable();
		child._updatePixiMask();
	}

	_detachMask(child: DisplayObject): void {
		const node = this._maskNodes[child.id];
		if (node) {
			delete this._maskNodes[child.id];
			if (node.parent === this.pixi) {
				this.pixi.removeChild(node);
			}
		}
		const mask = child.mask;
		if (mask) {
			const index = mask._maskTargets.indexOf(child);
			if (index >= 0) {
				mask._maskTargets.splice(index, 1);
			}
		}
		child._maskHost = null;
		child.pixi.mask = null;
		if (mask) {
			// Pixi makes a released mask node renderable again
			mask._releaseMaskNode();
			mask._updateRenderable();
		}
	}

	_applyComposite(): void {
		super._applyComposite();
		const composite = this._effectiveComposite();
		this.children.forEach(child => child._setInheritedComposite(composite));
	}

	/** createjs tick phase: children in reverse order (live array), then this object's listeners */
	_tick(event: Event): void {
		if (this.tickChildren) {
			for (let i = this.children.length - 1; i >= 0; i--) {
				const child = this.children[i];
				if (child.tickEnabled) {
					child._tick(event);
				}
			}
		}
		super._tick(event);
	}

	toString(): string {
		return '[Container (name=' + this.name + ')]';
	}
}
