/*!
 * @tawaship/pixi-animate-runtime - v0.0.0
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

this.PIXI = this.PIXI || {};
(function (exports, PIXI) {
    'use strict';

    function _interopNamespaceDefault(e) {
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () { return e[k]; }
                    });
                }
            });
        }
        n.default = e;
        return Object.freeze(n);
    }

    var PIXI__namespace = /*#__PURE__*/_interopNamespaceDefault(PIXI);

    /**
     * createjs-compatible events: Event and EventDispatcher, with the capture,
     * target and bubble phases createjs dispatches through the parent chain.
     */
    var Event = function Event(type, bubbles, cancelable) {
        this.target = null;
        this.currentTarget = null;
        this.eventPhase = 0;
        this.defaultPrevented = false;
        this.propagationStopped = false;
        this.immediatePropagationStopped = false;
        this.removed = false;
        this.type = type;
        this.bubbles = !!bubbles;
        this.cancelable = !!cancelable;
        this.timeStamp = Date.now();
    };
    Event.prototype.preventDefault = function preventDefault () {
        this.defaultPrevented = this.cancelable;
    };
    Event.prototype.stopPropagation = function stopPropagation () {
        this.propagationStopped = true;
    };
    Event.prototype.stopImmediatePropagation = function stopImmediatePropagation () {
        this.immediatePropagationStopped = this.propagationStopped = true;
    };
    Event.prototype.remove = function remove () {
        this.removed = true;
    };
    Event.prototype.clone = function clone () {
        return new Event(this.type, this.bubbles, this.cancelable);
    };
    Event.prototype.set = function set (props) {
            var this$1$1 = this;

        Object.keys(props).forEach(function (key) {
            Reflect.set(this$1$1, key, props[key]);
        });
        return this;
    };
    Event.prototype.toString = function toString () {
        return '[Event (type=' + this.type + ')]';
    };
    function callListener(listener, event) {
        // As createjs: an object with handleEvent is called through it, anything else directly
        if (typeof listener !== 'function') {
            listener.handleEvent(event);
        }
        else {
            listener(event);
        }
    }
    var EventDispatcher = function EventDispatcher() {
        this._listeners = null;
        this._captureListeners = null;
    };

    var prototypeAccessors$2 = { _eventParent: { configurable: true } };
    /** The parent the bubble and capture phases walk through (a display object's parent) */
    prototypeAccessors$2._eventParent.get = function () {
        return null;
    };
    EventDispatcher.prototype.addEventListener = function addEventListener (type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (!listeners) {
            listeners = {};
            if (useCapture) {
                this._captureListeners = listeners;
            }
            else {
                this._listeners = listeners;
            }
        }
        var list = listeners[type];
        if (list) {
            this.removeEventListener(type, listener, useCapture);
            // Removing may have dropped the list
            var again = listeners[type];
            if (again) {
                again.push(listener);
            }
            else {
                listeners[type] = [listener];
            }
        }
        else {
            listeners[type] = [listener];
        }
        return listener;
    };
    EventDispatcher.prototype.on = function on (type, listener, scope, once, data, useCapture) {
        var owner = typeof listener === 'function' ? (scope || this) : (scope || listener);
        var wrapper = function (event) {
            if (typeof listener === 'function') {
                listener.call(owner, event, data);
            }
            else {
                listener.handleEvent.call(owner, event);
            }
            if (once) {
                event.remove();
            }
        };
        return this.addEventListener(type, wrapper, useCapture);
    };
    EventDispatcher.prototype.removeEventListener = function removeEventListener (type, listener, useCapture) {
        var listeners = useCapture ? this._captureListeners : this._listeners;
        if (!listeners) {
            return;
        }
        var list = listeners[type];
        if (!list) {
            return;
        }
        for (var i = 0, l = list.length; i < l; i++) {
            if (list[i] === listener) {
                if (l === 1) {
                    delete listeners[type];
                }
                else {
                    list.splice(i, 1);
                }
                break;
            }
        }
    };
    EventDispatcher.prototype.off = function off (type, listener, useCapture) {
        this.removeEventListener(type, listener, useCapture);
    };
    EventDispatcher.prototype.removeAllEventListeners = function removeAllEventListeners (type) {
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
    };
    EventDispatcher.prototype.dispatchEvent = function dispatchEvent (eventOrType, bubbles, cancelable) {
        var event;
        if (typeof eventOrType === 'string') {
            var listeners = this._listeners;
            if (!bubbles && (!listeners || !listeners[eventOrType])) {
                return true;
            }
            event = new Event(eventOrType, bubbles, cancelable);
        }
        else {
            // An event that has been dispatched already is dispatched as a copy
            event = eventOrType.target ? eventOrType.clone() : eventOrType;
        }
        event.target = this;
        if (!event.bubbles || !this._eventParent) {
            this._dispatchEvent(event, 2);
        }
        else {
            var chain = [];
            for (var top = this; top; top = top._eventParent) {
                chain.push(top);
            }
            // Capture phase, from the top down to the target's parent
            for (var i = chain.length - 1; i >= 0 && !event.propagationStopped; i--) {
                chain[i]._dispatchEvent(event, 1 + (i === 0 ? 1 : 0));
            }
            // Bubble phase, from the target's parent up
            for (var i$1 = 1; i$1 < chain.length && !event.propagationStopped; i$1++) {
                chain[i$1]._dispatchEvent(event, 3);
            }
        }
        return !event.defaultPrevented;
    };
    EventDispatcher.prototype.hasEventListener = function hasEventListener (type) {
        var listeners = this._listeners;
        var capture = this._captureListeners;
        return !!((listeners && listeners[type]) || (capture && capture[type]));
    };
    EventDispatcher.prototype.willTrigger = function willTrigger (type) {
        for (var o = this; o; o = o._eventParent) {
            if (o.hasEventListener(type)) {
                return true;
            }
        }
        return false;
    };
    /**
     * Phase 1 is capture, 2 the target, 3 bubbling. At the target, the capture
     * listeners run first and then the others (createjs runs the target phase
     * twice, the second time as phase 2.1, which reads the non-capture listeners).
     */
    EventDispatcher.prototype._dispatchEvent = function _dispatchEvent (event, phase) {
        var map = phase <= 2 ? this._captureListeners : this._listeners;
        var found = map ? map[event.type] : undefined;
        if (found && found.length) {
            var list = found.slice();
            event.currentTarget = this;
            event.eventPhase = phase | 0;
            event.removed = false;
            for (var i = 0; i < list.length && !event.immediatePropagationStopped; i++) {
                var listener = list[i];
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
    };

    Object.defineProperties( EventDispatcher.prototype, prototypeAccessors$2 );

    var DEG_TO_RAD = Math.PI / 180;
    var RAD_TO_DEG = 180 / Math.PI;
    /**
     * A Pixi Transform whose rotation and skew follow createjs.
     *
     * - The createjs values (degrees) are kept as written, so that reading them
     *   back gives exactly what was written (a degrees -> radians -> degrees round
     *   trip does not)
     * - Pixi's own fields carry the same values in Pixi's terms (rotation in
     *   radians, skew.x = -skewX, skew.y = skewY, all in radians), so code that
     *   uses the Pixi node sees consistent values. A write made through Pixi
     *   (node.rotation, node.skew) is taken over as the new createjs value
     * - The local matrix is built the createjs way: skew x (rotation x scale),
     *   i.e. the object is rotated first and then skewed. Pixi composes rotation
     *   and skew the other way round (skewed, then rotated as a whole); the two
     *   agree only while the rotation is 0 or skewX equals skewY. Published
     *   content is the reference, so createjs's composition is used
     */
    var CjsTransform = /*@__PURE__*/(function (superclass) {
        function CjsTransform() {
            superclass.apply(this, arguments);
            /** createjs rotation, in degrees */
            this.degRotation = 0;
            /** createjs skewX / skewY, in degrees */
            this.degSkewX = 0;
            this.degSkewY = 0;
            /** The radians last written to the Pixi fields for the values above */
            this._radRotation = 0;
            this._radSkewX = 0;
            this._radSkewY = 0;
        }

        if ( superclass ) CjsTransform.__proto__ = superclass;
        CjsTransform.prototype = Object.create( superclass && superclass.prototype );
        CjsTransform.prototype.constructor = CjsTransform;
        CjsTransform.prototype.setRotation = function setRotation (degrees) {
            this.degRotation = degrees;
            this._radRotation = degrees * DEG_TO_RAD;
            if (this._rotation !== this._radRotation) {
                this._rotation = this._radRotation;
            }
            this.updateSkew();
        };
        CjsTransform.prototype.setSkewX = function setSkewX (degrees) {
            this.degSkewX = degrees;
            this._radSkewX = -degrees * DEG_TO_RAD;
            // Setting the point calls updateSkew when the value changes
            this.skew.x = this._radSkewX;
            this.updateSkew();
        };
        CjsTransform.prototype.setSkewY = function setSkewY (degrees) {
            this.degSkewY = degrees;
            this._radSkewY = degrees * DEG_TO_RAD;
            this.skew.y = this._radSkewY;
            this.updateSkew();
        };
        CjsTransform.prototype.updateSkew = function updateSkew () {
            // Values written through Pixi become the createjs values
            if (this._rotation !== this._radRotation) {
                this._radRotation = this._rotation;
                this.degRotation = this._rotation * RAD_TO_DEG;
            }
            if (this.skew.x !== this._radSkewX) {
                this._radSkewX = this.skew.x;
                this.degSkewX = -this.skew.x * RAD_TO_DEG;
            }
            if (this.skew.y !== this._radSkewY) {
                this._radSkewY = this.skew.y;
                this.degSkewY = this.skew.y * RAD_TO_DEG;
            }
            // createjs Matrix2D.appendTransform: (skew) x (rotation, scale)
            var cos = 1;
            var sin = 0;
            if (this.degRotation % 360) {
                var r = this.degRotation * DEG_TO_RAD;
                cos = Math.cos(r);
                sin = Math.sin(r);
            }
            if (this.degSkewX || this.degSkewY) {
                var skewX = this.degSkewX * DEG_TO_RAD;
                var skewY = this.degSkewY * DEG_TO_RAD;
                var a1 = Math.cos(skewY);
                var b1 = Math.sin(skewY);
                var c1 = -Math.sin(skewX);
                var d1 = Math.cos(skewX);
                this._cx = a1 * cos + c1 * sin;
                this._sx = b1 * cos + d1 * sin;
                this._cy = a1 * -sin + c1 * cos;
                this._sy = b1 * -sin + d1 * cos;
            }
            else {
                this._cx = cos;
                this._sx = sin;
                this._cy = -sin;
                this._sy = cos;
            }
            this._localID++;
        };

        return CjsTransform;
    }(PIXI__namespace.Transform));

    /**
     * createjs-compatible Rectangle (its own members are exactly x, y, width,
     * height, as createjs's; Pixi's Rectangle also carries a shape type).
     */
    var Rectangle = function Rectangle(x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
    };
    Rectangle.prototype.setValues = function setValues (x, y, width, height) {
        this.x = x || 0;
        this.y = y || 0;
        this.width = width || 0;
        this.height = height || 0;
        return this;
    };
    Rectangle.prototype.copy = function copy (rect) {
        return this.setValues(rect.x, rect.y, rect.width, rect.height);
    };
    Rectangle.prototype.clone = function clone () {
        return new Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.contains = function contains (x, y, width, height) {
        var w = width || 0;
        var h = height || 0;
        return x >= this.x && x + w <= this.x + this.width && y >= this.y && y + h <= this.y + this.height;
    };
    Rectangle.prototype.isEmpty = function isEmpty () {
        return this.width <= 0 || this.height <= 0;
    };
    Rectangle.prototype.toPixi = function toPixi () {
        return new PIXI__namespace.Rectangle(this.x, this.y, this.width, this.height);
    };
    Rectangle.prototype.toString = function toString () {
        return '[Rectangle (x=' + this.x + ' y=' + this.y + ' width=' + this.width + ' height=' + this.height + ')]';
    };

    var PixiContainer = /*@__PURE__*/(function (superclass) {
        function PixiContainer() {
            superclass.apply(this, arguments);
            this.owner = null;
        }

        if ( superclass ) PixiContainer.__proto__ = superclass;
        PixiContainer.prototype = Object.create( superclass && superclass.prototype );
        PixiContainer.prototype.constructor = PixiContainer;

        return PixiContainer;
    }(PIXI__namespace.Container));
    var nextId = 0;
    /** A hit area nothing is inside: Pixi's hit test skips a node with it and the node's children */
    var NO_HIT_AREA = new PIXI__namespace.Rectangle(0, 0, 0, 0);
    /** createjs compositeOperation -> Pixi blend mode (the ones WebGL renders) */
    var BLEND_MODES = {
        'source-over': PIXI__namespace.BLEND_MODES.NORMAL,
        lighter: PIXI__namespace.BLEND_MODES.ADD,
        multiply: PIXI__namespace.BLEND_MODES.MULTIPLY,
        screen: PIXI__namespace.BLEND_MODES.SCREEN
    };
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
    var DisplayObject = /*@__PURE__*/(function (EventDispatcher) {
        function DisplayObject(pixi) {
            EventDispatcher.call(this);
            this.parent = null;
            this.tickEnabled = true;
            this.mouseEnabled = true;
            this.cursor = null;
            this.hitArea = null;
            this.shadow = null;
            this.snapToPixel = true;
            /**
             * Kept off the display list by the timeline (published code sets it on masks
             * and absent instances). createjs reads it only when its timeline places
             * children: it does not affect drawing (an _off object on a display list is drawn)
             */
            /** createjs leaves it unset (undefined) until the timeline or published code sets it */
            this._offValue = undefined;
            this._name = null;
            this._mask = null;
            this._filters = null;
            this._compositeOperation = null;
            /** The composite operation in effect on the parent (createjs draws children under it) */
            this._inheritedComposite = null;
            /** The cache createjs would draw through (filters show in Pixi without one) */
            this.bitmapCache = null;
            this._bounds = null;
            /** The parent whose Pixi node holds this object's mask node */
            this._maskHost = null;
            /** The objects this object masks (while they are on a display list) */
            this._maskTargets = [];
            this.id = nextId++;
            this.pixi = pixi;
            pixi.owner = this;
            pixi.transform = new CjsTransform();
        }

        if ( EventDispatcher ) DisplayObject.__proto__ = EventDispatcher;
        DisplayObject.prototype = Object.create( EventDispatcher && EventDispatcher.prototype );
        DisplayObject.prototype.constructor = DisplayObject;

        var prototypeAccessors = { _eventParent: { configurable: true },_transform: { configurable: true },x: { configurable: true },y: { configurable: true },scaleX: { configurable: true },scaleY: { configurable: true },regX: { configurable: true },regY: { configurable: true },rotation: { configurable: true },skewX: { configurable: true },skewY: { configurable: true },alpha: { configurable: true },visible: { configurable: true },name: { configurable: true },_off: { configurable: true },compositeOperation: { configurable: true },mask: { configurable: true },filters: { configurable: true } };
        prototypeAccessors._eventParent.get = function () {
            return this.parent;
        };
        prototypeAccessors._transform.get = function () {
            var transform = this.pixi.transform;
            if (transform instanceof CjsTransform) {
                return transform;
            }
            // The Pixi side replaced the transform: keep createjs semantics on a new one
            var replacement = new CjsTransform();
            replacement.setFromMatrix(transform.localTransform);
            this.pixi.transform = replacement;
            return replacement;
        };
        prototypeAccessors.x.get = function () { return this.pixi.position.x; };
        prototypeAccessors.x.set = function (value) { this.pixi.position.x = value; };
        prototypeAccessors.y.get = function () { return this.pixi.position.y; };
        prototypeAccessors.y.set = function (value) { this.pixi.position.y = value; };
        prototypeAccessors.scaleX.get = function () { return this.pixi.scale.x; };
        prototypeAccessors.scaleX.set = function (value) { this.pixi.scale.x = value; };
        prototypeAccessors.scaleY.get = function () { return this.pixi.scale.y; };
        prototypeAccessors.scaleY.set = function (value) { this.pixi.scale.y = value; };
        prototypeAccessors.regX.get = function () { return this.pixi.pivot.x; };
        prototypeAccessors.regX.set = function (value) { this.pixi.pivot.x = value; };
        prototypeAccessors.regY.get = function () { return this.pixi.pivot.y; };
        prototypeAccessors.regY.set = function (value) { this.pixi.pivot.y = value; };
        prototypeAccessors.rotation.get = function () { return this._transform.degRotation; };
        prototypeAccessors.rotation.set = function (value) { this._transform.setRotation(value); };
        prototypeAccessors.skewX.get = function () { return this._transform.degSkewX; };
        prototypeAccessors.skewX.set = function (value) { this._transform.setSkewX(value); };
        prototypeAccessors.skewY.get = function () { return this._transform.degSkewY; };
        prototypeAccessors.skewY.set = function (value) { this._transform.setSkewY(value); };
        prototypeAccessors.alpha.get = function () { return this.pixi.alpha; };
        prototypeAccessors.alpha.set = function (value) { this.pixi.alpha = value; };
        prototypeAccessors.visible.get = function () { return this.pixi.visible; };
        prototypeAccessors.visible.set = function (value) { this.pixi.visible = value; };
        prototypeAccessors.name.get = function () { return this._name; };
        prototypeAccessors.name.set = function (value) {
            this._name = value;
            this.pixi.name = value == null ? '' : String(value);
        };
        prototypeAccessors._off.get = function () { return this._offValue; };
        prototypeAccessors._off.set = function (value) {
            this._offValue = value;
        };
        prototypeAccessors.compositeOperation.get = function () { return this._compositeOperation; };
        prototypeAccessors.compositeOperation.set = function (value) {
            this._compositeOperation = value;
            this._applyComposite();
        };
        /**
         * The composite operation createjs draws this object with: its own, or else
         * the nearest ancestor's (createjs sets it on the context and draws the
         * children under it, each child saving and restoring the context)
         */
        DisplayObject.prototype._effectiveComposite = function _effectiveComposite () {
            return this._compositeOperation || this._inheritedComposite;
        };
        /** Told by the parent when the composite operation in effect on it changes */
        DisplayObject.prototype._setInheritedComposite = function _setInheritedComposite (value) {
            if (value === this._inheritedComposite) {
                return;
            }
            this._inheritedComposite = value;
            this._applyComposite();
        };
        /**
         * Pixi blends per drawing node (a container has no blend mode of its own),
         * so the composite operation in effect is set on this object's drawing node
         * and handed down to the children
         */
        DisplayObject.prototype._applyComposite = function _applyComposite () {
            var composite = this._effectiveComposite();
            var mode = composite ? BLEND_MODES[composite] : undefined;
            this._setBlendMode(mode === undefined ? PIXI__namespace.BLEND_MODES.NORMAL : mode);
        };
        prototypeAccessors.mask.get = function () { return this._mask; };
        prototypeAccessors.mask.set = function (value) {
            if (this._mask === value) {
                return;
            }
            var host = this._maskHost;
            if (host) {
                host._detachMask(this);
            }
            this._mask = value;
            this.pixi.mask = null;
            if (this.parent) {
                this.parent._attachMask(this);
            }
        };
        prototypeAccessors.filters.get = function () { return this._filters; };
        prototypeAccessors.filters.set = function (value) {
            this._filters = value;
            this.pixi.filters = value && value.length ? value.map(function (filter) { return filter.pixiFilter; }) : [];
        };
        /** Blend mode for the Pixi node(s) that draw this object */
        DisplayObject.prototype._setBlendMode = function _setBlendMode (mode) {
            var node = this.pixi;
            if (node instanceof PIXI__namespace.Sprite || node instanceof PIXI__namespace.Graphics) {
                node.blendMode = mode;
            }
        };
        /**
         * The node is drawn unless Pixi uses it as a mask, or it is in a parent's
         * node only to carry the mask shape of a sibling (a createjs mask is not on
         * any display list and is not drawn itself)
         */
        DisplayObject.prototype._updateRenderable = function _updateRenderable () {
            var maskOnly = this.pixi.isMask || this._maskTargets.length > 0;
            this.pixi.renderable = !maskOnly;
            // Pixi hit tests nodes that are not drawn: a mask's node is kept out of pointer
            // hits (with its children) by a hit area nothing is inside, as createjs never hits a mask
            if (maskOnly) {
                this.pixi.hitArea = NO_HIT_AREA;
            }
            else if (this.pixi.hitArea === NO_HIT_AREA) {
                // Back to Pixi's default (null; the type definition does not take null, Pixi does)
                Reflect.set(this.pixi, 'hitArea', null);
            }
        };
        /** Whether this object clips when used as a mask (createjs clips only with a non-empty Graphics) */
        DisplayObject.prototype._clipsAsMask = function _clipsAsMask () {
            return false;
        };
        /** The node Pixi masks with when this object is a mask */
        DisplayObject.prototype._pixiMaskNode = function _pixiMaskNode () {
            return null;
        };
        /** Called when this object stops being some object's Pixi mask */
        DisplayObject.prototype._releaseMaskNode = function _releaseMaskNode () {
            // Nothing to release for objects that are not shapes
        };
        /** Sets the Pixi mask from the createjs one: Pixi masks only while the createjs mask would clip */
        DisplayObject.prototype._updatePixiMask = function _updatePixiMask () {
            var mask = this._mask;
            var node = mask && this._maskHost && mask._clipsAsMask() ? mask._pixiMaskNode() : null;
            if (this.pixi.mask !== node) {
                this.pixi.mask = node;
                if (!node && mask) {
                    mask._releaseMaskNode();
                }
            }
        };
        DisplayObject.prototype.setTransform = function setTransform (x, y, scaleX, scaleY, rotation, skewX, skewY, regX, regY) {
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
        };
        DisplayObject.prototype.set = function set (props) {
            var this$1$1 = this;

            Object.keys(props).forEach(function (key) {
                Reflect.set(this$1$1, key, props[key]);
            });
            return this;
        };
        DisplayObject.prototype.isVisible = function isVisible () {
            return !!(this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0);
        };
        DisplayObject.prototype.cache = function cache (x, y, width, height, scale) {
            this.bitmapCache = { x: x, y: y, width: width, height: height, scale: scale || 1 };
        };
        DisplayObject.prototype.updateCache = function updateCache () {
            // Nothing is cached on the Pixi side; filters apply without a cache
        };
        DisplayObject.prototype.uncache = function uncache () {
            this.bitmapCache = null;
        };
        DisplayObject.prototype.setBounds = function setBounds (x, y, width, height) {
            this._bounds = x == null ? null : new Rectangle(x, y, width, height);
        };
        DisplayObject.prototype.getChildDepth = function getChildDepth () {
            var depth = 0;
            for (var o = this.parent; o; o = o.parent) {
                depth++;
            }
            return depth;
        };
        /** createjs tick phase: dispatches the tick event to listeners */
        DisplayObject.prototype._tick = function _tick (event) {
            var listeners = this._listeners;
            if (listeners && listeners.tick) {
                event.target = null;
                event.propagationStopped = event.immediatePropagationStopped = false;
                this.dispatchEvent(event);
            }
        };
        DisplayObject.prototype.toString = function toString () {
            return '[DisplayObject (name=' + this.name + ')]';
        };

        Object.defineProperties( DisplayObject.prototype, prototypeAccessors );

        return DisplayObject;
    }(EventDispatcher));
    /**
     * createjs-compatible Container. The Pixi node's children are the display
     * list's nodes in the same order, followed by the nodes of the masks the
     * children use (a createjs mask is drawn in its target's parent space, so
     * its node lives in the parent's node).
     */
    var Container = /*@__PURE__*/(function (DisplayObject) {
        function Container(pixi) {
            DisplayObject.call(this, pixi || new PixiContainer());
            this.children = [];
            this.tickChildren = true;
            this.mouseChildren = true;
            /** Mask nodes held in this container's node, by the child that uses them */
            this._maskNodes = {};
        }

        if ( DisplayObject ) Container.__proto__ = DisplayObject;
        Container.prototype = Object.create( DisplayObject && DisplayObject.prototype );
        Container.prototype.constructor = Container;

        var prototypeAccessors$1 = { numChildren: { configurable: true } };
        prototypeAccessors$1.numChildren.get = function () {
            return this.children.length;
        };
        Container.prototype.addChild = function addChild () {
            var this$1$1 = this;
            var children = [], len = arguments.length;
            while ( len-- ) children[ len ] = arguments[ len ];

            var last = null;
            children.forEach(function (child) {
                if (child != null) {
                    last = this$1$1.addChildAt(child, this$1$1.children.length);
                }
            });
            return last;
        };
        Container.prototype.addChildAt = function addChildAt (child, index) {
            if (index < 0 || index > this.children.length) {
                return child;
            }
            var oldParent = child.parent;
            var same = oldParent === this;
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
        };
        Container.prototype.removeChild = function removeChild () {
            var this$1$1 = this;
            var children = [], len = arguments.length;
            while ( len-- ) children[ len ] = arguments[ len ];

            var removed = true;
            children.forEach(function (child) {
                removed = this$1$1._removeChildAt(this$1$1.children.indexOf(child)) && removed;
            });
            return removed;
        };
        Container.prototype.removeChildAt = function removeChildAt () {
            var this$1$1 = this;
            var indexes = [], len = arguments.length;
            while ( len-- ) indexes[ len ] = arguments[ len ];

            var sorted = indexes.slice().sort(function (a, b) { return b - a; });
            var removed = true;
            sorted.forEach(function (index) {
                removed = this$1$1._removeChildAt(index) && removed;
            });
            return removed;
        };
        Container.prototype.removeAllChildren = function removeAllChildren () {
            while (this.children.length) {
                this._removeChildAt(0);
            }
        };
        Container.prototype.getChildAt = function getChildAt (index) {
            return this.children[index];
        };
        Container.prototype.getChildByName = function getChildByName (name) {
            var children = this.children;
            for (var i = 0; i < children.length; i++) {
                if (children[i].name == name) {
                    return children[i];
                }
            }
            return null;
        };
        Container.prototype.getChildIndex = function getChildIndex (child) {
            return this.children.indexOf(child);
        };
        Container.prototype.setChildIndex = function setChildIndex (child, index) {
            var children = this.children;
            if (child.parent !== this || index < 0 || index >= children.length) {
                return;
            }
            var current = children.indexOf(child);
            if (current < 0 || current === index) {
                return;
            }
            children.splice(current, 1);
            children.splice(index, 0, child);
            this.pixi.setChildIndex(child.pixi, index);
        };
        Container.prototype.swapChildrenAt = function swapChildrenAt (index1, index2) {
            var children = this.children;
            var a = children[index1];
            var b = children[index2];
            if (!a || !b) {
                return;
            }
            children[index1] = b;
            children[index2] = a;
            this.pixi.swapChildren(a.pixi, b.pixi);
        };
        Container.prototype.swapChildren = function swapChildren (child1, child2) {
            var index1 = this.children.indexOf(child1);
            var index2 = this.children.indexOf(child2);
            if (index1 >= 0 && index2 >= 0) {
                this.swapChildrenAt(index1, index2);
            }
        };
        Container.prototype.sortChildren = function sortChildren (compare) {
            var this$1$1 = this;

            this.children.sort(compare);
            this.children.forEach(function (child, index) {
                this$1$1.pixi.setChildIndex(child.pixi, index);
            });
        };
        Container.prototype.contains = function contains (child) {
            for (var o = child; o; o = o.parent) {
                if (o === this) {
                    return true;
                }
            }
            return false;
        };
        Container.prototype._removeChildAt = function _removeChildAt (index, silent) {
            if (index < 0 || index > this.children.length - 1) {
                return false;
            }
            var child = this.children[index];
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
        };
        /** Puts the node of a child's mask into this container's node, and sets it as the Pixi mask */
        Container.prototype._attachMask = function _attachMask (child) {
            var mask = child.mask;
            if (!mask || child.parent !== this) {
                return;
            }
            this._maskNodes[child.id] = mask.pixi;
            this.pixi.addChild(mask.pixi);
            child._maskHost = this;
            mask._maskTargets.push(child);
            mask._updateRenderable();
            child._updatePixiMask();
        };
        Container.prototype._detachMask = function _detachMask (child) {
            var node = this._maskNodes[child.id];
            if (node) {
                delete this._maskNodes[child.id];
                if (node.parent === this.pixi) {
                    this.pixi.removeChild(node);
                }
            }
            var mask = child.mask;
            if (mask) {
                var index = mask._maskTargets.indexOf(child);
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
        };
        Container.prototype._applyComposite = function _applyComposite () {
            DisplayObject.prototype._applyComposite.call(this);
            var composite = this._effectiveComposite();
            this.children.forEach(function (child) { return child._setInheritedComposite(composite); });
        };
        /** createjs tick phase: children in reverse order (live array), then this object's listeners */
        Container.prototype._tick = function _tick (event) {
            if (this.tickChildren) {
                for (var i = this.children.length - 1; i >= 0; i--) {
                    var child = this.children[i];
                    if (child.tickEnabled) {
                        child._tick(event);
                    }
                }
            }
            DisplayObject.prototype._tick.call(this, event);
        };
        Container.prototype.toString = function toString () {
            return '[Container (name=' + this.name + ')]';
        };

        Object.defineProperties( Container.prototype, prototypeAccessors$1 );

        return Container;
    }(DisplayObject));

    /**
     * The playback state of one tween of an instance. The values come from the
     * shared definition; only the positions are per instance.
     */
    var TweenState = function TweenState(def, target, scope, self) {
        this.position = 0;
        this.rawPosition = -1;
        /** Distance from the start of the current step (synched children take their frame from it) */
        this._stepPosition = 0;
        this.passive = false;
        this.def = def;
        this.target = target;
        this.scope = scope;
        this.self = self;
    };

    var prototypeAccessors$1 = { duration: { configurable: true } };
    prototypeAccessors$1.duration.get = function () {
        return this.def.duration;
    };
    /**
     * Tween.setPosition as a timeline drives it (actions are run separately by
     * the timeline). Nothing happens when the raw position does not change.
     */
    TweenState.prototype.setPosition = function setPosition (rawPosition, jump) {
        var duration = this.def.duration;
        var previous = this.rawPosition;
        var raw = rawPosition < 0 ? 0 : rawPosition;
        var position = 0;
        var end;
        if (duration === 0) {
            end = true;
            if (previous !== -1) {
                return;
            }
        }
        else {
            var loops = raw / duration | 0;
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
    };
    TweenState.prototype._updatePosition = function _updatePosition (jump, end) {
        var def = this.def;
        var position = this.position;
        if (def.writer !== null) {
            this.scope.writer(def.writer)(this.target, def.frames[position], this.scope.value);
        }
        // The last step whose start is at or before the position
        var keyframes = def.keyframes;
        var start = 0;
        var found = false;
        for (var i = 0; i < keyframes.length; i++) {
            if (keyframes[i] <= position || i === 0) {
                start = keyframes[i];
                found = true;
            }
            else {
                break;
            }
        }
        this._stepPosition = found ? position - start : 0;
    };
    /** AbstractTween._runActions for this tween's actions */
    TweenState.prototype._runActions = function _runActions (startRaw, endRaw, jump, includeStart) {
        if (!this.def.actions.length) {
            return false;
        }
        return runActions(this, this.def.duration, 0, startRaw, endRaw, jump, includeStart);
    };
    /** Tween._runActionsRange: runs the actions in the range, stopping when one moves the tween */
    TweenState.prototype._runActionsRange = function _runActionsRange (start, end, jump, includeStart) {
        var actions = this.def.actions;
        var reverse = start > end;
        var low = reverse ? end : start;
        var high = reverse ? start : end;
        var position = this.position;
        for (var n = 0; n < actions.length; n++) {
            var action = actions[reverse ? actions.length - 1 - n : n];
            var t = action.position;
            if (t === end || (t > low && t < high) || (includeStart && t === start)) {
                var scope = this.scope;
                var params = action.params ? action.params.map(function (value) { return scope.value(value); }) : [this];
                scope.script(action.script).apply(this.self, params);
                if (position !== this.position) {
                    return true;
                }
            }
        }
        return false;
    };

    Object.defineProperties( TweenState.prototype, prototypeAccessors$1 );
    /**
     * AbstractTween._runActions: splits the move from one raw position to another
     * into per-loop ranges and runs the actions of each, as createjs does.
     */
    function runActions(runner, duration, loop, startRaw, endRaw, jump, includeStart) {
        var startLoop;
        var endLoop;
        var start;
        var end;
        if (duration === 0) {
            startLoop = endLoop = start = end = 0;
        }
        else {
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
            var forward = endRaw >= startRaw;
            var n = startLoop;
            var first = includeStart;
            do {
                var rangeStart = n === startLoop ? start : forward ? 0 : duration;
                var rangeEnd = n === endLoop ? end : forward ? duration : 0;
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
    var Timeline = function Timeline(duration, labels) {
        var this$1$1 = this;

        this.tweens = [];
        this.loop = 0;
        this.position = 0;
        this.rawPosition = -1;
        this.duration = duration;
        this._labels = {};
        labels.forEach(function (label) {
            this$1$1._labels[label.label] = label.position;
        });
        this._labelList = labels.slice().sort(function (a, b) { return a.position - b.position; });
    };

    var prototypeAccessors$1$1 = { currentLabel: { configurable: true } };
    Timeline.prototype.getLabels = function getLabels () {
        return this._labelList;
    };
    prototypeAccessors$1$1.currentLabel.get = function () {
        var labels = this._labelList;
        var i = 0;
        for (; i < labels.length; i++) {
            if (this.position < labels[i].position) {
                break;
            }
        }
        return i === 0 ? null : labels[i - 1].label;
    };
    Timeline.prototype.resolve = function resolve (positionOrLabel) {
        var position = Number(positionOrLabel);
        if (!isNaN(position)) {
            return position;
        }
        var label = this._labels[positionOrLabel];
        return label === undefined ? undefined : label;
    };
    /**
     * AbstractTween.setPosition for the timeline: moves every tween, calls
     * back (the clip resolves its children), then runs the actions passed.
     */
    Timeline.prototype.setPosition = function setPosition (rawPosition, skipActions, jump, callback) {
        var duration = this.duration;
        var loop = this.loop;
        var previous = this.rawPosition;
        var raw = rawPosition < 0 ? 0 : rawPosition;
        var position = 0;
        if (duration === 0) {
            if (previous !== -1) {
                return;
            }
        }
        else {
            var loops = raw / duration | 0;
            position = raw - loops * duration;
            var end = loop !== -1 && raw >= loop * duration + duration;
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
        for (var i = 0; i < this.tweens.length; i++) {
            this.tweens[i].setPosition(position, jump);
        }
        if (callback) {
            callback();
        }
        if (!skipActions) {
            runActions(this, this.duration, this.loop, previous, raw, jump, !jump && previous === -1);
        }
    };
    Timeline.prototype._runActionsRange = function _runActionsRange (start, end, jump, includeStart) {
        var position = this.position;
        for (var i = 0; i < this.tweens.length; i++) {
            this.tweens[i]._runActions(start, end, jump, includeStart);
            if (position !== this.position) {
                return true;
            }
        }
        return false;
    };

    Object.defineProperties( Timeline.prototype, prototypeAccessors$1$1 );
    var INDEPENDENT = 'independent';
    var SINGLE_FRAME = 'single';
    var SYNCHED = 'synched';
    /**
     * createjs-compatible MovieClip. Plays its symbol's timeline from the shared
     * definition with createjs's rules: the two phases (tick: advance the
     * playhead; then resolve: write the tweens and settle the children), the
     * write rule (a tween writes only when its position changes), synched /
     * single children taking their frame from the parent's step, the reset of an
     * independent child when it comes back on the display list, and when frame
     * scripts run.
     */
    var MovieClip = /*@__PURE__*/(function (Container) {
        function MovieClip(mode, startPosition, loop, timeline, pixi) {
            var this$1$1 = this;

            Container.call(this, pixi);
            this.currentFrame = 0;
            this.paused = false;
            this.actionsEnabled = true;
            this.autoReset = true;
            this.framerate = null;
            this._synchOffset = 0;
            this._rawPosition = -1;
            this._t = 0;
            this._framerate = null;
            /**
             * Display objects the timeline placed, with the resolve that last placed
             * them (_resolveCount at that time). One placed in an earlier resolve and
             * not in the current one is removed at its end (createjs marks every entry
             * 1 at the start of a resolve and placed ones 2: an earlier count is its 1)
             */
            this._managed = {};
            this._resolveCount = 0;
            /**
             * While a resolve can still leave the display list as it is: the index of
             * the child the next placement has to be for that (createjs moves each placed
             * child to the bottom, so in a resolve that changes nothing they come from
             * the top of the placed block down), -1 once all have come. Null when the
             * placements are done as createjs does them.
             */
            this._expected = null;
            /** The length of the placed block at the start of the resolve (the children placed last time, at the bottom) */
            this._placedBlock = 0;
            /** The frame rate the content was published with (lib.properties.fps), set on the content's symbols */
            this.contentFps = null;
            this.mode = mode || INDEPENDENT;
            this.startPosition = startPosition || 0;
            this.loop = loop === true ? -1 : (loop || 0);
            this.timeline = timeline || new Timeline(0, []);
            this._boundResolve = function () { return this$1$1._resolveState(); };
        }

        if ( Container ) MovieClip.__proto__ = Container;
        MovieClip.prototype = Object.create( Container && Container.prototype );
        MovieClip.prototype.constructor = MovieClip;

        var prototypeAccessors$2 = { labels: { configurable: true },currentLabel: { configurable: true },totalFrames: { configurable: true },duration: { configurable: true } };
        prototypeAccessors$2.labels.get = function () { return this.timeline.getLabels(); };
        prototypeAccessors$2.currentLabel.get = function () { return this.timeline.currentLabel; };
        prototypeAccessors$2.totalFrames.get = function () { return this.timeline.duration; };
        prototypeAccessors$2.duration.get = function () { return this.timeline.duration; };
        MovieClip.prototype.isVisible = function isVisible () {
            return !!(this.visible && this.alpha > 0 && this.scaleX !== 0 && this.scaleY !== 0);
        };
        MovieClip.prototype.play = function play () { this.paused = false; };
        MovieClip.prototype.stop = function stop () { this.paused = true; };
        MovieClip.prototype.gotoAndPlay = function gotoAndPlay (positionOrLabel) {
            this.paused = false;
            this._goto(positionOrLabel);
        };
        MovieClip.prototype.gotoAndStop = function gotoAndStop (positionOrLabel) {
            this.paused = true;
            this._goto(positionOrLabel);
        };
        MovieClip.prototype.advance = function advance (time) {
            if (this.mode !== INDEPENDENT) {
                return;
            }
            var framerate = this.framerate;
            for (var o = this.parent; o && framerate === null; o = o.parent) {
                if (o instanceof MovieClip && o.mode === INDEPENDENT) {
                    framerate = o._framerate;
                }
            }
            this._framerate = framerate;
            if (!this.paused) {
                // As createjs: a missing time (undefined, not null) with a framerate gives NaN, i.e. no advance
                var frames = framerate !== null && framerate !== -1 && time !== null ? Number(time) / (1000 / framerate) + this._t : 1;
                var count = frames | 0;
                this._t = frames - count;
                while (count--) {
                    this._updateTimeline(this._rawPosition + 1, false);
                }
            }
        };
        /** createjs tick phase: advance the playhead, then the children (reverse), then tick listeners */
        MovieClip.prototype._tick = function _tick (event) {
            this.advance(event ? event.delta : undefined);
            Container.prototype._tick.call(this, event);
        };
        /** createjs resolve phase (MovieClip draw / Stage update) */
        MovieClip.prototype._updateState = function _updateState () {
            if (this._rawPosition === -1 || this.mode !== INDEPENDENT) {
                this._updateTimeline(-1, false);
            }
        };
        MovieClip.prototype._goto = function _goto (positionOrLabel) {
            var position = this.timeline.resolve(positionOrLabel);
            if (position != null) {
                this._t = 0;
                this._updateTimeline(position, true);
            }
        };
        MovieClip.prototype._reset = function _reset () {
            this._rawPosition = -1;
            this._t = this.currentFrame = 0;
            this.paused = false;
        };
        MovieClip.prototype._updateTimeline = function _updateTimeline (rawPosition, jump) {
            var synched = this.mode !== INDEPENDENT;
            var timeline = this.timeline;
            var position = rawPosition;
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
        };
        MovieClip.prototype._renderFirstFrame = function _renderFirstFrame () {
            var timeline = this.timeline;
            var raw = timeline.rawPosition;
            timeline.setPosition(0, true, true, this._boundResolve);
            timeline.rawPosition = raw;
        };
        /**
         * MovieClip._resolveState: places every tween target (and state entry) at
         * the bottom of the display list in turn, then removes the children placed
         * before and not now. The placements are skipped while they would leave the
         * display list as it is (_addManagedChild); otherwise everything is done as
         * createjs does it.
         */
        MovieClip.prototype._resolveState = function _resolveState () {
            var timeline = this.timeline;
            this.currentFrame = timeline.position;
            var current = ++this._resolveCount;
            var managed = this._managed;
            var children = this.children;
            // The children the timeline placed, from the bottom (a resolve leaves them there): a placement
            // can be skipped only for one of them (it was placed before, so it would not be reset). What
            // is above the block does not matter: createjs's placements put the placed ones below it
            var block = 0;
            while (block < children.length && managed[children[block].id] !== undefined) {
                block++;
            }
            this._placedBlock = block;
            this._expected = block - 1;
            var tweens = timeline.tweens;
            for (var i = 0; i < tweens.length; i++) {
                var tween = tweens[i];
                var target = tween.target;
                if (target !== this && !tween.passive) {
                    var offset = tween._stepPosition;
                    if (target instanceof DisplayObject) {
                        this._addManagedChild(target, offset);
                    }
                    else {
                        this._setState(Reflect.get(target, 'state'), tween.scope, offset);
                    }
                }
            }
            // Children of the block not placed now: put the placed ones in front of them as createjs has them
            this._followCreatejs();
            for (var i$1 = children.length - 1; i$1 >= 0; i$1--) {
                var id = children[i$1].id;
                var placed = managed[id];
                // Earlier than this resolve (a resolve nested in this one, from an event, counts as now)
                if (placed !== undefined && placed < current) {
                    this.removeChildAt(i$1);
                    delete managed[id];
                }
            }
        };
        /**
         * Stops skipping placements: the children placed so far (the top of the
         * block, from the expected index up) are moved to the bottom as createjs's
         * placements would have left them, with no events (moves within the same
         * parent are silent in createjs).
         */
        MovieClip.prototype._followCreatejs = function _followCreatejs () {
            var this$1$1 = this;

            var expected = this._expected;
            this._expected = null;
            if (expected === null || expected < 0) {
                return;
            }
            var children = this.children;
            var placed = children.splice(expected + 1, this._placedBlock - expected - 1);
            for (var i = placed.length - 1; i >= 0; i--) {
                children.unshift(placed[i]);
            }
            placed.forEach(function (child, index) {
                this$1$1.pixi.setChildIndex(child.pixi, index);
            });
        };
        MovieClip.prototype._setState = function _setState (state, scope, offset) {
            var this$1$1 = this;

            if (!Array.isArray(state)) {
                return;
            }
            var loop = function ( i ) {
                var entry = state[i];
                var target = scope.stateTarget(entry);
                if (!target) {
                    return;
                }
                var props = entry.props;
                if (props) {
                    Object.keys(props).forEach(function (key) {
                        Reflect.set(target, key, scope.value(props[key]));
                    });
                }
                this$1$1._addManagedChild(target, offset);
            };

            for (var i = state.length - 1; i >= 0; i--) loop( i );
        };
        MovieClip.prototype._addManagedChild = function _addManagedChild (child, offset) {
            if (child._off) {
                return;
            }
            var expected = this._expected;
            if (expected !== null) {
                // Moving it to the bottom would put it where it is: the next child of the block down, or
                // the child placed last (placed twice in this resolve: createjs has it at the bottom already).
                // Only what the placement records is done (it was placed before, so no reset)
                var next = expected >= 0 && this.children[expected] === child;
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
        };
        MovieClip.prototype.toString = function toString () {
            return '[MovieClip (name=' + this.name + ')]';
        };

        Object.defineProperties( MovieClip.prototype, prototypeAccessors$2 );

        return MovieClip;
    }(Container));
    MovieClip.INDEPENDENT = INDEPENDENT;
    MovieClip.SINGLE_FRAME = SINGLE_FRAME;
    MovieClip.SYNCHED = SYNCHED;

    /** Changes a geometry's reference count (Pixi 5 counts the Graphics showing it, and disposes of it at 0) */
    function addReference(geometry, delta) {
        var count = Reflect.get(geometry, 'refCount');
        Reflect.set(geometry, 'refCount', count + delta);
    }
    var PixiGraphics = /*@__PURE__*/(function (superclass) {
        function PixiGraphics() {
            superclass.apply(this, arguments);
            this.owner = null;
        }

        if ( superclass ) PixiGraphics.__proto__ = superclass;
        PixiGraphics.prototype = Object.create( superclass && superclass.prototype );
        PixiGraphics.prototype.constructor = PixiGraphics;
        /**
         * Shows another (shared) geometry. Pixi 5 can share a geometry between
         * Graphics (new Graphics(geometry), as clone() does) but has no way to
         * change it afterwards, and does not declare the field that holds it; it is
         * set by name here, and what Pixi derives from the geometry (the batches,
         * their vertices and tint) is marked stale so it is built again.
         */
        PixiGraphics.prototype.setGeometry = function setGeometry (geometry) {
            var current = this.geometry;
            if (current === geometry) {
                return;
            }
            // The reference count (undeclared as well) keeps a shared geometry alive while shown
            addReference(current, -1);
            addReference(geometry, 1);
            Reflect.set(this, '_geometry', geometry);
            Reflect.set(this, '_transformID', -1);
            this.batchDirty = -1;
            this.batchTint = -1;
        };
        /**
         * Pixi 5's Graphics keeps the blend mode in the batches it builds, and
         * builds them again only when the geometry changes: a blend mode set later
         * would not be drawn. The batches are marked stale so they are built again.
         */
        PixiGraphics.prototype.setBlendMode = function setBlendMode (mode) {
            if (this.blendMode !== mode) {
                this.blendMode = mode;
                this.batchDirty = -1;
            }
        };

        return PixiGraphics;
    }(PIXI__namespace.Graphics));
    var PixiSprite = /*@__PURE__*/(function (superclass) {
        function PixiSprite() {
            superclass.apply(this, arguments);
            this.owner = null;
        }

        if ( superclass ) PixiSprite.__proto__ = superclass;
        PixiSprite.prototype = Object.create( superclass && superclass.prototype );
        PixiSprite.prototype.constructor = PixiSprite;

        return PixiSprite;
    }(PIXI__namespace.Sprite));
    var PixiText = /*@__PURE__*/(function (superclass) {
        function PixiText() {
            superclass.apply(this, arguments);
            this.owner = null;
        }

        if ( superclass ) PixiText.__proto__ = superclass;
        PixiText.prototype = Object.create( superclass && superclass.prototype );
        PixiText.prototype.constructor = PixiText;

        return PixiText;
    }(PIXI__namespace.Text));
    var NAMED_COLORS = {
        black: 0x000000, white: 0xffffff, red: 0xff0000, green: 0x008000, blue: 0x0000ff,
        yellow: 0xffff00, cyan: 0x00ffff, magenta: 0xff00ff, gray: 0x808080, grey: 0x808080
    };
    /**
     * A CSS color as createjs writes it (#RGB, #RRGGBB, rgb(), rgba(), a few names).
     */
    function parseColor(value) {
        if (typeof value !== 'string') {
            return null;
        }
        var text = value.trim().toLowerCase();
        if (text.charAt(0) === '#') {
            var hex = text.slice(1);
            if (hex.length === 3) {
                hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
            }
            var color = parseInt(hex.slice(0, 6), 16);
            return isNaN(color) ? null : { color: color, alpha: 1 };
        }
        var match = /^rgba?\(([^)]*)\)$/.exec(text);
        if (match) {
            var parts = match[1].split(',').map(function (part) { return parseFloat(part); });
            var alpha = parts.length > 3 ? parts[3] : 1;
            return { color: ((parts[0] & 255) << 16) | ((parts[1] & 255) << 8) | (parts[2] & 255), alpha: alpha };
        }
        var named = NAMED_COLORS[text];
        return named === undefined ? null : { color: named, alpha: 1 };
    }
    function num(props, key) {
        var value = props[key];
        return typeof value === 'number' ? value : 0;
    }
    function isDataMap(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }
    var LINE_CAPS = [PIXI__namespace.LINE_CAP.BUTT, PIXI__namespace.LINE_CAP.ROUND, PIXI__namespace.LINE_CAP.SQUARE];
    var LINE_JOINS = [PIXI__namespace.LINE_JOIN.MITER, PIXI__namespace.LINE_JOIN.ROUND, PIXI__namespace.LINE_JOIN.BEVEL];
    function lineCap(value) {
        if (typeof value === 'number') {
            return LINE_CAPS[value] || PIXI__namespace.LINE_CAP.BUTT;
        }
        return value === 'round' ? PIXI__namespace.LINE_CAP.ROUND : value === 'square' ? PIXI__namespace.LINE_CAP.SQUARE : PIXI__namespace.LINE_CAP.BUTT;
    }
    function lineJoin(value) {
        if (typeof value === 'number') {
            return LINE_JOINS[value] || PIXI__namespace.LINE_JOIN.MITER;
        }
        return value === 'round' ? PIXI__namespace.LINE_JOIN.ROUND : value === 'bevel' ? PIXI__namespace.LINE_JOIN.BEVEL : PIXI__namespace.LINE_JOIN.MITER;
    }
    var PATH_COMMANDS = ['MoveTo', 'LineTo', 'QuadraticCurveTo', 'BezierCurveTo', 'ArcTo', 'Arc', 'ClosePath', 'Rect', 'RoundRect', 'Circle', 'Ellipse', 'PolyStar'];
    function paintOf(style, matrix, textures) {
        var solid = parseColor(style);
        if (solid) {
            return { color: solid.color, alpha: solid.alpha, texture: null, matrix: null };
        }
        if (!isDataMap(style)) {
            return null;
        }
        if (style.type === 'bitmap') {
            var image = style.image;
            var texture$1 = null;
            if (isDataMap(image)) {
                if (typeof image.image === 'string') {
                    texture$1 = textures.image(image.image);
                }
                else if (typeof image.sheet === 'string' && typeof image.frame === 'number') {
                    texture$1 = textures.frame(image.sheet, image.frame);
                }
            }
            var m = isDataMap(matrix) ? new PIXI__namespace.Matrix(num(matrix, 'a'), num(matrix, 'b'), num(matrix, 'c'), num(matrix, 'd'), num(matrix, 'tx'), num(matrix, 'ty')) : null;
            return texture$1 ? { color: 0xffffff, alpha: 1, texture: texture$1, matrix: m } : null;
        }
        var gradient = gradientOf(style);
        if (!gradient) {
            return null;
        }
        var texture = gradientTexture(gradient);
        // A gradient canvas paints nothing with (a line of length 0, a circle of radius 0): nothing is drawn
        return texture ? { color: 0xffffff, alpha: 1, texture: texture, matrix: texture.toShape } : { color: 0, alpha: 0, texture: null, matrix: null };
    }
    function gradientOf(style) {
        var type = style.type;
        var colors = style.colors;
        var ratios = style.ratios;
        if ((type !== 'linear' && type !== 'radial') || !Array.isArray(colors) || !Array.isArray(ratios)) {
            return null;
        }
        return {
            type: type,
            colors: colors.map(function (color) { return String(color); }),
            ratios: ratios.map(function (ratio) { return Number(ratio); }),
            x0: num(style, 'x0'), y0: num(style, 'y0'), r0: type === 'radial' ? num(style, 'r0') : 0,
            x1: num(style, 'x1'), y1: num(style, 'y1'), r1: type === 'radial' ? num(style, 'r1') : 0
        };
    }
    /** Pixels a gradient is drawn across: along the line of a linear one, across the circles of a radial one */
    var GRADIENT_SIZE = 256;
    /**
     * A gradient drawn into a canvas by the browser's own gradient (so its
     * colors are what canvas, and createjs, paints), as a texture that Pixi's
     * Graphics fills and strokes with through a matrix. `gradient` is the
     * gradient in the shape's coordinates, `local` the same gradient in the
     * texture's pixels, and `toShape` takes texture pixels to the shape's
     * coordinates. Outside the drawn area the texture's edge pixels repeat
     * (Pixi clamps), which is how canvas pads a gradient with its end colors.
     */
    var GradientTexture = /*@__PURE__*/(function (superclass) {
        function GradientTexture(canvas, gradient, local, toShape) {
            superclass.call(this, PIXI__namespace.BaseTexture.from(canvas));
            this.gradient = gradient;
            this.local = local;
            this.toShape = toShape;
        }

        if ( superclass ) GradientTexture.__proto__ = superclass;
        GradientTexture.prototype = Object.create( superclass && superclass.prototype );
        GradientTexture.prototype.constructor = GradientTexture;

        return GradientTexture;
    }(PIXI__namespace.Texture));
    /** Gradient textures by their gradient, shared by every drawing that uses the same gradient */
    var gradientTextures = new Map();
    function gradientTexture(gradient) {
        var key = JSON.stringify(gradient);
        var known = gradientTextures.get(key);
        if (known !== undefined) {
            return known;
        }
        var texture = gradient.type === 'linear' ? linearGradientTexture(gradient) : radialGradientTexture(gradient);
        gradientTextures.set(key, texture);
        return texture;
    }
    function paintGradient(canvas, local) {
        var context = canvas.getContext('2d');
        if (!context) {
            return;
        }
        var paint = local.type === 'linear'
            ? context.createLinearGradient(local.x0, local.y0, local.x1, local.y1)
            : context.createRadialGradient(local.x0, local.y0, local.r0, local.x1, local.y1, local.r1);
        local.colors.forEach(function (color, i) {
            paint.addColorStop(local.ratios[i], color);
        });
        context.fillStyle = paint;
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
    /**
     * A linear gradient drawn from the left edge to the right edge of a canvas
     * one pixel high. The texture's x axis runs along the gradient's line and its
     * y axis across it (every row is the same, so how far across does not matter).
     */
    function linearGradientTexture(gradient) {
        var dx = gradient.x1 - gradient.x0;
        var dy = gradient.y1 - gradient.y0;
        var length = Math.sqrt(dx * dx + dy * dy);
        if (!length) {
            return null;
        }
        var canvas = document.createElement('canvas');
        canvas.width = GRADIENT_SIZE;
        canvas.height = 1;
        var local = {
            type: 'linear', colors: gradient.colors, ratios: gradient.ratios,
            x0: 0, y0: 0, r0: 0, x1: GRADIENT_SIZE, y1: 0, r1: 0
        };
        paintGradient(canvas, local);
        var toShape = new PIXI__namespace.Matrix(dx / GRADIENT_SIZE, dy / GRADIENT_SIZE, -dy / length, dx / length, gradient.x0, gradient.y0);
        return new GradientTexture(canvas, gradient, local, toShape);
    }
    /**
     * A radial gradient drawn into a square canvas covering both of its circles,
     * scaled to fit (the mapping is a scale and a move, so the circles stay
     * circles and every point keeps its place in the gradient).
     */
    function radialGradientTexture(gradient) {
        var left = Math.min(gradient.x0 - gradient.r0, gradient.x1 - gradient.r1);
        var top = Math.min(gradient.y0 - gradient.r0, gradient.y1 - gradient.r1);
        var right = Math.max(gradient.x0 + gradient.r0, gradient.x1 + gradient.r1);
        var bottom = Math.max(gradient.y0 + gradient.r0, gradient.y1 + gradient.r1);
        var size = Math.max(right - left, bottom - top);
        if (!(size > 0) || gradient.r1 === gradient.r0 && gradient.x0 === gradient.x1 && gradient.y0 === gradient.y1) {
            return null;
        }
        var scale = GRADIENT_SIZE / size;
        var canvas = document.createElement('canvas');
        canvas.width = GRADIENT_SIZE;
        canvas.height = GRADIENT_SIZE;
        var local = {
            type: 'radial', colors: gradient.colors, ratios: gradient.ratios,
            x0: (gradient.x0 - left) * scale, y0: (gradient.y0 - top) * scale, r0: gradient.r0 * scale,
            x1: (gradient.x1 - left) * scale, y1: (gradient.y1 - top) * scale, r1: gradient.r1 * scale
        };
        paintGradient(canvas, local);
        var toShape = new PIXI__namespace.Matrix(1 / scale, 0, 0, 1 / scale, left, top);
        return new GradientTexture(canvas, gradient, local, toShape);
    }
    function drawPath(target, command) {
        var p = command.props;
        switch (command.type) {
            case 'MoveTo':
                target.moveTo(num(p, 'x'), num(p, 'y'));
                break;
            case 'LineTo':
                target.lineTo(num(p, 'x'), num(p, 'y'));
                break;
            case 'QuadraticCurveTo':
                target.quadraticCurveTo(num(p, 'cpx'), num(p, 'cpy'), num(p, 'x'), num(p, 'y'));
                break;
            case 'BezierCurveTo':
                target.bezierCurveTo(num(p, 'cp1x'), num(p, 'cp1y'), num(p, 'cp2x'), num(p, 'cp2y'), num(p, 'x'), num(p, 'y'));
                break;
            case 'ArcTo':
                target.arcTo(num(p, 'x1'), num(p, 'y1'), num(p, 'x2'), num(p, 'y2'), num(p, 'radius'));
                break;
            case 'Arc':
                target.arc(num(p, 'x'), num(p, 'y'), num(p, 'radius'), num(p, 'startAngle'), num(p, 'endAngle'), !!p.anticlockwise);
                break;
            case 'ClosePath':
                target.closePath();
                break;
            case 'Rect':
                target.drawRect(num(p, 'x'), num(p, 'y'), num(p, 'w'), num(p, 'h'));
                break;
            case 'RoundRect':
                target.drawRoundedRect(num(p, 'x'), num(p, 'y'), num(p, 'w'), num(p, 'h'), num(p, 'radiusTL'));
                break;
            case 'Circle':
                target.drawCircle(num(p, 'x'), num(p, 'y'), num(p, 'radius'));
                break;
            case 'Ellipse': {
                var w = num(p, 'w');
                var h = num(p, 'h');
                target.drawEllipse(num(p, 'x') + w / 2, num(p, 'y') + h / 2, w / 2, h / 2);
                break;
            }
            case 'PolyStar': {
                var sides = num(p, 'sides');
                var pointSize = num(p, 'pointSize');
                var radius = num(p, 'radius');
                var rotation = num(p, 'angle') / 180 * Math.PI;
                if (pointSize > 0 && pointSize < 1) {
                    target.drawStar(num(p, 'x'), num(p, 'y'), sides, radius, radius * (1 - pointSize), rotation);
                }
                else {
                    target.drawRegularPolygon(num(p, 'x'), num(p, 'y'), radius, sides, rotation);
                }
                break;
            }
        }
    }
    function pathSegments(commands) {
        var segments = [];
        var path = [];
        var fill = null;
        var stroke = null;
        var strokeStyle = null;
        var painted = false;
        var push = function () {
            if (path.length && (fill || stroke)) {
                segments.push({ path: path, fill: fill, stroke: stroke, strokeStyle: strokeStyle });
            }
        };
        commands.forEach(function (command) {
            if (command.type === 'BeginPath') {
                if (painted) {
                    push();
                    path = [];
                    fill = stroke = null;
                    painted = false;
                }
                return;
            }
            if (PATH_COMMANDS.indexOf(command.type) >= 0) {
                if (painted) {
                    // A path after paint without BeginPath continues the same path in canvas: what is painted so far is drawn, and the path goes on
                    push();
                    path = path.slice();
                    fill = stroke = null;
                    painted = false;
                }
                path.push(command);
                return;
            }
            if (command.type === 'Fill') {
                fill = command;
                painted = true;
            }
            else if (command.type === 'Stroke') {
                stroke = command;
                painted = true;
            }
            else if (command.type === 'StrokeStyle') {
                strokeStyle = command.props;
            }
        });
        push();
        return segments;
    }
    /** A Pixi Graphics that draws a geometry once (for working out holes, and for the shared geometries) */
    var GeometryBuilder = /*@__PURE__*/(function (superclass) {
        function GeometryBuilder () {
            superclass.apply(this, arguments);
        }

        if ( superclass ) GeometryBuilder.__proto__ = superclass;
        GeometryBuilder.prototype = Object.create( superclass && superclass.prototype );
        GeometryBuilder.prototype.constructor = GeometryBuilder;

        GeometryBuilder.prototype.finish = function finish () {
            this.finishPoly();
        };

        return GeometryBuilder;
    }(PIXI__namespace.Graphics));
    var emptyGraphics = null;
    /** The geometry of a shape with no drawing, shared (kept by a Graphics that is never destroyed) */
    function getEmptyGeometry() {
        if (!emptyGraphics) {
            emptyGraphics = new PIXI__namespace.Graphics();
        }
        return emptyGraphics.geometry;
    }
    /**
     * The subpaths of a filled path that cut holes: a subpath that starts inside
     * what the path's earlier subpaths cover (holes taken out) is a hole in it;
     * one that starts outside, or inside a hole, is a shape of its own. The
     * MoveTo commands that start holes are returned.
     */
    function findHoles(path) {
        var holes = [];
        var probe = new GeometryBuilder();
        probe.beginFill(0);
        var first = true;
        var inHole = false;
        path.forEach(function (command) {
            if (command.type === 'MoveTo') {
                if (!first) {
                    probe.finish();
                    var inside = probe.geometry.containsPoint(new PIXI__namespace.Point(num(command.props, 'x'), num(command.props, 'y')));
                    if (inside) {
                        holes.push(command);
                        if (!inHole) {
                            probe.beginHole();
                            inHole = true;
                        }
                    }
                    else if (inHole) {
                        probe.endHole();
                        inHole = false;
                    }
                }
                first = false;
            }
            drawPath(probe, command);
        });
        probe.destroy();
        return holes;
    }
    /** Replays a path, cutting the holes (Pixi attaches a hole to the shape drawn before it) */
    function drawPathWithHoles(target, path, holes) {
        var inHole = false;
        path.forEach(function (command) {
            if (holes && command.type === 'MoveTo') {
                var hole = holes.indexOf(command) >= 0;
                if (hole && !inHole) {
                    target.beginHole();
                    inHole = true;
                }
                else if (!hole && inHole) {
                    target.endHole();
                    inHole = false;
                }
            }
            drawPath(target, command);
        });
        if (inHole) {
            target.endHole();
        }
    }
    /**
     * Draws createjs drawing commands into a Pixi Graphics. Pixi takes the paint
     * first, so each path is replayed under the paint that follows it, with the
     * holes canvas's nonzero fill would cut (holes: the MoveTo commands that
     * start holes, see Graphics.holes).
     */
    function drawCommands(target, commands, textures, holes) {
        target.clear();
        pathSegments(commands).forEach(function (segment) {
            var fill = segment.fill ? paintOf(segment.fill.props.style, segment.fill.props.matrix, textures) : null;
            var stroke = segment.stroke ? paintOf(segment.stroke.props.style, null, textures) : null;
            var strokeStyle = segment.strokeStyle;
            if (!fill && !stroke) {
                return;
            }
            if (stroke && strokeStyle) {
                target.lineTextureStyle({
                    width: num(strokeStyle, 'width'),
                    color: stroke.color,
                    alpha: stroke.alpha,
                    texture: stroke.texture || PIXI__namespace.Texture.WHITE,
                    matrix: stroke.matrix || undefined,
                    cap: lineCap(strokeStyle.caps),
                    join: lineJoin(strokeStyle.joints),
                    miterLimit: typeof strokeStyle.miterLimit === 'number' ? strokeStyle.miterLimit : 10
                });
            }
            else {
                target.lineStyle(0);
            }
            if (fill) {
                target.beginTextureFill({ texture: fill.texture || PIXI__namespace.Texture.WHITE, color: fill.color, alpha: fill.alpha, matrix: fill.matrix || undefined });
            }
            drawPathWithHoles(target, segment.path, fill ? holes || null : null);
            if (fill) {
                target.endFill();
            }
        });
    }
    /**
     * A drawing command as createjs keeps it (Graphics.MoveTo, Graphics.Fill, ...):
     * the command's own properties, with fill and stroke styles as objects whose
     * `props` are the arguments they were made with.
     */
    var GraphicsCommand = function GraphicsCommand () {};
    /** The createjs drawing command class names */
    var GRAPHICS_COMMANDS = [
        'MoveTo', 'LineTo', 'ArcTo', 'Arc', 'QuadraticCurveTo', 'BezierCurveTo', 'Rect', 'ClosePath', 'BeginPath',
        'Fill', 'Stroke', 'StrokeStyle', 'StrokeDash', 'RoundRect', 'Circle', 'Ellipse', 'PolyStar'
    ];
    var COMMAND_CLASSES = {};
    GRAPHICS_COMMANDS.forEach(function (type) {
        COMMAND_CLASSES[type] = /*@__PURE__*/(function (GraphicsCommand) {
            function type () {
                GraphicsCommand.apply(this, arguments);
            }if ( GraphicsCommand ) type.__proto__ = GraphicsCommand;
            type.prototype = Object.create( GraphicsCommand && GraphicsCommand.prototype );
            type.prototype.constructor = type;

            

            return type;
        }(GraphicsCommand));
    });
    var MATRIX_KEYS = ['a', 'b', 'c', 'd', 'tx', 'ty'];
    function toCommandValue(value, assets) {
        if (Array.isArray(value)) {
            return value.map(function (v) { return toCommandValue(v, assets); });
        }
        if (!isDataMap(value)) {
            return value;
        }
        var keys = Object.keys(value);
        if (keys.length === 1 && typeof value.image === 'string') {
            return assets.imageAsset(value.image);
        }
        if (keys.length === 2 && typeof value.sheet === 'string' && typeof value.frame === 'number') {
            return assets.frameAsset(value.sheet, value.frame);
        }
        var map = {};
        if (keys.length === 6 && MATRIX_KEYS.every(function (key) { return typeof value[key] === 'number'; })) {
            MATRIX_KEYS.forEach(function (key) { map[key] = value[key]; });
            return map;
        }
        keys.forEach(function (key) { map[key] = toCommandValue(value[key], assets); });
        return map;
    }
    /**
     * Draws the path of createjs drawing commands filled, ignoring their fills
     * and strokes: the shape a createjs mask clips with (all the drawing as one
     * path, with the holes named by holes, see Graphics.maskHoles).
     */
    function drawMaskPath(target, commands, holes) {
        target.clear();
        var path = commands.filter(function (command) { return PATH_COMMANDS.indexOf(command.type) >= 0; });
        if (!path.length) {
            return;
        }
        target.beginFill(0xffffff, 1);
        drawPathWithHoles(target, path, holes || null);
        target.endFill();
    }
    /**
     * createjs-compatible Graphics holding the drawing commands of a definition.
     */
    var Graphics = function Graphics(commands, textures) {
        this._instructions = null;
        this._holes = null;
        this._maskHoles = null;
        this._geometry = null;
        this._maskGeometry = null;
        this.commands = commands;
        this.textures = textures;
    };

    var prototypeAccessors = { instructions: { configurable: true } };
    /** The commands as createjs's command objects (made when first read) */
    prototypeAccessors.instructions.get = function () {
        if (!this._instructions) {
            var assets = this.textures;
            this._instructions = this.commands.map(function (command) {
                var CommandClass = COMMAND_CLASSES[command.type] || GraphicsCommand;
                var instruction = new CommandClass();
                Object.keys(command.props).forEach(function (key) {
                    var value = toCommandValue(command.props[key], assets);
                    // A gradient or bitmap style object carries its arguments as props
                    Reflect.set(instruction, key, key === 'style' && value !== null && typeof value === 'object' ? { props: value } : value);
                });
                return instruction;
            });
        }
        return this._instructions;
    };
    Graphics.prototype.isEmpty = function isEmpty () {
        return !this.commands.length;
    };
    /**
     * The MoveTo commands that start holes in the filled paths (worked out once
     * per drawing and shared by every shape that shows it)
     */
    Graphics.prototype.holes = function holes () {
        if (!this._holes) {
            var holes = [];
            pathSegments(this.commands).forEach(function (segment) {
                if (segment.fill) {
                    findHoles(segment.path).forEach(function (command) { return holes.push(command); });
                }
            });
            this._holes = holes;
        }
        return this._holes;
    };
    /**
     * The drawing as a Pixi geometry, drawn the first time it is asked for and
     * shared from then on by every shape that shows this drawing (a shape's
     * Pixi node must therefore not be drawn into: that would change it for all)
     */
    Graphics.prototype.geometry = function geometry () {
        if (!this._geometry) {
            var builder = new GeometryBuilder();
            drawCommands(builder, this.commands, this.textures, this.holes());
            builder.finish();
            this._geometry = builder;
        }
        return this._geometry.geometry;
    };
    /** The drawing as a mask (its path filled), shared the same way */
    Graphics.prototype.maskGeometry = function maskGeometry () {
        if (!this._maskGeometry) {
            var builder = new GeometryBuilder();
            drawMaskPath(builder, this.commands, this.maskHoles());
            builder.finish();
            this._maskGeometry = builder;
        }
        return this._maskGeometry.geometry;
    };
    /** The holes of the drawing as a mask (all of it one path) */
    Graphics.prototype.maskHoles = function maskHoles () {
        if (!this._maskHoles) {
            this._maskHoles = findHoles(this.commands.filter(function (command) { return PATH_COMMANDS.indexOf(command.type) >= 0; }));
        }
        return this._maskHoles;
    };

    Object.defineProperties( Graphics.prototype, prototypeAccessors );
    GRAPHICS_COMMANDS.forEach(function (type) {
        Object.defineProperty(Graphics, type, { value: COMMAND_CLASSES[type], enumerable: true });
    });
    /**
     * createjs-compatible Shape on a Pixi Graphics.
     */
    var Shape = /*@__PURE__*/(function (DisplayObject) {
        function Shape(graphics) {
            var node = new PixiGraphics(graphics ? graphics.geometry() : getEmptyGeometry());
            DisplayObject.call(this, node);
            this._graphics = null;
            /** The shape as a mask (made when first used as one), a child of this shape's node */
            this._maskGraphics = null;
            this.pixiGraphics = node;
            this._graphics = graphics || null;
        }

        if ( DisplayObject ) Shape.__proto__ = DisplayObject;
        Shape.prototype = Object.create( DisplayObject && DisplayObject.prototype );
        Shape.prototype.constructor = Shape;

        var prototypeAccessors$1 = { graphics: { configurable: true } };
        prototypeAccessors$1.graphics.get = function () {
            return this._graphics;
        };
        prototypeAccessors$1.graphics.set = function (value) {
            if (value === this._graphics) {
                return;
            }
            this._graphics = value;
            this.pixiGraphics.setGeometry(value ? value.geometry() : getEmptyGeometry());
            if (this._maskGraphics) {
                this._maskGraphics.setGeometry(value ? value.maskGeometry() : getEmptyGeometry());
            }
            this._maskTargets.forEach(function (target) { return target._updatePixiMask(); });
        };
        Shape.prototype._clipsAsMask = function _clipsAsMask () {
            return !!(this._graphics && !this._graphics.isEmpty());
        };
        Shape.prototype._setBlendMode = function _setBlendMode (mode) {
            this.pixiGraphics.setBlendMode(mode);
        };
        /**
         * createjs clips with the shape's path alone (Graphics.drawAsPath, then
         * clip), whatever its fill and stroke; published masks are paths with no
         * fill. The mask node is that path, filled. It is a child of the shape's
         * node, so it moves with the shape (the shape's own node is not drawn while
         * it serves as a mask).
         */
        Shape.prototype._pixiMaskNode = function _pixiMaskNode () {
            var node = this._maskGraphics;
            if (!node) {
                node = this._maskGraphics = new PixiGraphics(this._graphics ? this._graphics.maskGeometry() : getEmptyGeometry());
                // Never hit by the pointer, as createjs never hits a mask
                node.hitArea = NO_HIT_AREA;
                this.pixiGraphics.addChild(node);
            }
            return node;
        };
        Shape.prototype._releaseMaskNode = function _releaseMaskNode () {
            var node = this._maskGraphics;
            if (node && !node.isMask) {
                node.renderable = false;
            }
        };
        Shape.prototype.toString = function toString () {
            return '[Shape (name=' + this.name + ')]';
        };

        Object.defineProperties( Shape.prototype, prototypeAccessors$1 );

        return Shape;
    }(DisplayObject));
    /**
     * createjs-compatible SpriteSheet: frames cut from an atlas image.
     */
    var SpriteSheet = function SpriteSheet(image, rects) {
        this.framerate = 0;
        this.complete = true;
        this.frames = rects.map(function (rect) { return ({ image: image, rect: new Rectangle(rect[0], rect[1], rect[2], rect[3]) }); });
        this.textures = this.frames.map(function (frame) { return new PIXI__namespace.Texture(image.texture.baseTexture, frame.rect.toPixi()); });
    };
    SpriteSheet.prototype.getFrame = function getFrame (index) {
        return this.frames[index] || null;
    };
    SpriteSheet.prototype.getNumFrames = function getNumFrames () {
        return this.frames.length;
    };
    /**
     * createjs-compatible Sprite (frame by frame from a sprite sheet).
     */
    var Sprite = /*@__PURE__*/(function (DisplayObject) {
        function Sprite(spriteSheet, frame) {
            var node = new PixiSprite(PIXI__namespace.Texture.EMPTY);
            DisplayObject.call(this, node);
            this.currentFrame = 0;
            this.paused = false;
            this.framerate = 0;
            this.pixiSprite = node;
            this.spriteSheet = spriteSheet;
            if (frame != null) {
                this.gotoAndPlay(frame);
            }
        }

        if ( DisplayObject ) Sprite.__proto__ = DisplayObject;
        Sprite.prototype = Object.create( DisplayObject && DisplayObject.prototype );
        Sprite.prototype.constructor = Sprite;
        Sprite.prototype.play = function play () { this.paused = false; };
        Sprite.prototype.stop = function stop () { this.paused = true; };
        Sprite.prototype.gotoAndPlay = function gotoAndPlay (frame) {
            this.paused = false;
            this._goto(frame);
        };
        Sprite.prototype.gotoAndStop = function gotoAndStop (frame) {
            this.paused = true;
            this._goto(frame);
        };
        Sprite.prototype.advance = function advance () {
            var count = this.spriteSheet.getNumFrames();
            this._goto(count ? (this.currentFrame + 1) % count : 0);
        };
        Sprite.prototype._goto = function _goto (frame) {
            this.currentFrame = frame;
            var texture = this.spriteSheet.textures[frame];
            this.pixiSprite.texture = texture || PIXI__namespace.Texture.EMPTY;
        };
        Sprite.prototype._tick = function _tick (event) {
            if (!this.paused) {
                this.advance();
            }
            DisplayObject.prototype._tick.call(this, event);
        };
        Sprite.prototype._setBlendMode = function _setBlendMode (mode) {
            this.pixiSprite.blendMode = mode;
        };
        Sprite.prototype.toString = function toString () {
            return '[Sprite (name=' + this.name + ')]';
        };

        return Sprite;
    }(DisplayObject));
    /**
     * createjs-compatible Bitmap.
     */
    var Bitmap = /*@__PURE__*/(function (DisplayObject) {
        function Bitmap(image) {
            var node = new PixiSprite(PIXI__namespace.Texture.EMPTY);
            DisplayObject.call(this, node);
            this._image = null;
            this._sourceRect = null;
            this.pixiSprite = node;
            this.image = image || null;
        }

        if ( DisplayObject ) Bitmap.__proto__ = DisplayObject;
        Bitmap.prototype = Object.create( DisplayObject && DisplayObject.prototype );
        Bitmap.prototype.constructor = Bitmap;

        var prototypeAccessors$2 = { image: { configurable: true },sourceRect: { configurable: true } };
        prototypeAccessors$2.image.get = function () { return this._image; };
        prototypeAccessors$2.image.set = function (value) {
            this._image = value;
            this._updateTexture();
        };
        prototypeAccessors$2.sourceRect.get = function () { return this._sourceRect; };
        prototypeAccessors$2.sourceRect.set = function (value) {
            this._sourceRect = value;
            this._updateTexture();
        };
        Bitmap.prototype._updateTexture = function _updateTexture () {
            var image = this._image;
            if (!image) {
                this.pixiSprite.texture = PIXI__namespace.Texture.EMPTY;
                return;
            }
            var rect = this._sourceRect;
            this.pixiSprite.texture = rect ? new PIXI__namespace.Texture(image.texture.baseTexture, rect.toPixi()) : image.texture;
        };
        Bitmap.prototype._setBlendMode = function _setBlendMode (mode) {
            this.pixiSprite.blendMode = mode;
        };
        Bitmap.prototype.toString = function toString () {
            return '[Bitmap (name=' + this.name + ')]';
        };

        Object.defineProperties( Bitmap.prototype, prototypeAccessors$2 );

        return Bitmap;
    }(DisplayObject));
    /**
     * The parts of a CSS font shorthand ("bold 20px 'Nirmala UI'").
     */
    function parseFont(font) {
        var match = /^\s*(.*?)\s*(\d+(?:\.\d+)?)px(?:\/\S+)?\s+(.+)$/.exec(font);
        if (!match) {
            return { fontStyle: 'normal', fontWeight: 'normal', fontSize: 10, fontFamily: 'sans-serif' };
        }
        var words = match[1].split(/\s+/);
        var fontStyle = 'normal';
        var fontWeight = 'normal';
        words.forEach(function (word) {
            if (word === 'italic' || word === 'oblique') {
                fontStyle = word;
            }
            else if (word === 'bold' || word === 'bolder' || word === 'lighter' || /^\d{3}$/.test(word)) {
                fontWeight = word;
            }
        });
        return { fontStyle: fontStyle, fontWeight: fontWeight, fontSize: parseFloat(match[2]), fontFamily: match[3].replace(/['"]/g, '') };
    }
    var TEXT_ANCHOR_X = { left: 0, start: 0, center: 0.5, right: 1, end: 1 };
    var TEXT_ANCHOR_Y = { top: 0, hanging: 0, middle: 0.5, alphabetic: 0.8, ideographic: 0.9, bottom: 1 };
    /**
     * createjs-compatible Text on a Pixi Text.
     */
    var Text = /*@__PURE__*/(function (DisplayObject) {
        function Text(text, font, color) {
            var node = new PixiText('');
            DisplayObject.call(this, node);
            this._text = '';
            this._font = '10px sans-serif';
            this._color = '#000';
            this._textAlign = 'left';
            this._textBaseline = 'top';
            this._lineHeight = 0;
            this._lineWidth = null;
            this._maxWidth = null;
            this._outline = 0;
            this.pixiText = node;
            this._text = text == null ? '' : String(text);
            if (font) {
                this._font = font;
            }
            if (color) {
                this._color = color;
            }
            this._updateText();
        }

        if ( DisplayObject ) Text.__proto__ = DisplayObject;
        Text.prototype = Object.create( DisplayObject && DisplayObject.prototype );
        Text.prototype.constructor = Text;

        var prototypeAccessors$3 = { text: { configurable: true },font: { configurable: true },color: { configurable: true },textAlign: { configurable: true },textBaseline: { configurable: true },lineHeight: { configurable: true },lineWidth: { configurable: true },maxWidth: { configurable: true },outline: { configurable: true } };
        prototypeAccessors$3.text.get = function () { return this._text; };
        prototypeAccessors$3.text.set = function (value) { this._text = value; this._updateText(); };
        prototypeAccessors$3.font.get = function () { return this._font; };
        prototypeAccessors$3.font.set = function (value) { this._font = value; this._updateText(); };
        prototypeAccessors$3.color.get = function () { return this._color; };
        prototypeAccessors$3.color.set = function (value) { this._color = value; this._updateText(); };
        prototypeAccessors$3.textAlign.get = function () { return this._textAlign; };
        prototypeAccessors$3.textAlign.set = function (value) { this._textAlign = value; this._updateText(); };
        prototypeAccessors$3.textBaseline.get = function () { return this._textBaseline; };
        prototypeAccessors$3.textBaseline.set = function (value) { this._textBaseline = value; this._updateText(); };
        prototypeAccessors$3.lineHeight.get = function () { return this._lineHeight; };
        prototypeAccessors$3.lineHeight.set = function (value) { this._lineHeight = value; this._updateText(); };
        prototypeAccessors$3.lineWidth.get = function () { return this._lineWidth; };
        prototypeAccessors$3.lineWidth.set = function (value) { this._lineWidth = value; this._updateText(); };
        prototypeAccessors$3.maxWidth.get = function () { return this._maxWidth; };
        prototypeAccessors$3.maxWidth.set = function (value) { this._maxWidth = value; this._updateText(); };
        prototypeAccessors$3.outline.get = function () { return this._outline; };
        prototypeAccessors$3.outline.set = function (value) { this._outline = value; this._updateText(); };
        Text.prototype._updateText = function _updateText () {
            var node = this.pixiText;
            var font = parseFont(this._font);
            var color = parseColor(this._color);
            node.text = this._text;
            node.style = new PIXI__namespace.TextStyle({
                fontStyle: font.fontStyle,
                fontWeight: font.fontWeight,
                fontSize: font.fontSize,
                fontFamily: font.fontFamily,
                fill: this._outline ? 'rgba(0,0,0,0)' : (color ? color.color : 0),
                stroke: color ? color.color : 0,
                strokeThickness: this._outline || 0,
                align: this._textAlign === 'center' ? 'center' : (this._textAlign === 'right' || this._textAlign === 'end') ? 'right' : 'left',
                lineHeight: this._lineHeight || undefined,
                wordWrap: !!this._lineWidth,
                wordWrapWidth: this._lineWidth || 100
            });
            var anchorX = TEXT_ANCHOR_X[this._textAlign];
            var anchorY = TEXT_ANCHOR_Y[this._textBaseline];
            node.anchor.set(anchorX === undefined ? 0 : anchorX, anchorY === undefined ? 0 : anchorY);
        };
        Text.prototype._setBlendMode = function _setBlendMode (mode) {
            this.pixiText.blendMode = mode;
        };
        Text.prototype.toString = function toString () {
            return '[Text (text=' + this._text + ')]';
        };

        Object.defineProperties( Text.prototype, prototypeAccessors$3 );

        return Text;
    }(DisplayObject));
    /**
     * createjs-compatible ColorFilter on a Pixi ColorMatrixFilter.
     */
    var ColorFilter = function ColorFilter(redMultiplier, greenMultiplier, blueMultiplier, alphaMultiplier, redOffset, greenOffset, blueOffset, alphaOffset) {
        this.pixiFilter = new PIXI__namespace.filters.ColorMatrixFilter();
        this._values = [
            redMultiplier == null ? 1 : redMultiplier,
            greenMultiplier == null ? 1 : greenMultiplier,
            blueMultiplier == null ? 1 : blueMultiplier,
            alphaMultiplier == null ? 1 : alphaMultiplier,
            redOffset || 0, greenOffset || 0, blueOffset || 0, alphaOffset || 0
        ];
        this._updateMatrix();
    };

    var prototypeAccessors$4 = { redMultiplier: { configurable: true },greenMultiplier: { configurable: true },blueMultiplier: { configurable: true },alphaMultiplier: { configurable: true },redOffset: { configurable: true },greenOffset: { configurable: true },blueOffset: { configurable: true },alphaOffset: { configurable: true } };
    prototypeAccessors$4.redMultiplier.get = function () { return this._values[0]; };
    prototypeAccessors$4.redMultiplier.set = function (value) { this._set(0, value); };
    prototypeAccessors$4.greenMultiplier.get = function () { return this._values[1]; };
    prototypeAccessors$4.greenMultiplier.set = function (value) { this._set(1, value); };
    prototypeAccessors$4.blueMultiplier.get = function () { return this._values[2]; };
    prototypeAccessors$4.blueMultiplier.set = function (value) { this._set(2, value); };
    prototypeAccessors$4.alphaMultiplier.get = function () { return this._values[3]; };
    prototypeAccessors$4.alphaMultiplier.set = function (value) { this._set(3, value); };
    prototypeAccessors$4.redOffset.get = function () { return this._values[4]; };
    prototypeAccessors$4.redOffset.set = function (value) { this._set(4, value); };
    prototypeAccessors$4.greenOffset.get = function () { return this._values[5]; };
    prototypeAccessors$4.greenOffset.set = function (value) { this._set(5, value); };
    prototypeAccessors$4.blueOffset.get = function () { return this._values[6]; };
    prototypeAccessors$4.blueOffset.set = function (value) { this._set(6, value); };
    prototypeAccessors$4.alphaOffset.get = function () { return this._values[7]; };
    prototypeAccessors$4.alphaOffset.set = function (value) { this._set(7, value); };
    ColorFilter.prototype._set = function _set (index, value) {
        this._values[index] = value;
        this._updateMatrix();
    };
    ColorFilter.prototype._updateMatrix = function _updateMatrix () {
        var v = this._values;
        var m = this.pixiFilter.matrix;
        for (var i = 0; i < 20; i++) {
            m[i] = 0;
        }
        m[0] = v[0];
        m[6] = v[1];
        m[12] = v[2];
        m[18] = v[3];
        m[4] = v[4] / 255;
        m[9] = v[5] / 255;
        m[14] = v[6] / 255;
        m[19] = v[7] / 255;
    };
    ColorFilter.prototype.toString = function toString () {
        return '[ColorFilter]';
    };

    Object.defineProperties( ColorFilter.prototype, prototypeAccessors$4 );
    /**
     * createjs-compatible ButtonHelper: sends its target to the out / over /
     * down frames on mouse events, and stops it on the out frame from the start.
     */
    var ButtonHelper = function ButtonHelper(target, outLabel, overLabel, downLabel, play, hitArea, hitLabel) {
        this._isPressed = false;
        this._isOver = false;
        this._enabled = false;
        this._originalReset = null;
        this.target = target;
        this.overLabel = overLabel == null ? 'over' : overLabel;
        this.outLabel = outLabel == null ? 'out' : outLabel;
        this.downLabel = downLabel == null ? 'down' : downLabel;
        this.play = !!play;
        target.mouseChildren = false;
        this.enabled = true;
        this.handleEvent(new Event(''));
        if (hitArea) {
            // As createjs: only a truthy label sends the hit area there (frame 0 leaves it as it is)
            if (hitLabel) {
                hitArea.actionsEnabled = false;
                hitArea.gotoAndStop(hitLabel);
            }
            target.hitArea = hitArea;
        }
    };

    var prototypeAccessors$5 = { enabled: { configurable: true } };
    prototypeAccessors$5.enabled.get = function () { return this._enabled; };
    prototypeAccessors$5.enabled.set = function (value) {
        if (value === this._enabled) {
            return;
        }
        var target = this.target;
        this._enabled = value;
        if (value) {
            target.cursor = 'pointer';
            target.addEventListener('rollover', this);
            target.addEventListener('rollout', this);
            target.addEventListener('mousedown', this);
            target.addEventListener('pressup', this);
            // The target keeps its paused state when its timeline resets it on re-entry
            var reset = target._reset;
            this._originalReset = reset;
            target._reset = function () {
                var paused = target.paused;
                reset.call(target);
                target.paused = paused;
            };
        }
        else {
            target.cursor = null;
            target.removeEventListener('rollover', this);
            target.removeEventListener('rollout', this);
            target.removeEventListener('mousedown', this);
            target.removeEventListener('pressup', this);
            var original = this._originalReset;
            if (original) {
                target._reset = original;
                this._originalReset = null;
            }
        }
    };
    ButtonHelper.prototype.handleEvent = function handleEvent (event) {
        var type = event.type;
        var label;
        if (type === 'mousedown') {
            this._isPressed = true;
            label = this.downLabel;
        }
        else if (type === 'pressup') {
            this._isPressed = false;
            label = this._isOver ? this.overLabel : this.outLabel;
        }
        else if (type === 'rollover') {
            this._isOver = true;
            label = this._isPressed ? this.downLabel : this.overLabel;
        }
        else {
            this._isOver = false;
            label = this._isPressed ? this.overLabel : this.outLabel;
        }
        if (this.play) {
            this.target.gotoAndPlay(label);
        }
        else {
            this.target.gotoAndStop(label);
        }
    };
    ButtonHelper.prototype.toString = function toString () {
        return '[ButtonHelper]';
    };

    Object.defineProperties( ButtonHelper.prototype, prototypeAccessors$5 );

    /**
     * Semantic version numbers and ranges, as far as the version checks of
     * definitions and runtime content need them: versions are MAJOR.MINOR.PATCH,
     * and ranges are written as npm writes them (`1.2.3`, `1.x`, `^1.2.0`,
     * `~1.2.0`, `>=1.0.0 <2.0.0`, `0.x || 1.x`). Pre-release tags are not handled.
     */
    /** A version as its three numbers, or null when it is not MAJOR.MINOR.PATCH */
    function parseVersion(text) {
        var match = /^\s*v?(\d+)\.(\d+)\.(\d+)\s*$/.exec(text);
        return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
    }
    function compareParsed(a, b) {
        for (var i = 0; i < 3; i++) {
            if (a[i] !== b[i]) {
                return a[i] < b[i] ? -1 : 1;
            }
        }
        return 0;
    }
    /** -1, 0 or 1 as a is lower than, the same as or higher than b (both have to be versions) */
    function compareVersions(a, b) {
        var pa = parseVersion(a);
        var pb = parseVersion(b);
        if (!pa || !pb) {
            throw new Error('not a version: ' + (pa ? b : a));
        }
        return compareParsed(pa, pb);
    }
    /** A partial version (1, 1.2, 1.x, *): the numbers given, the rest left open */
    function parsePartial(text) {
        if (text === '*' || text === 'x' || text === 'X') {
            return [];
        }
        var parts = text.split('.');
        if (parts.length > 3) {
            return null;
        }
        var numbers = [];
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (part === 'x' || part === 'X' || part === '*') {
                break;
            }
            if (!/^\d+$/.test(part)) {
                return null;
            }
            numbers.push(Number(part));
        }
        return numbers;
    }
    function lowest(numbers) {
        return [numbers[0] || 0, numbers[1] || 0, numbers[2] || 0];
    }
    /** The first version above every version the given numbers start (1.2 -> 1.3.0); null for none (*) */
    function above(numbers) {
        if (numbers.length === 0) {
            return null;
        }
        if (numbers.length === 1) {
            return [numbers[0] + 1, 0, 0];
        }
        if (numbers.length === 2) {
            return [numbers[0], numbers[1] + 1, 0];
        }
        return [numbers[0], numbers[1], numbers[2] + 1];
    }
    /** The tests one word of a range stands for, or null when the word is not understood */
    function parseComparator(word) {
        var match = /^(\^|~|>=|<=|>|<|=)?(.+)$/.exec(word);
        if (!match) {
            return null;
        }
        var op = match[1] || '=';
        var numbers = parsePartial(match[2]);
        if (!numbers) {
            return null;
        }
        var low = lowest(numbers);
        var result = [];
        var atLeast = function (bound) {
            result.push({ op: '>=', bound: bound });
        };
        var below = function (bound) {
            if (bound) {
                result.push({ op: '<', bound: bound });
            }
        };
        if (op === '=') {
            atLeast(low);
            below(above(numbers));
        }
        else if (op === '^') {
            // The left-most non-zero number given stays the same (^1.2.3 <2.0.0, ^0.2.3 <0.3.0, ^0.0.3 <0.0.4)
            var fixed = 0;
            while (fixed < numbers.length - 1 && numbers[fixed] === 0) {
                fixed++;
            }
            atLeast(low);
            below(above(numbers.slice(0, fixed + 1)));
        }
        else if (op === '~') {
            atLeast(low);
            below(above(numbers.slice(0, numbers.length > 1 ? 2 : 1)));
        }
        else if (op === '>=') {
            atLeast(low);
        }
        else if (op === '>') {
            var next = above(numbers);
            if (!next) {
                return null;
            }
            atLeast(next);
        }
        else if (op === '<') {
            below(low);
        }
        else {
            // <=
            below(above(numbers));
        }
        return result;
    }
    /** Whether a version is in a range (npm's notation, see above); a range not understood throws */
    function satisfies(version, range) {
        var parsed = parseVersion(version);
        if (!parsed) {
            return false;
        }
        return range.split('||').some(function (set) {
            var words = set.trim().split(/\s+/).filter(function (word) { return word !== ''; });
            if (!words.length) {
                throw new Error('not a version range: ' + range);
            }
            return words.every(function (word) {
                var comparators = parseComparator(word);
                if (!comparators) {
                    throw new Error('not a version range: ' + range);
                }
                return comparators.every(function (c) {
                    var order = compareParsed(parsed, c.bound);
                    return c.op === '>=' ? order >= 0 : order < 0;
                });
            });
        });
    }
    function checkVersion(version, range, known) {
        var parsed = parseVersion(version);
        if (!parsed) {
            return { error: 'no version (' + JSON.stringify(version) + ')', warning: null, newer: false };
        }
        var newer = compareVersions(version, known) > 0;
        if (!satisfies(version, range)) {
            return { error: version + ' is outside ' + range, warning: null, newer: newer };
        }
        return { error: null, warning: newer ? version + ' is newer than ' + known : null, newer: newer };
    }

    /** The version of this package (written in from package.json when the package is built) */
    var VERSION = "0.0.0";

    /**
     * The data of runtime content (what the generator writes and the player reads): the definition
     * extracted by @tawaship/animate-data-converter, with every frame script
     * taken out of the data and referenced by its index in the runtime content's
     * script list (the scripts themselves are code in the runtime content), and with
     * the writes of each tween and of each instance's initial values compiled
     * into writer functions (code in the runtime content as well, referenced by index).
     * Drawings are gathered into one table for the whole content, identical
     * ones merged, and a symbol refers to them by index.
     */
    /**
     * The pixi-animate-runtime versions whose runtime content this player plays
     * (npm's range notation). Raised when the player stops playing runtime
     * content older versions made.
     */
    var RUNTIME_CONTENT_RANGE = '0.x';

    /**
     * Whether this player plays runtime content: an error when the version of
     * pixi-animate-runtime that generated it is outside the range the player
     * plays, a warning when it is newer than the player (it may hold what the
     * player does not know and leaves out).
     */
    function checkRuntimeContent(data) {
        var made = typeof data.runtimeVersion === 'string' ? data.runtimeVersion : '';
        var check = checkVersion(made, RUNTIME_CONTENT_RANGE, VERSION);
        var by = 'This runtime content was generated by pixi-animate-runtime ' + (made || '(no version)');
        if (check.error) {
            throw new Error(by + ', which this player (' + VERSION + ') does not play (it plays runtime content generated by ' + RUNTIME_CONTENT_RANGE + '). '
                + (check.newer ? 'Update the player.' : 'Generate the runtime content again with pixi-animate-runtime ' + VERSION + '.'));
        }
        if (check.warning) {
            console.warn(by + ', newer than this player (' + VERSION + '). What the newer version added may not play; update the player.');
        }
    }
    /**
     * The createjs-compatible names frame scripts reach as `cjs` / `createjs`.
     */
    var namespace = {
        DisplayObject: DisplayObject, Container: Container, MovieClip: MovieClip, Shape: Shape, Graphics: Graphics, Sprite: Sprite, SpriteSheet: SpriteSheet, Bitmap: Bitmap, Text: Text,
        ColorFilter: ColorFilter, ButtonHelper: ButtonHelper, Event: Event, EventDispatcher: EventDispatcher, Rectangle: Rectangle, Point: PIXI__namespace.Point
    };
    function playSound() {
        return {
            paused: false, volume: 1,
            addEventListener: function addEventListener() { }, removeEventListener: function removeEventListener() { },
            on: function on() { }, stop: function stop() { }, play: function play() { }
        };
    }
    function isMovieClipClass(content, id, value) {
        var def = content.data.symbols[id];
        return !!def && def.kind === 'movieclip';
    }
    function isSpriteClass(content, id, value) {
        var def = content.data.symbols[id];
        return !!def && def.kind === 'sprite';
    }
    function isBitmapClass(content, id, value) {
        var def = content.data.symbols[id];
        return !!def && def.kind === 'bitmap';
    }
    function toRect(rect) {
        return rect ? new Rectangle(rect.x, rect.y, rect.width, rect.height) : null;
    }
    function toRects(rects) {
        return rects ? rects.map(function (rect) { return new Rectangle(rect.x, rect.y, rect.width, rect.height); }) : null;
    }
    function numbers(value) {
        return Array.isArray(value) ? value.map(function (v) { return (typeof v === 'number' ? v : 0); }) : [0, 0, 0, 0];
    }
    /**
     * The template's AdobeAn.handleFilterCache: re-caches the instances a clip's
     * filterCacheList names while the clip is within their frame ranges.
     */
    function handleFilterCache(event) {
        if (event.paused) {
            return;
        }
        var target = event.target;
        if (!(target instanceof MovieClip) || !target.filterCacheList) {
            return;
        }
        target.filterCacheList.forEach(function (entry) {
            if (entry.startFrame <= target.currentFrame && target.currentFrame <= entry.endFrame) {
                entry.instance.cache(entry.x, entry.y, entry.w, entry.h);
            }
        });
    }
    /**
     * A content: the symbol classes built from generated data, sharing one
     * definition per symbol.
     */
    var Content = function Content(factory, assets) {
        var this$1$1 = this;

        this.lib = {};
        this.images = {};
        /** One Graphics per drawing of the content, shared by every symbol that shows it */
        this.graphics = [];
        this.spriteSheets = {};
        this._frameAssets = {};
        var generated = factory(namespace, namespace, this.lib, undefined, undefined, playSound);
        checkRuntimeContent(generated.data);
        this.data = generated.data;
        this.scripts = generated.scripts;
        this.writers = generated.writers;
        this.data.graphics.forEach(function (def) {
            this$1$1.graphics.push(new Graphics(def.commands, this$1$1));
        });
        var textures = assets && assets.images ? assets.images : {};
        this.data.images.forEach(function (entry) {
            var texture = textures[entry.id];
            this$1$1.images[entry.id] = { src: entry.src, texture: texture || PIXI__namespace.Texture.EMPTY };
        });
        this.data.spriteSheets.forEach(function (sheet) {
            var image = this$1$1.images[sheet.name] || { src: sheet.name, texture: PIXI__namespace.Texture.EMPTY };
            this$1$1.spriteSheets[sheet.name] = new SpriteSheet(image, sheet.frames.map(numbers));
        });
        Object.keys(this.data.symbols).forEach(function (id) {
            var def = this$1$1.data.symbols[id];
            if (def.kind === 'movieclip') {
                this$1$1.lib[id] = this$1$1._movieClipClass(def);
            }
            else if (def.kind === 'sprite') {
                this$1$1.lib[id] = this$1$1._spriteClass(def);
            }
            else if (def.kind === 'bitmap') {
                this$1$1.lib[id] = this$1$1._bitmapClass(def);
            }
        });
    };
    Content.prototype.image = function image (id) {
        var image = this.images[id];
        return image ? image.texture : null;
    };
    Content.prototype.frame = function frame (sheet, index) {
        var spriteSheet = this.spriteSheets[sheet];
        return spriteSheet ? spriteSheet.textures[index] || null : null;
    };
    Content.prototype.imageAsset = function imageAsset (id) {
        return this.images[id] || null;
    };
    /** The image a frame of a sheet is drawn into for a bitmap fill (named after the atlas and the frame) */
    Content.prototype.frameAsset = function frameAsset (sheet, index) {
        var key = sheet + '#' + index;
        var asset = this._frameAssets[key];
        if (!asset) {
            var spriteSheet = this.spriteSheets[sheet];
            var texture = spriteSheet ? spriteSheet.textures[index] : undefined;
            if (!spriteSheet || !texture) {
                return null;
            }
            asset = this._frameAssets[key] = { src: spriteSheet.frames[index].image.src + '#' + index, texture: texture };
        }
        return asset;
    };
    /** An instance of a symbol, as `new lib[id]()` */
    Content.prototype.create = function create (id) {
        var symbolClass = this.lib[id];
        if (!symbolClass) {
            throw new Error('no symbol "' + id + '"');
        }
        return new symbolClass();
    };
    /**
     * An instance of a symbol to use as a root, set up the way the HTML template
     * sets up the root it creates (the filter cache handling when the symbol
     * has a filterCacheList)
     */
    Content.prototype.createRoot = function createRoot (id) {
        var root = this.create(id);
        if (root instanceof MovieClip && root.filterCacheList) {
            root.addEventListener('tick', handleFilterCache);
        }
        return root;
    };
    Content.prototype._movieClipClass = function _movieClipClass (def) {
        var content = this;
        // The symbol's drawings, from the content's table (shared with every symbol that shows the same drawing)
        var graphics = def.graphics.map(function (index) { return content.graphics[index]; });
        var fps = typeof this.data.properties.fps === 'number' ? this.data.properties.fps : null;
        var nominalBounds = toRect(def.nominalBounds);
        var frameBounds = toRects(def.frameBounds);
        return /*@__PURE__*/(function (MovieClip) {
                function anonymous(mode, startPosition, loop) {
                // Constructed with no arguments (a root, or new lib.X()): the resolved defaults
                var defaults = def.defaults;
                var noArgs = mode === undefined && startPosition === undefined && loop === undefined;
                MovieClip.call(this, noArgs && defaults ? defaults.mode : mode, noArgs && defaults ? defaults.startPosition : startPosition, noArgs && defaults ? defaults.loop : loop, new Timeline(def.duration, def.labels));
                this.contentFps = fps;
                if (nominalBounds) {
                    this.nominalBounds = nominalBounds;
                }
                if (frameBounds) {
                    this.frameBounds = frameBounds;
                }
                content._populate(this, def, graphics);
            }

                if ( MovieClip ) anonymous.__proto__ = MovieClip;
                anonymous.prototype = Object.create( MovieClip && MovieClip.prototype );
                anonymous.prototype.constructor = anonymous;

                return anonymous;
            }(MovieClip));
    };
    Content.prototype._spriteClass = function _spriteClass (def) {
        var content = this;
        var nominalBounds = toRect(def.nominalBounds);
        var frameBounds = toRects(def.frameBounds);
        return /*@__PURE__*/(function (Sprite) {
                function anonymous() {
                Sprite.call(this, content._sheet(def.sprite.sheet));
                if (nominalBounds) {
                    this.nominalBounds = nominalBounds;
                }
                if (frameBounds) {
                    this.frameBounds = frameBounds;
                }
                content._applySprite(this, def.sprite);
            }

                if ( Sprite ) anonymous.__proto__ = Sprite;
                anonymous.prototype = Object.create( Sprite && Sprite.prototype );
                anonymous.prototype.constructor = anonymous;

                return anonymous;
            }(Sprite));
    };
    Content.prototype._bitmapClass = function _bitmapClass (def) {
        var content = this;
        var nominalBounds = toRect(def.nominalBounds);
        var frameBounds = toRects(def.frameBounds);
        return /*@__PURE__*/(function (Bitmap) {
                function anonymous() {
                Bitmap.call(this, content._image(def.bitmap.image));
                if (nominalBounds) {
                    this.nominalBounds = nominalBounds;
                }
                if (frameBounds) {
                    this.frameBounds = frameBounds;
                }
                content._applyBitmap(this, def.bitmap);
            }

                if ( Bitmap ) anonymous.__proto__ = Bitmap;
                anonymous.prototype = Object.create( Bitmap && Bitmap.prototype );
                anonymous.prototype.constructor = anonymous;

                return anonymous;
            }(Bitmap));
    };
    Content.prototype._sheet = function _sheet (name) {
        var sheet = this.spriteSheets[name];
        if (!sheet) {
            throw new Error('no sprite sheet "' + name + '"');
        }
        return sheet;
    };
    Content.prototype._image = function _image (id) {
        return this.images[id] || null;
    };
    Content.prototype._applySprite = function _applySprite (sprite, def) {
        if (!def) {
            return;
        }
        sprite.spriteSheet = this._sheet(def.sheet);
        if (def.paused) {
            sprite.gotoAndStop(def.frame);
        }
        else {
            sprite.gotoAndPlay(def.frame);
        }
    };
    Content.prototype._applyBitmap = function _applyBitmap (bitmap, def) {
        if (!def) {
            return;
        }
        bitmap.image = this._image(def.image);
        bitmap.sourceRect = toRect(def.sourceRect);
    };
    Content.prototype._createSlot = function _createSlot (slot, graphics) {
        var symbol = slot.symbol;
        var symbolClass = symbol ? this.lib[symbol] : undefined;
        if (slot.kind === 'movieclip') {
            if (!symbol || !symbolClass || !isMovieClipClass(this, symbol)) {
                throw new Error('missing MovieClip symbol ' + symbol);
            }
            return new symbolClass(slot.mode, slot.startPosition, slot.loop);
        }
        if (slot.kind === 'shape') {
            return new Shape(slot.graphics === null ? null : graphics[slot.graphics]);
        }
        if (slot.kind === 'sprite') {
            var sprite;
            if (symbol && symbolClass && isSpriteClass(this, symbol)) {
                sprite = new symbolClass();
            }
            else {
                sprite = new Sprite(this._sheet(slot.sprite ? slot.sprite.sheet : ''));
            }
            this._applySprite(sprite, slot.sprite);
            return sprite;
        }
        if (slot.kind === 'bitmap') {
            var bitmap;
            if (symbol && symbolClass && isBitmapClass(this, symbol)) {
                bitmap = new symbolClass();
            }
            else {
                bitmap = new Bitmap(null);
            }
            this._applyBitmap(bitmap, slot.bitmap);
            return bitmap;
        }
        if (slot.kind === 'text') {
            var props = slot.text || {};
            var text = new Text(String(props.text == null ? '' : props.text), typeof props.font === 'string' ? props.font : undefined, typeof props.color === 'string' ? props.color : undefined);
            Object.keys(props).forEach(function (key) {
                Reflect.set(text, key, props[key]);
            });
            return text;
        }
        throw new Error('unsupported display object in the content data');
    };
    /**
     * Builds an instance of a MovieClip symbol: what the published
     * constructor builds, from the shared definition.
     */
    Content.prototype._populate = function _populate (self, def, graphics) {
            var this$1$1 = this;

        var slots = def.slots.map(function (slot) {
            var obj = this$1$1._createSlot(slot, graphics);
            if (slot.initWriter !== null) {
                this$1$1.writers[slot.initWriter](obj);
            }
            if (slot.parentSet) {
                obj.parent = self;
            }
            if (slot.filters) {
                obj.filters = slot.filters.map(function (filter) {
                    var p = filter.props;
                    var n = function (key) { var v = p[key]; return typeof v === 'number' ? v : 0; };
                    return new ColorFilter(n('redMultiplier'), n('greenMultiplier'), n('blueMultiplier'), n('alphaMultiplier'), n('redOffset'), n('greenOffset'), n('blueOffset'), n('alphaOffset'));
                });
            }
            if (slot.cache) {
                var c = slot.cache;
                obj.cache(c.x, c.y, c.width, c.height, c.scale);
            }
            return obj;
        });
        var resolve = function (target) {
            if (target.type === 'self') {
                return self;
            }
            if (target.type === 'slot') {
                return slots[target.slot];
            }
            if (target.type === 'filter') {
                var filters = slots[target.slot].filters;
                return filters ? filters[target.filter] : {};
            }
            return {};
        };
        def.slots.forEach(function (slot, i) {
            var obj = slots[i];
            if (slot.mask !== null) {
                obj.mask = slots[slot.mask];
            }
            if (slot.button) {
                var b = slot.button;
                var hit = b.hit === null ? null : slots[b.hit];
                if (obj instanceof MovieClip) {
                    new ButtonHelper(obj, b.out, b.over, b.down, b.play, hit instanceof MovieClip ? hit : null, b.hitFrame);
                }
                if (hit && !(hit instanceof MovieClip)) {
                    obj.hitArea = hit;
                }
            }
            else if (slot.hitArea !== null) {
                obj.hitArea = slots[slot.hitArea];
            }
            if (slot.filterCacheListener) {
                obj.addEventListener('tick', handleFilterCache);
            }
        });
        if (def.filterCacheList) {
            self.filterCacheList = def.filterCacheList.map(function (entry) {
                var instance = resolve(entry.instance);
                return {
                    instance: instance instanceof DisplayObject ? instance : self,
                    startFrame: entry.startFrame, endFrame: entry.endFrame,
                    x: entry.x, y: entry.y, w: entry.w, h: entry.h
                };
            });
        }
        def.members.forEach(function (member) {
            Object.defineProperty(self, member.name, { value: slots[member.slot], writable: true, enumerable: true, configurable: true });
        });
        def.unmanaged.forEach(function (index) {
            self.addChild(slots[index]);
        });
        var content = this;
        var scope = {
            stateTarget: function stateTarget(entry) {
                var target = resolve(entry.target);
                return target instanceof DisplayObject ? target : null;
            },
            value: function value(value$1) {
                if (value$1 !== null && typeof value$1 === 'object' && !Array.isArray(value$1)) {
                    return graphics[value$1.graphics] || null;
                }
                return value$1;
            },
            script: function script(index) {
                return content.scripts[index];
            },
            writer: function writer(index) {
                return content.writers[index];
            }
        };
        def.tweens.forEach(function (tween) {
            self.timeline.tweens.push(new TweenState(tween, resolve(tween.target), scope, self));
        });
        self._renderFirstFrame();
    };
    /**
     * Builds a content from the factory of its runtime content and the textures of its images.
     */
    function createContent(factory, assets) {
        return new Content(factory, assets);
    }
    /**
     * Plays one frame of a display tree the way createjs does on a stage update:
     * the tick phase (playheads advance, children in reverse order, tick
     * listeners), then the resolve phase (each MovieClip settles its timeline,
     * children in reverse order).
     */
    function tick(root, event) {
        root._tick(event || new Event('tick'));
        resolveState(root);
    }
    /**
     * The resolve phase alone: each MovieClip settles its timeline (children in
     * reverse order), without playing a frame.
     */
    function resolveState(node) {
        if (node instanceof MovieClip) {
            node._updateState();
        }
        if (node instanceof Container) {
            var children = node.children;
            for (var i = children.length - 1; i >= 0; i--) {
                if (children[i] instanceof MovieClip) {
                    resolveState(children[i]);
                }
            }
        }
    }

    /** The frame rate a root plays at when its content does not give one */
    var DEFAULT_FPS = 60;
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
    var AnimateContainer = /*@__PURE__*/(function (superclass) {
        function AnimateContainer() {
            superclass.apply(this, arguments);
            /** Playback speed (1 is the content's own frame rate) */
            this.speed = 1;
            /** Whether one call may play more than one frame (when the display runs slower than the content) */
            this.overSpeed = true;
            this._targets = {};
            this._nextId = 0;
        }

        if ( superclass ) AnimateContainer.__proto__ = superclass;
        AnimateContainer.prototype = Object.create( superclass && superclass.prototype );
        AnimateContainer.prototype.constructor = AnimateContainer;
        AnimateContainer.prototype.handleTick = function handleTick (delta) {
            var this$1$1 = this;

            var d = delta * this.speed;
            var targets = this._targets;
            Object.keys(targets).forEach(function (key) {
                var target = targets[Number(key)];
                if (!target) {
                    return;
                }
                var fps = target.root.contentFps != null ? target.root.contentFps : DEFAULT_FPS;
                target.t += d * fps / 60;
                var whole = target.t | 0;
                var frames = this$1$1.overSpeed ? whole : Math.min(whole, 1);
                if (target.isFirst) {
                    target.isFirst = false;
                    resolveState(target.root);
                    return;
                }
                target.t -= whole;
                for (var f = 0; f < frames; f++) {
                    tick(target.root);
                }
            });
        };
        /** Puts a content object on this container; a MovieClip plays from then on */
        AnimateContainer.prototype.addCreatejs = function addCreatejs (obj) {
            this._register(obj);
            this.addChild(obj.pixi);
            return obj;
        };
        AnimateContainer.prototype.addCreatejsAt = function addCreatejsAt (obj, index) {
            this._register(obj);
            this.addChildAt(obj.pixi, index);
            return obj;
        };
        AnimateContainer.prototype.removeCreatejs = function removeCreatejs (obj) {
            this.removeChild(obj.pixi);
            return obj;
        };
        /**
         * A MovieClip is played while its node is on this container. Coming from
         * another parent, it starts over from its first frame.
         */
        AnimateContainer.prototype._register = function _register (obj) {
            var this$1$1 = this;

            if (!(obj instanceof MovieClip)) {
                return;
            }
            var node = obj.pixi;
            var previous = node.parent;
            node.once('added', function () {
                if (node.parent !== previous) {
                    obj.gotoAndPlay(0);
                }
                var id = this$1$1._nextId++;
                this$1$1._targets[id] = { root: obj, t: 0, isFirst: true };
                node.once('removed', function () {
                    delete this$1$1._targets[id];
                });
            });
        };

        return AnimateContainer;
    }(PIXI__namespace.Container));

    exports.AnimateContainer = AnimateContainer;
    exports.Bitmap = Bitmap;
    exports.ButtonHelper = ButtonHelper;
    exports.CjsTransform = CjsTransform;
    exports.ColorFilter = ColorFilter;
    exports.Container = Container;
    exports.Content = Content;
    exports.DisplayObject = DisplayObject;
    exports.Event = Event;
    exports.EventDispatcher = EventDispatcher;
    exports.GRAPHICS_COMMANDS = GRAPHICS_COMMANDS;
    exports.GradientTexture = GradientTexture;
    exports.Graphics = Graphics;
    exports.GraphicsCommand = GraphicsCommand;
    exports.INDEPENDENT = INDEPENDENT;
    exports.MovieClip = MovieClip;
    exports.PixiContainer = PixiContainer;
    exports.PixiGraphics = PixiGraphics;
    exports.PixiSprite = PixiSprite;
    exports.PixiText = PixiText;
    exports.RUNTIME_CONTENT_RANGE = RUNTIME_CONTENT_RANGE;
    exports.Rectangle = Rectangle;
    exports.SINGLE_FRAME = SINGLE_FRAME;
    exports.SYNCHED = SYNCHED;
    exports.Shape = Shape;
    exports.Sprite = Sprite;
    exports.SpriteSheet = SpriteSheet;
    exports.Text = Text;
    exports.Timeline = Timeline;
    exports.TweenState = TweenState;
    exports.VERSION = VERSION;
    exports.checkVersion = checkVersion;
    exports.compareVersions = compareVersions;
    exports.createContent = createContent;
    exports.drawCommands = drawCommands;
    exports.namespace = namespace;
    exports.parseColor = parseColor;
    exports.parseVersion = parseVersion;
    exports.resolveState = resolveState;
    exports.satisfies = satisfies;
    exports.tick = tick;

})(this.PIXI.animateRuntime = this.PIXI.animateRuntime || {}, PIXI);
//# sourceMappingURL=pixi-animate-runtime.js.map
