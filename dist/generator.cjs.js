/*!
 * @tawaship/pixi-animate-runtime - v0.0.0
 * 
 * @author tawaship (makazu.mori@gmail.com)
 * @license MIT
 */

'use strict';

var fs = require('fs');
var path = require('path');
var animateDataConverter = require('@tawaship/animate-data-converter');

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

var fs__namespace = /*#__PURE__*/_interopNamespaceDefault(fs);
var path__namespace = /*#__PURE__*/_interopNamespaceDefault(path);

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
const VERSION = "0.0.0";

/**
 * The animate-data-converter versions this generator reads definitions of:
 * the range this package depends on, and the version it was built with
 * (written in from package.json when the package is built).
 */
const CONVERTER_RANGE = "^0.0.0";
const CONVERTER_KNOWN = "0.0.0";

/** Manifest entries kept as images (sounds and other files are left out) */
const IMAGE_SOURCE = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;
const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
/** A property access written out in code: o.name, or o["name"] for other names */
function access(name) {
    return IDENTIFIER.test(name) ? 'o.' + name : 'o[' + JSON.stringify(name) + ']';
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
/** The writer of a slot's initial values: the values written in the code */
function initWriter(init) {
    const lines = Object.keys(init).filter(name => init[name] !== undefined).map(name => access(name) + ' = ' + JSON.stringify(init[name]) + ';');
    return 'function (o) { ' + lines.join(' ') + ' }';
}
/**
 * The content's drawing table: drawings with the same commands are one entry.
 * They are compared by their whole command list (no hash, so two different
 * drawings are never taken for one).
 */
class GraphicsTable {
    constructor() {
        this.list = [];
        this._indexes = new Map();
    }
    add(graphics) {
        const key = JSON.stringify(graphics.commands);
        const known = this._indexes.get(key);
        if (known !== undefined) {
            return known;
        }
        this.list.push(graphics);
        this._indexes.set(key, this.list.length - 1);
        return this.list.length - 1;
    }
}
function convertMovieClip(def, scripts, writers, graphicsTable) {
    const add = (source) => {
        writers.push(source);
        return writers.length - 1;
    };
    return {
        kind: def.kind, id: def.id, nominalBounds: def.nominalBounds, frameBounds: def.frameBounds,
        defaults: def.defaults, labels: def.labels, duration: def.duration,
        slots: def.slots.map(slot => {
            const keys = Object.keys(slot.init);
            return Object.assign({}, slot, { initWriter: keys.length ? add(initWriter(slot.init)) : null });
        }),
        members: def.members, unmanaged: def.unmanaged, graphics: def.graphics.map(g => graphicsTable.add(g)), filterCacheList: def.filterCacheList,
        tweens: def.tweens.map(tween => ({
            target: tween.target, duration: tween.duration, props: tween.props, frames: tween.frames,
            keyframes: tween.keyframes,
            actions: tween.actions.map(action => {
                scripts.push(action.source);
                return { position: action.position, script: scripts.length - 1, params: action.params };
            }),
            writer: tween.props.length ? add(tweenWriter(tween.props, tween.frames)) : null
        }))
    };
}
/**
 * The runtime content: a factory that takes the names frame scripts refer
 * to (cjs, createjs, lib, exportRoot, stage, playSound) and returns the data,
 * the scripts and the writers. The scripts are written as code, as published
 * (not rewritten), and the writers are code too, so no code is compiled at
 * run time. Loaded as a CommonJS
 * module it is the export; loaded as a script it registers itself under
 * `PixiAnimateRuntimeContents[<id>]`.
 */
function runtimeContentSource(data, scripts, writers, id) {
    return [
        '/* Generated by @tawaship/pixi-animate-runtime from Adobe Animate HTML5 Canvas output. */',
        '(function (root, factory) {',
        '\tif (typeof module === "object" && module.exports) { module.exports = factory; }',
        '\telse { (root.PixiAnimateRuntimeContents = root.PixiAnimateRuntimeContents || {})[' + JSON.stringify(id) + '] = factory; }',
        '})(this, function (cjs, createjs, lib, exportRoot, stage, playSound) {',
        '\treturn {',
        '\t\tdata: ' + JSON.stringify(data) + ',',
        '\t\tscripts: [',
        scripts.map(script => '\t\t\t' + script).join(',\n'),
        '\t\t],',
        '\t\twriters: [',
        writers.map(writer => '\t\t\t' + writer).join(',\n'),
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
/**
 * Generates the runtime content of a content from its extracted definition.
 */
function generate(definition, id) {
    const warnings = checkDefinition(definition);
    const scripts = [];
    const writers = [];
    const graphicsTable = new GraphicsTable();
    const symbols = {};
    Object.keys(definition.symbols).forEach(key => {
        const def = definition.symbols[key];
        symbols[key] = def.kind === 'movieclip' ? convertMovieClip(def, scripts, writers, graphicsTable) : def;
    });
    const data = {
        runtimeVersion: VERSION,
        properties: definition.properties,
        images: definition.manifest.filter(entry => IMAGE_SOURCE.test(entry.src)),
        spriteSheets: definition.spriteSheets,
        graphics: graphicsTable.list,
        symbols
    };
    const contentId = id || String(definition.properties.id || 'content');
    return { data, scripts, writers, source: runtimeContentSource(data, scripts, writers, contentId), issues: definition.issues, warnings };
}
/**
 * Extracts a published file and generates its runtime content.
 */
function generateFromPublishedFile(publishedPath) {
    return generate(animateDataConverter.extractPublishedFile(publishedPath), path__namespace.basename(publishedPath, '.js'));
}
const USAGE = [
    'Usage: pixi-animate-runtime <published.js> [--out <content.js>] [--force]',
    '',
    '  <published.js>    the JavaScript file Animate published for HTML5 Canvas',
    '  --out <file>      where to write the runtime content (standard output when omitted)',
    '  --force           write the runtime content even when the content uses unsupported features'
].join('\n');
/**
 * The command line tool. Returns the exit code: 0 when the runtime content was
 * written, 1 when the content uses unsupported features (listed; nothing is
 * written unless --force), 2 for usage and loading errors.
 */
function runCli(args, io) {
    let published = null;
    let out = null;
    let force = false;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--out') {
            const value = args[++i];
            if (value === undefined) {
                io.stderr('--out needs a file\n\n' + USAGE + '\n');
                return 2;
            }
            out = value;
        }
        else if (arg === '--force') {
            force = true;
        }
        else if (arg.indexOf('--') === 0 || published !== null) {
            io.stderr('unexpected argument: ' + arg + '\n\n' + USAGE + '\n');
            return 2;
        }
        else {
            published = arg;
        }
    }
    if (published === null) {
        io.stderr('no published file given\n\n' + USAGE + '\n');
        return 2;
    }
    let generated;
    try {
        generated = generateFromPublishedFile(published);
    }
    catch (e) {
        io.stderr('could not load ' + published + ': ' + (e instanceof Error ? e.message : String(e)) + '\n');
        return 2;
    }
    generated.warnings.forEach(warning => {
        io.stderr('warning: ' + warning + '\n');
    });
    generated.issues.forEach(issue => {
        io.stderr('unsupported: ' + (issue.symbol ? issue.symbol : '(content)') + (issue.slot !== null ? ' slot ' + issue.slot : '') + ': ' + issue.message + '\n');
    });
    if (generated.issues.length && !force) {
        io.stderr(generated.issues.length + ' unsupported feature(s); nothing written (use --force to write anyway)\n');
        return 1;
    }
    if (out) {
        fs__namespace.writeFileSync(out, generated.source);
    }
    else {
        io.stdout(generated.source);
    }
    return generated.issues.length ? 1 : 0;
}

exports.generate = generate;
exports.generateFromPublishedFile = generateFromPublishedFile;
exports.runCli = runCli;
//# sourceMappingURL=generator.cjs.js.map
