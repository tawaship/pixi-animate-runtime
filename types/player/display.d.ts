import * as PIXI from 'pixi.js';
import { Event, EventDispatcher } from './events';
import { Rectangle } from './geom';
/**
 * A Pixi node owned by a createjs-compatible display object.
 */
export interface IOwnedNode extends PIXI.Container {
    owner: DisplayObject | null;
}
export declare class PixiContainer extends PIXI.Container implements IOwnedNode {
    owner: DisplayObject | null;
}
/** A hit area nothing is inside: Pixi's hit test skips a node with it and the node's children */
export declare const NO_HIT_AREA: PIXI.Rectangle;
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
export declare class DisplayObject extends EventDispatcher {
    /** The Pixi node this object shows */
    readonly pixi: IOwnedNode;
    readonly id: number;
    parent: Container | null;
    tickEnabled: boolean;
    mouseEnabled: boolean;
    cursor: string | null;
    hitArea: DisplayObject | null;
    shadow: null;
    snapToPixel: boolean;
    /**
     * Kept off the display list by the timeline (published code sets it on masks
     * and absent instances). createjs reads it only when its timeline places
     * children: it does not affect drawing (an _off object on a display list is drawn)
     */
    /** createjs leaves it unset (undefined) until the timeline or published code sets it */
    private _offValue;
    private _name;
    private _mask;
    private _filters;
    private _compositeOperation;
    /** The composite operation in effect on the parent (createjs draws children under it) */
    private _inheritedComposite;
    /** The cache createjs would draw through (filters show in Pixi without one) */
    bitmapCache: ICacheState | null;
    /** Set only when the symbol has them (createjs leaves them undefined otherwise) */
    nominalBounds?: Rectangle | null;
    frameBounds?: Rectangle[] | null;
    _bounds: Rectangle | null;
    /** The parent whose Pixi node holds this object's mask node */
    _maskHost: Container | null;
    /** The objects this object masks (while they are on a display list) */
    _maskTargets: DisplayObject[];
    constructor(pixi: IOwnedNode);
    get _eventParent(): EventDispatcher | null;
    private get _transform();
    get x(): number;
    set x(value: number);
    get y(): number;
    set y(value: number);
    get scaleX(): number;
    set scaleX(value: number);
    get scaleY(): number;
    set scaleY(value: number);
    get regX(): number;
    set regX(value: number);
    get regY(): number;
    set regY(value: number);
    get rotation(): number;
    set rotation(value: number);
    get skewX(): number;
    set skewX(value: number);
    get skewY(): number;
    set skewY(value: number);
    get alpha(): number;
    set alpha(value: number);
    get visible(): boolean;
    set visible(value: boolean);
    get name(): string | null;
    set name(value: string | null);
    get _off(): boolean | undefined;
    set _off(value: boolean | undefined);
    get compositeOperation(): string | null;
    set compositeOperation(value: string | null);
    /**
     * The composite operation createjs draws this object with: its own, or else
     * the nearest ancestor's (createjs sets it on the context and draws the
     * children under it, each child saving and restoring the context)
     */
    _effectiveComposite(): string | null;
    /** Told by the parent when the composite operation in effect on it changes */
    _setInheritedComposite(value: string | null): void;
    /**
     * Pixi blends per drawing node (a container has no blend mode of its own),
     * so the composite operation in effect is set on this object's drawing node
     * and handed down to the children
     */
    _applyComposite(): void;
    get mask(): DisplayObject | null;
    set mask(value: DisplayObject | null);
    get filters(): IFilterLike[] | null;
    set filters(value: IFilterLike[] | null);
    /** Blend mode for the Pixi node(s) that draw this object */
    _setBlendMode(mode: PIXI.BLEND_MODES): void;
    /**
     * The node is drawn unless Pixi uses it as a mask, or it is in a parent's
     * node only to carry the mask shape of a sibling (a createjs mask is not on
     * any display list and is not drawn itself)
     */
    _updateRenderable(): void;
    /** Whether this object clips when used as a mask (createjs clips only with a non-empty Graphics) */
    _clipsAsMask(): boolean;
    /** The node Pixi masks with when this object is a mask */
    _pixiMaskNode(): PIXI.Container | null;
    /** Called when this object stops being some object's Pixi mask */
    _releaseMaskNode(): void;
    /** Sets the Pixi mask from the createjs one: Pixi masks only while the createjs mask would clip */
    _updatePixiMask(): void;
    setTransform(x?: number, y?: number, scaleX?: number, scaleY?: number, rotation?: number, skewX?: number, skewY?: number, regX?: number, regY?: number): this;
    set(props: {
        [key: string]: string | number | boolean | null;
    }): this;
    isVisible(): boolean;
    cache(x: number, y: number, width: number, height: number, scale?: number): void;
    updateCache(): void;
    uncache(): void;
    setBounds(x: number | null, y?: number, width?: number, height?: number): void;
    getChildDepth(): number;
    /** createjs tick phase: dispatches the tick event to listeners */
    _tick(event: Event): void;
    toString(): string;
}
/**
 * createjs-compatible Container. The Pixi node's children are the display
 * list's nodes in the same order, followed by the nodes of the masks the
 * children use (a createjs mask is drawn in its target's parent space, so
 * its node lives in the parent's node).
 */
export declare class Container extends DisplayObject {
    children: DisplayObject[];
    tickChildren: boolean;
    mouseChildren: boolean;
    /** Mask nodes held in this container's node, by the child that uses them */
    private _maskNodes;
    constructor(pixi?: IOwnedNode);
    get numChildren(): number;
    addChild(...children: DisplayObject[]): DisplayObject | null;
    addChildAt(child: DisplayObject, index: number): DisplayObject;
    removeChild(...children: DisplayObject[]): boolean;
    removeChildAt(...indexes: number[]): boolean;
    removeAllChildren(): void;
    getChildAt(index: number): DisplayObject | undefined;
    getChildByName(name: string): DisplayObject | null;
    getChildIndex(child: DisplayObject): number;
    setChildIndex(child: DisplayObject, index: number): void;
    swapChildrenAt(index1: number, index2: number): void;
    swapChildren(child1: DisplayObject, child2: DisplayObject): void;
    sortChildren(compare: (a: DisplayObject, b: DisplayObject) => number): void;
    contains(child: DisplayObject | null): boolean;
    _removeChildAt(index: number, silent?: boolean): boolean;
    /** Puts the node of a child's mask into this container's node, and sets it as the Pixi mask */
    _attachMask(child: DisplayObject): void;
    _detachMask(child: DisplayObject): void;
    _applyComposite(): void;
    /** createjs tick phase: children in reverse order (live array), then this object's listeners */
    _tick(event: Event): void;
    toString(): string;
}
