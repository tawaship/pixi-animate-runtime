/*!
 * @tawaship/pixi-animate-runtime - v0.1.0
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

'use strict';

var path = require('path');
var animateDataConverter = require('@tawaship/animate-data-converter');
var fs = require('fs');

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

var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);
var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);

/**
 * Semantic version numbers and ranges, as far as the version checks of
 * definitions and runtime content need them: versions are MAJOR.MINOR.PATCH,
 * and ranges are written as npm writes them (`1.2.3`, `1.x`, `^1.2.0`,
 * `~1.2.0`, `>=1.0.0 <2.0.0`, `0.x || 1.x`). Pre-release tags are not handled.
 */
/** A version as its three numbers, or null when it is not MAJOR.MINOR.PATCH */
function parseVersion(text) {
    const match = /^\s*v?(\d+)\.(\d+)\.(\d+)\s*$/.exec(text);
    return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}
function compareParsed(a, b) {
    for (let i = 0; i < 3; i++) {
        if (a[i] !== b[i]) {
            return a[i] < b[i] ? -1 : 1;
        }
    }
    return 0;
}
/** -1, 0 or 1 as a is lower than, the same as or higher than b (both have to be versions) */
function compareVersions(a, b) {
    const pa = parseVersion(a);
    const pb = parseVersion(b);
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
    const parts = text.split('.');
    if (parts.length > 3) {
        return null;
    }
    const numbers = [];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
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
    const match = /^(\^|~|>=|<=|>|<|=)?(.+)$/.exec(word);
    if (!match) {
        return null;
    }
    const op = match[1] || '=';
    const numbers = parsePartial(match[2]);
    if (!numbers) {
        return null;
    }
    const low = lowest(numbers);
    const result = [];
    const atLeast = (bound) => {
        result.push({ op: '>=', bound });
    };
    const below = (bound) => {
        if (bound) {
            result.push({ op: '<', bound });
        }
    };
    if (op === '=') {
        atLeast(low);
        below(above(numbers));
    }
    else if (op === '^') {
        // The left-most non-zero number given stays the same (^1.2.3 <2.0.0, ^0.2.3 <0.3.0, ^0.0.3 <0.0.4)
        let fixed = 0;
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
        const next = above(numbers);
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
    const parsed = parseVersion(version);
    if (!parsed) {
        return false;
    }
    return range.split('||').some(set => {
        const words = set.trim().split(/\s+/).filter(word => word !== '');
        if (!words.length) {
            throw new Error('not a version range: ' + range);
        }
        return words.every(word => {
            const comparators = parseComparator(word);
            if (!comparators) {
                throw new Error('not a version range: ' + range);
            }
            return comparators.every(c => {
                const order = compareParsed(parsed, c.bound);
                return c.op === '>=' ? order >= 0 : order < 0;
            });
        });
    });
}
function checkVersion(version, range, known) {
    const parsed = parseVersion(version);
    if (!parsed) {
        return { error: 'no version (' + JSON.stringify(version) + ')', warning: null, newer: false };
    }
    const newer = compareVersions(version, known) > 0;
    if (!satisfies(version, range)) {
        return { error: version + ' is outside ' + range, warning: null, newer };
    }
    return { error: null, warning: newer ? version + ' is newer than ' + known : null, newer };
}

/** The version of this package (written in from package.json when the package is built) */
const VERSION = "0.1.0";

/**
 * The animate-data-converter versions this generator reads definitions of:
 * the range this package depends on, and the version it was built with
 * (written in from package.json when the package is built).
 */
const CONVERTER_RANGE = "^0.1.0";
const CONVERTER_KNOWN = "0.1.0";

/**
 * The eases of CreateJS (createjs.Ease), computed as CreateJS computes them,
 * by name. Runtime content names the ease of an interpolated stretch of a
 * tween; the player computes the stretch's values with it once, when a symbol's
 * class is made. `get:<amount>` is Ease.get(amount) (Animate's classic ease).
 */
function powIn(pow) {
    return t => Math.pow(t, pow);
}
function powOut(pow) {
    return t => 1 - Math.pow(1 - t, pow);
}
function powInOut(pow) {
    return t => ((t *= 2) < 1 ? 0.5 * Math.pow(t, pow) : 1 - 0.5 * Math.abs(Math.pow(2 - t, pow)));
}
function backIn(amount) {
    return t => t * t * ((amount + 1) * t - amount);
}
function backOut(amount) {
    return t => --t * t * ((amount + 1) * t + amount) + 1;
}
function backInOut(amount) {
    amount *= 1.525;
    return t => ((t *= 2) < 1 ? 0.5 * (t * t * ((amount + 1) * t - amount)) : 0.5 * ((t -= 2) * t * ((amount + 1) * t + amount) + 2));
}
function elasticIn(amplitude, period) {
    const pi2 = 2 * Math.PI;
    return t => {
        if (t == 0 || t == 1) {
            return t;
        }
        const s = period / pi2 * Math.asin(1 / amplitude);
        return -(amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period));
    };
}
function elasticOut(amplitude, period) {
    const pi2 = 2 * Math.PI;
    return t => {
        if (t == 0 || t == 1) {
            return t;
        }
        const s = period / pi2 * Math.asin(1 / amplitude);
        return amplitude * Math.pow(2, -10 * t) * Math.sin((t - s) * pi2 / period) + 1;
    };
}
function elasticInOut(amplitude, period) {
    const pi2 = 2 * Math.PI;
    return t => {
        const s = period / pi2 * Math.asin(1 / amplitude);
        return (t *= 2) < 1
            ? -0.5 * (amplitude * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - s) * pi2 / period))
            : amplitude * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - s) * pi2 / period) * 0.5 + 1;
    };
}
function bounceOut(t) {
    return 1 / 2.75 > t ? 7.5625 * t * t
        : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + 0.75
            : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375
                : 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
}
function bounceIn(t) {
    return 1 - bounceOut(1 - t);
}
/** Ease.get(amount): Animate's classic ease, amount from -1 (in) to 1 (out) */
function classic(amount) {
    amount = amount < -1 ? -1 : amount > 1 ? 1 : amount;
    return t => (amount == 0 ? t : amount < 0 ? t * (t * -amount + 1 + amount) : t * ((2 - t) * amount + (1 - amount)));
}
const EASES = {
    linear: t => t,
    quadIn: powIn(2), quadOut: powOut(2), quadInOut: powInOut(2),
    cubicIn: powIn(3), cubicOut: powOut(3), cubicInOut: powInOut(3),
    quartIn: powIn(4), quartOut: powOut(4), quartInOut: powInOut(4),
    quintIn: powIn(5), quintOut: powOut(5), quintInOut: powInOut(5),
    sineIn: t => 1 - Math.cos(t * Math.PI / 2),
    sineOut: t => Math.sin(t * Math.PI / 2),
    sineInOut: t => -0.5 * (Math.cos(Math.PI * t) - 1),
    backIn: backIn(1.7), backOut: backOut(1.7), backInOut: backInOut(1.7),
    circIn: t => -(Math.sqrt(1 - t * t) - 1),
    circOut: t => Math.sqrt(1 - --t * t),
    circInOut: t => ((t *= 2) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1)),
    bounceIn, bounceOut,
    bounceInOut: t => (0.5 > t ? 0.5 * bounceIn(2 * t) : 0.5 * bounceOut(2 * t - 1) + 0.5),
    elasticIn: elasticIn(1, 0.3), elasticOut: elasticOut(1, 0.3), elasticInOut: elasticInOut(1, 0.3 * 1.5)
};
/** The ease runtime content names (null for a name the player does not know) */
function easeOf(id) {
    if (id.indexOf('get:') === 0) {
        return classic(Number(id.slice(4)));
    }
    return Object.prototype.hasOwnProperty.call(EASES, id) ? EASES[id] : null;
}
/** The eases the generator tries for a stretch of a tween, by name: the named ones, then Ease.get(-1 .. 1) in hundredths */
function easeIds() {
    const ids = Object.keys(EASES);
    for (let n = -100; n <= 100; n++) {
        ids.push('get:' + n / 100);
    }
    return ids;
}

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
 * The values at a position of a step, as CreateJS's Tween computes them: the
 * ratio of the position in the step, eased, then each value from its start
 * toward its end (a value that is not a number, or does not change, keeps its
 * start until the eased ratio reaches 1).
 */
function interpolated(from, to, position, length, ease) {
    let ratio = position / length;
    if (ease) {
        ratio = ease(ratio);
    }
    return from.map((v0, i) => {
        const v1 = to[i];
        return v0 !== v1 && typeof v0 === 'number' && typeof v1 === 'number' ? v0 + (v1 - v0) * ratio : ratio >= 1 ? v1 : v0;
    });
}
/** The values a slot's fields have when runtime content leaves them out */
const SLOT_DEFAULTS = {
    symbol: null, mode: null, startPosition: null, loop: null, graphics: null, sprite: null, bitmap: null, text: null,
    mask: null, hitArea: null, filters: null, cache: null, button: null, filterCacheListener: false, parentSet: false,
    initWriter: null, initValues: null
};

/** Manifest entries kept as images (sounds and other files are left out) */
const IMAGE_SOURCE = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
/** A property access written out in code: o.name, or o["name"] for other names */
function access(name) {
    return IDENTIFIER.test(name) ? 'o.' + name : 'o[' + JSON.stringify(name) + ']';
}
/** The ease ids tried for a stretch, with their eases (made once) */
const EASE_CANDIDATES = easeIds().map(id => ({ id, ease: easeOf(id) }));
/**
 * A tween's frame values as written: each step (from one keyframe to the next)
 * that interpolation reproduces exactly (the player's own interpolated, with
 * a CreateJS ease, gives every position's values as recorded) is written as a
 * stretch [from, to, length, ease]; any other position as the index of its
 * values, written once each. What cannot be reproduced exactly (a motion
 * guide, a step cut short by a jump) stays as recorded values.
 */
function interpolatedFrames(frames, keyframes) {
    const values = [];
    const indexes = new Map();
    const indexOf = (frame) => {
        const key = JSON.stringify(frame);
        let index = indexes.get(key);
        if (index === undefined) {
            index = values.push(frame) - 1;
            indexes.set(key, index);
        }
        return index;
    };
    const last = frames.length - 1;
    const starts = keyframes.filter((key, i) => key > 0 && key < last && keyframes.indexOf(key) === i).sort((a, b) => a - b);
    const bounds = [0].concat(starts, [last]);
    const refs = [];
    for (let i = 0; i + 1 < bounds.length; i++) {
        const start = bounds[i];
        const length = bounds[i + 1] - start;
        const found = length > 1 ? EASE_CANDIDATES.find(candidate => {
            for (let position = 0; position < length; position++) {
                if (JSON.stringify(interpolated(frames[start], frames[start + length], position, length, candidate.ease)) !== JSON.stringify(frames[start + position])) {
                    return false;
                }
            }
            return true;
        }) : undefined;
        if (found) {
            refs.push([indexOf(frames[start]), indexOf(frames[start + length]), length, found.id]);
        }
        else {
            for (let position = start; position < start + length; position++) {
                refs.push(indexOf(frames[position]));
            }
        }
    }
    refs.push(indexOf(frames[last]));
    return { values, frames: refs };
}
/**
 * A tween's distinct values as written: in a display list (the `state` prop),
 * an entry that places a slot as it is (no props) is written as the slot's
 * index. The player turns them back into entries once per symbol.
 */
function writtenFrames(props, frames, keyframes) {
    const distinct = interpolatedFrames(frames, keyframes);
    const state = props.indexOf('state');
    return {
        frames: distinct.frames,
        values: distinct.values.map(frame => frame.map((value, i) => {
            if (i !== state || !Array.isArray(value)) {
                return value;
            }
            return value.map(entry => entry.target.type === 'slot' && entry.props === null ? entry.target.slot : entry);
        }))
    };
}
/** A recorded Graphics reference ({ graphics: n }): the value has to be resolved to the instance's Graphics */
function isGraphicsReference(value) {
    return value !== null && typeof value === 'object' && !Array.isArray(value);
}
/**
 * The writer of a tween: one assignment per property, the name written in the
 * code (so the engine resolves each write once instead of looking a name up
 * on every frame). values[i] goes to props[i]; a property that ever holds a
 * Graphics reference goes through resolve.
 */
function tweenWriter(props, frames) {
    const lines = props.map((name, i) => {
        const resolved = frames.some(frame => isGraphicsReference(frame[i]));
        return access(name) + ' = ' + (resolved ? 'g(v[' + i + '])' : 'v[' + i + ']') + ';';
    });
    return 'function (o, v, g) { ' + lines.join(' ') + ' }';
}
/**
 * A slot's template as written in runtime content: the definition's template
 * with the writer of its initial values, the fields at their defaults
 * (SLOT_DEFAULTS) left out, the player filling them in. Its initial values are
 * not in it (the slot gives them).
 */
function slotTemplate(template, initWriter) {
    const full = Object.assign({}, SLOT_DEFAULTS, template, { initWriter, initValues: null });
    const data = { kind: full.kind };
    Object.keys(SLOT_DEFAULTS).forEach(key => {
        const value = Reflect.get(full, key);
        if (JSON.stringify(value) !== JSON.stringify(Reflect.get(SLOT_DEFAULTS, key))) {
            Reflect.set(data, key, value);
        }
    });
    return data;
}
/** A table of values written once each, identical ones (compared as JSON) sharing one index */
class JsonTable {
    constructor() {
        this.list = [];
        this._indexes = new Map();
    }
    add(value) {
        const key = JSON.stringify(value);
        const known = this._indexes.get(key);
        if (known !== undefined) {
            return known;
        }
        this.list.push(value);
        this._indexes.set(key, this.list.length - 1);
        return this.list.length - 1;
    }
}
/**
 * Initial values a display object of the player already has when it is made
 * (as a createjs one has): writing them changes nothing, so they are left out.
 * `name` is not among them: writing null gives the Pixi node the name ''
 * (its own default is null).
 */
const INIT_DEFAULTS = {
    x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0, regX: 0, regY: 0,
    alpha: 1, visible: true, compositeOperation: null
};
/**
 * The initial values of a slot to write (those not at INIT_DEFAULTS), and the
 * writer that writes them: one assignment per property, the name written in
 * the code and the value taken from the values, so that slots setting the
 * same properties share one writer.
 */
function initWrite(init) {
    const names = Object.keys(init).filter(name => init[name] !== undefined && !(name in INIT_DEFAULTS && init[name] === INIT_DEFAULTS[name]));
    if (!names.length) {
        return null;
    }
    return {
        source: 'function (o, v) { ' + names.map((name, i) => access(name) + ' = v[' + i + '];').join(' ') + ' }',
        values: names.map(name => init[name])
    };
}
/**
 * The member writer of a symbol: one assignment per named child, the name
 * written in the code (as the published constructor's `this.<name> = ...`),
 * so that no name is looked up when an instance is made.
 */
function memberWriter(members) {
    return 'function (o, s) { ' + members.map(member => access(member.name) + ' = s[' + member.slot + '];').join(' ') + ' }';
}
/** Function sources written once each, identical ones sharing one index */
class CodeTable {
    constructor() {
        this.list = [];
        this._indexes = new Map();
    }
    /** The index of a function's source: functions written the same are one entry (they hold no state) */
    add(source) {
        const known = this._indexes.get(source);
        if (known !== undefined) {
            return known;
        }
        this.list.push(source);
        this._indexes.set(source, this.list.length - 1);
        return this.list.length - 1;
    }
}
/** A display list entry from its compact form (a slot placed as it is is the slot's index) */
function stateEntryOf(entry) {
    return typeof entry === 'number' ? { target: { type: 'slot', slot: entry }, props: null } : entry;
}
/** Whether a compact value is a frame value as it is (all but a display list with slot indexes) */
function isFrameValue(value) {
    return !Array.isArray(value) || value.every(entry => typeof entry !== 'number');
}
/**
 * A tween's values at every position (frames[position][i] is the value of
 * props[i]), from its compact form: interpolated stretches are found among
 * these. Display list entries are whole.
 */
function framesOf(tween) {
    const state = tween.props.indexOf('state');
    const values = tween.values.map(row => row.map((value, i) => {
        if (i === state && Array.isArray(value)) {
            return value.map(stateEntryOf);
        }
        return isFrameValue(value) ? value : null;
    }));
    return tween.frames.map(index => values[index]);
}
function convertMovieClip(def, templates, scripts, writers, memberWriters, slotTemplates) {
    const add = (source) => writers.add(source);
    return {
        kind: def.kind, id: def.id, nominalBounds: def.nominalBounds, frameBounds: def.frameBounds,
        defaults: def.defaults, labels: def.labels, duration: def.duration,
        // A slot is its template (shared by the slots that differ only in their initial values) and its initial values
        slots: def.slots.map((slot) => {
            const write = initWrite(typeof slot === 'number' ? {} : slot[1]);
            const template = slotTemplates.add(slotTemplate(templates[typeof slot === 'number' ? slot : slot[0]], write ? add(write.source) : null));
            return write ? [template, write.values] : template;
        }),
        memberWriter: def.members.length ? memberWriters.add(memberWriter(def.members)) : null,
        unmanaged: def.unmanaged, graphics: def.graphics, filterCacheList: def.filterCacheList,
        tweens: def.tweens.map(tween => {
            const frames = framesOf(tween);
            return Object.assign({
                target: tween.target, duration: tween.duration, props: tween.props,
                keyframes: tween.keyframes,
                actions: tween.actions.map(action => {
                    scripts.push(action.source);
                    return { position: action.position, script: scripts.length - 1, params: action.params };
                }),
                writer: tween.props.length ? add(tweenWriter(tween.props, frames)) : null
            }, writtenFrames(tween.props, frames, tween.keyframes));
        })
    };
}
/**
 * The runtime content file: a factory that takes the names frame scripts
 * refer to (cjs, createjs, lib, exportRoot, stage, playSound) and returns the
 * data, the scripts and the writers. The scripts are written as code, as
 * published (not rewritten), and the writers are code too, so no code is
 * compiled at run time. Loaded (by a script tag or any other way), the file
 * registers the factory in `window.PixiAnimateRuntimeContents` under the
 * content's composition id. One registered under the same id before is
 * replaced, with a warning: which content an id stands for is the
 * application's to decide (one id may be given contents of the same make in
 * turn); contents already built keep working.
 */
function runtimeContentSource(data, scripts, writers, memberWriters, id, sourceName) {
    const comment = sourceName.replace(/\*\//g, '* /');
    return [
        '/* Generated by @tawaship/pixi-animate-runtime from Adobe Animate HTML5 Canvas output.',
        ' * Runtime content ' + JSON.stringify(id).replace(/\*\//g, '* /') + ' (composition id), from ' + comment + ' */',
        '(function (contents, id, source, factory) {',
        '\tvar known = contents[id];',
        '\tif (known && typeof console !== "undefined") {',
        '\t\tconsole.warn("Runtime content " + JSON.stringify(id) + " (" + source + ") replaces the one registered under the same composition id (" + (known.source || "unknown") + ").");',
        '\t}',
        '\tfactory.source = source;',
        '\tcontents[id] = factory;',
        '})(window.PixiAnimateRuntimeContents = window.PixiAnimateRuntimeContents || {}, ' + JSON.stringify(id) + ', ' + JSON.stringify(sourceName) + ', function (cjs, createjs, lib, exportRoot, stage, playSound) {',
        '\treturn {',
        '\t\tdata: ' + JSON.stringify(data) + ',',
        '\t\tscripts: [',
        scripts.map(script => '\t\t\t' + script).join(',\n'),
        '\t\t],',
        '\t\twriters: [',
        writers.map(writer => '\t\t\t' + writer).join(',\n'),
        '\t\t],',
        '\t\tmemberWriters: [',
        memberWriters.map(writer => '\t\t\t' + writer).join(',\n'),
        '\t\t]',
        '\t};',
        '});',
        ''
    ].join('\n');
}
/**
 * Whether this generator reads a definition: an error when the version of
 * animate-data-converter that extracted it is outside the range this package
 * depends on, a warning when it is newer than the converter this generator
 * was built with (it may hold what the generator does not know and leaves out).
 */
function checkDefinition(definition) {
    const made = typeof definition.converterVersion === 'string' ? definition.converterVersion : '';
    const check = checkVersion(made, CONVERTER_RANGE, CONVERTER_KNOWN);
    const by = 'The definition was extracted by animate-data-converter ' + (made || '(no version)');
    if (check.error) {
        throw new Error(by + ', which this generator (pixi-animate-runtime ' + VERSION + ') does not read (it reads definitions from ' + CONVERTER_RANGE + '). '
            + (check.newer ? 'Update pixi-animate-runtime.' : 'Extract the definition again with animate-data-converter ' + CONVERTER_RANGE + '.'));
    }
    return check.warning ? [by + ', newer than the version this generator knows of (' + CONVERTER_KNOWN + '). What the newer version added may be left out; update pixi-animate-runtime.'] : [];
}
/** The composition id of a content (lib.properties.id): the id its runtime content is registered and loaded under */
function compositionId(definition) {
    const id = definition.properties.id;
    if (typeof id !== 'string' || !id) {
        throw new Error('The published content has no composition id (lib.properties.id): its runtime content could not be registered.');
    }
    return id;
}
/**
 * Generates the runtime content of a content from its extracted definition.
 * It is registered under the content's composition id; `sourceName` (the
 * published file it came from) is written into it to tell contents apart in
 * messages.
 */
function generate(definition, sourceName) {
    const warnings = checkDefinition(definition);
    if (definition.form !== 'compact') {
        throw new Error('The definition is not in its compact form (form: ' + JSON.stringify(definition.form) + '): generate takes the definition as animate-data-converter extracts it (compact() of animate-data-converter gives it from an expanded one).');
    }
    const id = compositionId(definition);
    const scripts = [];
    // Writers written the same (the same values set, the same names given) are written once and shared
    const writers = new CodeTable();
    const memberWriters = new CodeTable();
    const slotTemplates = new JsonTable();
    const symbols = {};
    Object.keys(definition.symbols).forEach(key => {
        const def = definition.symbols[key];
        symbols[key] = def.kind === 'movieclip' ? convertMovieClip(def, definition.slotTemplates, scripts, writers, memberWriters, slotTemplates) : def;
    });
    const data = {
        runtimeVersion: VERSION,
        properties: definition.properties,
        images: definition.manifest.filter(entry => IMAGE_SOURCE.test(entry.src)),
        spriteSheets: definition.spriteSheets,
        graphics: definition.graphics,
        commandKinds: definition.commandKinds,
        slotTemplates: slotTemplates.list,
        symbols
    };
    const source = runtimeContentSource(data, scripts, writers.list, memberWriters.list, id, sourceName || '(unknown)');
    return { id, data, scripts, writers: writers.list, memberWriters: memberWriters.list, source, issues: definition.issues, warnings };
}
/**
 * Extracts a published file and generates its runtime content.
 */
function generateFromPublishedFile(publishedPath) {
    return animateDataConverter.extractPublishedFile(publishedPath).then(definition => generate(definition, path__namespace.basename(publishedPath)));
}

/** Whether a JavaScript file is Animate HTML5 Canvas output (it registers a composition) */
function isPublished(file) {
    return /\.compositions\s*\[/.test(fs__namespace.readFileSync(file, 'utf8'));
}
function publishedFiles(dir) {
    return fs__namespace.readdirSync(dir, { withFileTypes: true })
        .filter(entry => entry.isFile() && /\.js$/i.test(entry.name))
        .map(entry => path__namespace.join(dir, entry.name))
        .filter(isPublished)
        .sort();
}
/** Directories the recursive search does not enter: packages, and hidden ones (.git and the like) */
function isSkipped(name) {
    return name === 'node_modules' || name.charAt(0) === '.';
}
/** The published files in a directory and in the directories below it */
function publishedFilesBelow(dir) {
    const files = publishedFiles(dir);
    fs__namespace.readdirSync(dir, { withFileTypes: true })
        .filter(entry => entry.isDirectory() && !isSkipped(entry.name))
        .map(entry => entry.name)
        .sort()
        .forEach(name => {
        publishedFilesBelow(path__namespace.join(dir, name)).forEach(file => files.push(file));
    });
    return files;
}
/** The local file of an image path of the manifest (its query and hash left out), or null for a URL that is not a file */
function localImagePath(src) {
    if (/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(src) || src.charAt(0) === '/') {
        return null;
    }
    return src.split('#')[0].split('?')[0];
}
/** Whether a relative path stays inside a directory (not absolute, and not leading up out of it) */
function isBelow(dir, relativePath) {
    if (path__namespace.isAbsolute(relativePath)) {
        return false;
    }
    const fromDir = path__namespace.relative(dir, path__namespace.resolve(dir, relativePath));
    return fromDir !== '' && !fromDir.startsWith('..') && !path__namespace.isAbsolute(fromDir);
}
function listFiles(dir) {
    if (!fs__namespace.existsSync(dir)) {
        return [];
    }
    const files = [];
    fs__namespace.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
        const full = path__namespace.join(dir, entry.name);
        if (entry.isDirectory()) {
            listFiles(full).forEach(file => files.push(file));
        }
        else {
            files.push(full);
        }
    });
    return files;
}
/** A path from a directory, "/" separated */
function relativePath(from, file) {
    return path__namespace.relative(from, file).split(path__namespace.sep).join('/') || '.';
}
/**
 * The published files an input names, and the directory their names are
 * taken from. Only reads the files (nothing is run). Throws when the input
 * does not exist or has no published file.
 */
function findPublished(input, recursive, cwd) {
    const inputPath = path__namespace.resolve(cwd || process.cwd(), input);
    if (!fs__namespace.existsSync(inputPath)) {
        throw new Error('not found: ' + inputPath);
    }
    const single = fs__namespace.statSync(inputPath).isFile();
    const files = single ? [inputPath] : recursive ? publishedFilesBelow(inputPath) : publishedFiles(inputPath);
    if (!files.length) {
        throw new Error('no published content (Animate HTML5 Canvas JavaScript) in ' + inputPath + (recursive ? ' or below it' : ''));
    }
    return { root: single ? path__namespace.dirname(inputPath) : inputPath, files };
}
/** The local images a generated content uses (paths from its published directory), and why it cannot be written if it cannot */
function imagesOf(generated, publishedDir) {
    const images = [];
    const missing = [];
    const outside = [];
    generated.data.images.forEach(entry => {
        const local = localImagePath(entry.src);
        if (local === null) {
            return;
        }
        // Animate writes image paths relative to the published file, below its directory: a path
        // that leads elsewhere (up out of it, or absolute) is neither read nor copied
        if (!isBelow(publishedDir, local)) {
            outside.push(entry.src);
        }
        else if (fs__namespace.existsSync(path__namespace.join(publishedDir, local))) {
            images.push(local);
        }
        else {
            missing.push(entry.src);
        }
    });
    if (outside.length) {
        return { images, problem: 'image paths that lead out of its directory: ' + outside.join(', ') };
    }
    if (missing.length) {
        return { images, problem: 'images it uses are missing: ' + missing.join(', ') };
    }
    return { images, problem: null };
}
/**
 * Finds the published files, makes their runtime content and works out where
 * everything would be written, without writing anything. Each published file
 * is run in a sandbox of its own, one after another. What cannot be written
 * (a file that cannot be read, unsupported features without force, missing
 * images) is in the plan with its problem. Throws when the input does not
 * exist, has no published file, or the output would be a published directory.
 * {@link writeGeneration} writes the plan.
 */
async function planGeneration(options) {
    const cwd = options.cwd || process.cwd();
    const found = findPublished(options.input, options.recursive, cwd);
    const root = found.root;
    const outRoot = options.outDir !== undefined && options.outDir !== null ? path__namespace.resolve(cwd, options.outDir) : null;
    // Below the output directory at the path of its published file from the root, or into generated/ next to its published file
    const outDirOf = (file) => outRoot !== null ? path__namespace.join(outRoot, path__namespace.relative(root, path__namespace.dirname(file))) : path__namespace.join(path__namespace.dirname(file), 'generated');
    if (found.files.some(file => path__namespace.resolve(outDirOf(file)) === path__namespace.resolve(path__namespace.dirname(file)))) {
        throw new Error('the output directory is the published directory: runtime content would overwrite the published files of the same names');
    }
    const contents = [];
    // One after another: each is run in a sandbox of its own
    for (const file of found.files) {
        const outDir = outDirOf(file);
        const out = path__namespace.join(outDir, path__namespace.basename(file));
        const content = {
            published: file,
            name: relativePath(root, file),
            id: null,
            out,
            exists: fs__namespace.existsSync(out),
            images: [],
            source: null,
            issues: [],
            warnings: [],
            problem: null
        };
        contents.push(content);
        try {
            const definition = await animateDataConverter.extractPublishedFile(file);
            content.id = compositionId(definition);
            const generated = generate(definition, path__namespace.basename(file));
            content.issues = generated.issues;
            content.warnings = generated.warnings;
            const images = imagesOf(generated, path__namespace.dirname(file));
            content.images = images.images.map(image => ({ from: path__namespace.join(path__namespace.dirname(file), image), to: path__namespace.join(outDir, image) }));
            if (generated.issues.length && !options.force) {
                content.problem = generated.issues.length + ' unsupported feature(s)';
            }
            else if (images.problem !== null) {
                content.problem = images.problem;
            }
            else {
                content.source = generated.source;
            }
        }
        catch (e) {
            content.problem = (content.id === null ? 'could not read: ' : '') + (e instanceof Error ? e.message : String(e));
        }
    }
    const existing = [];
    (outRoot !== null ? [outRoot] : contents.map(content => path__namespace.dirname(content.out)).filter((dir, i, all) => all.indexOf(dir) === i)).forEach(dir => {
        listFiles(dir).forEach(file => existing.push(file));
    });
    return { root, outDir: outRoot, contents, existing };
}
/**
 * Writes a plan made by {@link planGeneration}: the runtime content it made
 * (as it was when the plan was made) and copies of the images. The contents
 * with a problem are not written. Nothing is deleted.
 */
function writeGeneration(plan) {
    const written = {};
    const files = [];
    const add = (file) => {
        written[path__namespace.resolve(file)] = true;
        files.push(file);
    };
    plan.contents.forEach(content => {
        if (content.source === null || content.problem !== null) {
            return;
        }
        fs__namespace.mkdirSync(path__namespace.dirname(content.out), { recursive: true });
        fs__namespace.writeFileSync(content.out, content.source);
        add(content.out);
        content.images.forEach(image => {
            if (!written[path__namespace.resolve(image.to)]) {
                fs__namespace.mkdirSync(path__namespace.dirname(image.to), { recursive: true });
                fs__namespace.copyFileSync(image.from, image.to);
                add(image.to);
            }
        });
    });
    return { written: files, left: plan.existing.filter(file => !written[path__namespace.resolve(file)]) };
}

const USAGE = [
    'Usage: pixi-animate-runtime [<published directory or file>] [-o <directory>] [-r] [-y] [-f]',
    '',
    '  <published directory>      a directory Animate published HTML5 Canvas content into: every published',
    '                             JavaScript file directly in it is turned into runtime content',
    '  <published file>           one published JavaScript file',
    '  -o, --out-dir <directory>  where to write (default: generated/ in the published directory)',
    '  -r, --recursive            also look in the directories below it (not node_modules, nor directories',
    '                             whose name starts with "."); with -o, each content is written below it at',
    '                             the same relative path, and otherwise into generated/ next to its file',
    '  -y, --yes                  write without asking anything (needed when not run in a terminal)',
    '  -f, --force                write runtime content even when the content uses unsupported features',
    '  -h, --help                 show this',
    '',
    'Each runtime content file gets the name of its published file, and the images it uses are copied',
    'next to it at the same relative paths. What would be written is listed first, and written only',
    'when you answer "y" (or with -y; run from a script or CI without -y, nothing is written). In a',
    'terminal, you are also asked for the directories that are not given. Nothing is ever deleted:',
    'files already in the output directory that this run did not write are listed.'
].join('\n');
/** A composition id as listed: its first characters (the whole id is in the published file and at the top of the runtime content) */
function shortId(id) {
    return id === null ? '-' : id.length > 8 ? id.slice(0, 8) + '...' : id;
}
function pad(text, width) {
    return text.length >= width ? text : text + ' '.repeat(width - text.length);
}
/**
 * Lists a plan as a table: where from and where to once, then a row for each
 * published file (its composition id shortened, the number of images, and
 * whether it is new, replaces a file, or is not written and why).
 * Unsupported features and warnings go to stderr.
 */
function showPlan(plan, force, cwd, io) {
    plan.contents.forEach(content => {
        content.warnings.forEach(warning => {
            io.stderr(content.name + ': warning: ' + warning + '\n');
        });
        content.issues.forEach(issue => {
            io.stderr(content.name + ': unsupported: ' + (issue.symbol ? issue.symbol : '(content)') + (issue.slot !== null ? ' slot ' + issue.slot : '') + ': ' + issue.message + '\n');
        });
    });
    io.stdout('From: ' + relativePath(cwd, plan.root) + '\n');
    io.stdout('To:   ' + (plan.outDir !== null ? relativePath(cwd, plan.outDir) + '  (each at its path from "From")' : 'generated/ next to each published file') + '\n\n');
    const header = ['published', 'composition id', 'images', ''];
    const rows = plan.contents.map(content => [
        content.name,
        shortId(content.id),
        content.images.length ? String(content.images.length) : '',
        content.problem !== null ? 'not written: ' + content.problem + (content.issues.length && !force ? ' (--force writes it anyway)' : '') : content.exists ? 'replace' : 'new'
    ]);
    const widths = [0, 1, 2].map(column => Math.max(header[column].length, ...rows.map(row => row[column].length)));
    [header].concat(rows).forEach(row => {
        io.stdout(('  ' + pad(row[0], widths[0]) + '  ' + pad(row[1], widths[1]) + '  ' + ' '.repeat(widths[2] - row[2].length) + row[2] + '  ' + row[3]).replace(/\s+$/, '') + '\n');
    });
    const writes = plan.contents.filter(content => content.problem === null).length;
    const notWritten = plan.contents.length - writes;
    const counts = {};
    plan.contents.forEach(content => {
        if (content.id !== null) {
            counts[content.id] = (counts[content.id] || 0) + 1;
        }
    });
    const shared = Object.keys(counts).filter(id => counts[id] > 1).length;
    io.stdout('\n' + writes + ' to write' + (notWritten ? ', ' + notWritten + ' not written' : '') + '.' +
        (shared ? ' ' + shared + ' composition id(s) shared by several files (on one page, the later replaces the earlier).' : '') + '\n');
}
/**
 * The command line tool: {@link planGeneration}, the plan listed (and, in a
 * terminal, confirmed; without one, written only with -y), then
 * {@link writeGeneration}. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or nothing was written for want of
 * a "y", 2 for usage and loading errors.
 */
async function runCli(args, io) {
    const cwd = io.cwd || process.cwd();
    let input = null;
    let outDir = null;
    let force = false;
    let recursive = false;
    let yes = false;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--out-dir' || arg === '-o') {
            const value = args[++i];
            if (value === undefined) {
                io.stderr(arg + ' needs a directory\n\n' + USAGE + '\n');
                return 2;
            }
            outDir = value;
        }
        else if (arg === '--force' || arg === '-f') {
            force = true;
        }
        else if (arg === '--recursive' || arg === '-r') {
            recursive = true;
        }
        else if (arg === '--yes' || arg === '-y') {
            yes = true;
        }
        else if (arg === '--help' || arg === '-h') {
            io.stdout(USAGE + '\n');
            return 0;
        }
        else if (arg.charAt(0) === '-' || input !== null) {
            io.stderr('unexpected argument: ' + arg + '\n\n' + USAGE + '\n');
            return 2;
        }
        else {
            input = arg;
        }
    }
    // -y: no questions at all (what is not given takes its default)
    const ask = yes ? undefined : io.ask;
    if (input === null) {
        input = ask ? (await ask('Directory of the published content (empty: the current directory): ')).trim() : '';
    }
    input = input || '.';
    if (outDir === null && ask) {
        // The published files found (by name: they are run when the plan is made), then where to write them
        let found;
        try {
            found = findPublished(input, recursive, cwd);
        }
        catch (e) {
            io.stderr((e instanceof Error ? e.message : String(e)) + '\n');
            return 2;
        }
        io.stdout('Published content in ' + relativePath(cwd, found.root) + ':\n');
        found.files.forEach(file => {
            io.stdout('  ' + relativePath(found.root, file) + '\n');
        });
        const answer = (await ask('Output directory (empty: ' + (recursive ? 'generated/ next to each published file' : relativePath(cwd, path__namespace.join(found.root, 'generated'))) + '): ')).trim();
        outDir = answer || null;
    }
    let plan;
    try {
        plan = await planGeneration({ input, outDir, recursive, force, cwd });
    }
    catch (e) {
        io.stderr((e instanceof Error ? e.message : String(e)) + '\n');
        return 2;
    }
    showPlan(plan, force, cwd, io);
    if (plan.contents.every(content => content.id === null)) {
        return 2;
    }
    const failed = plan.contents.some(content => content.problem !== null);
    if (plan.contents.every(content => content.problem !== null)) {
        io.stdout('Nothing to write.\n');
        return 1;
    }
    if (!yes) {
        // Nobody to ask (not a terminal): written only with -y
        if (!ask) {
            io.stdout('Nothing written: not run in a terminal, so nobody could be asked. Run with -y to write.\n');
            return 1;
        }
        const answer = (await ask('Write these? (y/N): ')).trim().toLowerCase();
        if (answer !== 'y' && answer !== 'yes') {
            io.stdout('Nothing written.\n');
            return 1;
        }
    }
    const result = writeGeneration(plan);
    io.stdout('Written: ' + result.written.length + ' file(s).\n');
    if (result.left.length) {
        io.stdout('Not written by this run (remove them if no longer needed):\n');
        result.left.forEach(file => {
            io.stdout('  ' + relativePath(cwd, file) + '\n');
        });
    }
    return failed ? 1 : 0;
}

exports.compositionId = compositionId;
exports.generate = generate;
exports.generateFromPublishedFile = generateFromPublishedFile;
exports.planGeneration = planGeneration;
exports.runCli = runCli;
exports.writeGeneration = writeGeneration;
//# sourceMappingURL=generator.cjs.js.map
