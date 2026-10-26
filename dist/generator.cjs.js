/*!
 * @tawaship/pixi-animate-runtime - v0.0.0
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
const VERSION = "0.0.0";

/**
 * The animate-data-converter versions this generator reads definitions of:
 * the range this package depends on, and the version it was built with
 * (written in from package.json when the package is built).
 */
const CONVERTER_RANGE = "^0.0.0";
const CONVERTER_KNOWN = "0.0.0";

const USAGE = [
    'Usage: pixi-animate-runtime [<published directory or file>] [--out-dir <directory>] [--force]',
    '',
    '  <published directory>  a directory Animate published HTML5 Canvas content into: every published',
    '                         JavaScript file directly in it is turned into runtime content',
    '  <published file>       one published JavaScript file',
    '  --out-dir <directory>  where to write (default: generated/ in the published directory)',
    '  --force                write runtime content even when the content uses unsupported features',
    '',
    'Each runtime content file gets the name of its published file, and the images it uses are copied',
    'next to it at the same relative paths. Nothing is ever deleted: files already in the output',
    'directory that this run did not write are listed. Asked for the directories when run in a',
    'terminal without them.'
].join('\n');
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
/** The local file of an image path of the manifest (its query and hash left out), or null for a URL that is not a file */
function localImagePath(src) {
    if (/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(src) || src.charAt(0) === '/') {
        return null;
    }
    return src.split('#')[0].split('?')[0];
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
function relative(from, file) {
    return path__namespace.relative(from, file).split(path__namespace.sep).join('/') || '.';
}
/**
 * The command line tool. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or the user declined, 2 for
 * usage and loading errors.
 */
async function runCli(args, io) {
    const cwd = io.cwd || process.cwd();
    let input = null;
    let outDirArg = null;
    let force = false;
    for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--out-dir') {
            const value = args[++i];
            if (value === undefined) {
                io.stderr('--out-dir needs a directory\n\n' + USAGE + '\n');
                return 2;
            }
            outDirArg = value;
        }
        else if (arg === '--force') {
            force = true;
        }
        else if (arg === '--help' || arg === '-h') {
            io.stdout(USAGE + '\n');
            return 0;
        }
        else if (arg.indexOf('--') === 0 || input !== null) {
            io.stderr('unexpected argument: ' + arg + '\n\n' + USAGE + '\n');
            return 2;
        }
        else {
            input = arg;
        }
    }
    if (input === null) {
        input = io.ask ? (await io.ask('Directory of the published content (empty: the current directory): ')).trim() : '';
    }
    const inputPath = path__namespace.resolve(cwd, input || '.');
    if (!fs__namespace.existsSync(inputPath)) {
        io.stderr('not found: ' + inputPath + '\n');
        return 2;
    }
    const single = fs__namespace.statSync(inputPath).isFile();
    const publishedDir = single ? path__namespace.dirname(inputPath) : inputPath;
    const files = single ? [inputPath] : publishedFiles(inputPath);
    if (!files.length) {
        io.stderr('no published content (Animate HTML5 Canvas JavaScript) in ' + inputPath + '\n');
        return 2;
    }
    const sources = [];
    let failed = false;
    files.forEach(file => {
        try {
            const definition = animateDataConverter.extractPublishedFile(file);
            sources.push({ file, definition, id: compositionId(definition) });
        }
        catch (e) {
            io.stderr('could not read ' + relative(cwd, file) + ': ' + (e instanceof Error ? e.message : String(e)) + '\n');
            failed = true;
        }
    });
    if (!sources.length) {
        return 2;
    }
    io.stdout('Published content in ' + relative(cwd, publishedDir) + ':\n');
    sources.forEach(source => {
        io.stdout('  ' + path__namespace.basename(source.file) + '  (composition id ' + source.id + ')\n');
    });
    const byId = {};
    sources.forEach(source => {
        (byId[source.id] = byId[source.id] || []).push(path__namespace.basename(source.file));
    });
    Object.keys(byId).filter(id => byId[id].length > 1).forEach(id => {
        io.stdout('note: ' + byId[id].join(', ') + ' share composition id ' + id + ' (loaded on one page, the later replaces the earlier)\n');
    });
    const defaultOut = path__namespace.join(publishedDir, 'generated');
    let outDir = outDirArg !== null ? path__namespace.resolve(cwd, outDirArg) : defaultOut;
    let chosen = false;
    if (outDirArg === null && io.ask) {
        const answer = (await io.ask('Output directory (empty: ' + relative(cwd, defaultOut) + '): ')).trim();
        if (answer) {
            outDir = path__namespace.resolve(cwd, answer);
            chosen = true;
        }
    }
    if (path__namespace.resolve(outDir) === path__namespace.resolve(publishedDir)) {
        io.stderr('the output directory is the published directory: runtime content would overwrite the published files of the same names\n');
        return 2;
    }
    if (chosen && io.ask && listFiles(outDir).length) {
        const answer = (await io.ask(relative(cwd, outDir) + ' is not empty. Overwrite the files written there? (y/N): ')).trim().toLowerCase();
        if (answer !== 'y' && answer !== 'yes') {
            io.stdout('Nothing written.\n');
            return 1;
        }
    }
    const before = listFiles(outDir);
    const written = {};
    sources.forEach(source => {
        const name = path__namespace.basename(source.file);
        let generated;
        try {
            generated = generate(source.definition, name);
        }
        catch (e) {
            io.stderr(name + ': ' + (e instanceof Error ? e.message : String(e)) + '\n');
            failed = true;
            return;
        }
        generated.warnings.forEach(warning => {
            io.stderr(name + ': warning: ' + warning + '\n');
        });
        if (generated.issues.length) {
            generated.issues.forEach(issue => {
                io.stderr(name + ': unsupported: ' + (issue.symbol ? issue.symbol : '(content)') + (issue.slot !== null ? ' slot ' + issue.slot : '') + ': ' + issue.message + '\n');
            });
            if (!force) {
                io.stderr(name + ': not written (' + generated.issues.length + ' unsupported feature(s); --force writes it anyway)\n');
                failed = true;
                return;
            }
        }
        const images = [];
        const missing = [];
        generated.data.images.forEach(entry => {
            const local = localImagePath(entry.src);
            if (local === null) {
                return;
            }
            if (fs__namespace.existsSync(path__namespace.join(publishedDir, local))) {
                images.push(local);
            }
            else {
                missing.push(entry.src);
            }
        });
        if (missing.length) {
            io.stderr(name + ': not written: images it uses are missing: ' + missing.join(', ') + '\n');
            failed = true;
            return;
        }
        fs__namespace.mkdirSync(outDir, { recursive: true });
        const target = path__namespace.join(outDir, name);
        fs__namespace.writeFileSync(target, generated.source);
        written[path__namespace.resolve(target)] = true;
        images.forEach(image => {
            const to = path__namespace.join(outDir, image);
            if (!written[path__namespace.resolve(to)]) {
                fs__namespace.mkdirSync(path__namespace.dirname(to), { recursive: true });
                fs__namespace.copyFileSync(path__namespace.join(publishedDir, image), to);
                written[path__namespace.resolve(to)] = true;
            }
        });
        io.stdout(name + ' -> ' + relative(cwd, target) + '  (composition id ' + generated.id + (images.length ? ', ' + images.length + ' image(s)' : '') + ')\n');
    });
    const left = before.filter(file => !written[path__namespace.resolve(file)]);
    if (left.length) {
        io.stdout('Not written by this run (remove them if no longer needed):\n');
        left.forEach(file => {
            io.stdout('  ' + relative(cwd, file) + '\n');
        });
    }
    return failed ? 1 : 0;
}

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
function runtimeContentSource(data, scripts, writers, id, sourceName) {
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
    const id = compositionId(definition);
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
    const source = runtimeContentSource(data, scripts, writers, id, sourceName || '(unknown)');
    return { id, data, scripts, writers, source, issues: definition.issues, warnings };
}
/**
 * Extracts a published file and generates its runtime content.
 */
function generateFromPublishedFile(publishedPath) {
    return generate(animateDataConverter.extractPublishedFile(publishedPath), path__namespace.basename(publishedPath));
}

exports.compositionId = compositionId;
exports.generate = generate;
exports.generateFromPublishedFile = generateFromPublishedFile;
exports.runCli = runCli;
//# sourceMappingURL=generator.cjs.js.map
