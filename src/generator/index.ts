import * as path from 'path';
import { extractPublishedFile } from '@tawaship/animate-data-converter';
import type { IDefinition, IIssue, IMovieClipSymbolDef, IGraphicsDef, IPropMapDef, TFrameValue } from '@tawaship/animate-data-converter';
import { checkVersion } from '../player/semver';
import { VERSION } from '../player/version';
import { CONVERTER_RANGE, CONVERTER_KNOWN } from './converter-version';
import type { IRuntimeData, IRuntimeMovieClipDef, TRuntimeSymbolDef } from '../player/data';

/** Manifest entries kept as images (sounds and other files are left out) */
const IMAGE_SOURCE = /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/i;

export interface IGenerated {
	/** The composition id the runtime content is registered under */
	id: string;
	/** The content's data (what the runtime content returns as `data`) */
	data: IRuntimeData;
	/** Frame script sources, by the index the data refers to them with */
	scripts: string[];
	/** Writer function sources, by the index the data refers to them with */
	writers: string[];
	/** The runtime content (JavaScript source) */
	source: string;
	/** Unsupported features the converter found */
	issues: IIssue[];
	/** Things to look at that did not stop the generation (a definition from a newer converter) */
	warnings: string[];
}

const IDENTIFIER = /^[A-Za-z_$][A-Za-z0-9_$]*$/;

/** A property access written out in code: o.name, or o["name"] for other names */
function access(name: string): string {
	return IDENTIFIER.test(name) ? 'o.' + name : 'o[' + JSON.stringify(name) + ']';
}

/** A recorded Graphics reference ({ graphics: n }): the value has to be resolved to the instance's Graphics */
function isGraphicsReference(value: TFrameValue): boolean {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

/**
 * The writer of a tween: one assignment per property, the name written in the
 * code (so the engine resolves each write once instead of looking a name up
 * on every frame). values[i] goes to props[i]; a property that ever holds a
 * Graphics reference goes through resolve.
 */
function tweenWriter(props: string[], frames: TFrameValue[][]): string {
	const lines = props.map((name, i) => {
		const resolved = frames.some(frame => isGraphicsReference(frame[i]));
		return access(name) + ' = ' + (resolved ? 'g(v[' + i + '])' : 'v[' + i + ']') + ';';
	});
	return 'function (o, v, g) { ' + lines.join(' ') + ' }';
}

/** The writer of a slot's initial values: the values written in the code */
function initWriter(init: IPropMapDef): string {
	const lines = Object.keys(init).filter(name => init[name] !== undefined).map(name => access(name) + ' = ' + JSON.stringify(init[name]) + ';');
	return 'function (o) { ' + lines.join(' ') + ' }';
}

/**
 * The content's drawing table: drawings with the same commands are one entry.
 * They are compared by their whole command list (no hash, so two different
 * drawings are never taken for one).
 */
class GraphicsTable {
	readonly list: IGraphicsDef[] = [];
	private readonly _indexes = new Map<string, number>();

	add(graphics: IGraphicsDef): number {
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

function convertMovieClip(def: IMovieClipSymbolDef, scripts: string[], writers: string[], graphicsTable: GraphicsTable): IRuntimeMovieClipDef {
	const add = (source: string): number => {
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
function runtimeContentSource(data: IRuntimeData, scripts: string[], writers: string[], id: string, sourceName: string): string {
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
function checkDefinition(definition: IDefinition): string[] {
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
export function compositionId(definition: IDefinition): string {
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
export function generate(definition: IDefinition, sourceName?: string): IGenerated {
	const warnings = checkDefinition(definition);
	const id = compositionId(definition);
	const scripts: string[] = [];
	const writers: string[] = [];
	const graphicsTable = new GraphicsTable();
	const symbols: { [id: string]: TRuntimeSymbolDef } = {};
	Object.keys(definition.symbols).forEach(key => {
		const def = definition.symbols[key];
		symbols[key] = def.kind === 'movieclip' ? convertMovieClip(def, scripts, writers, graphicsTable) : def;
	});

	const data: IRuntimeData = {
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
export function generateFromPublishedFile(publishedPath: string): IGenerated {
	return generate(extractPublishedFile(publishedPath), path.basename(publishedPath));
}

export { runCli } from './cli';
export type { ICliIO } from './cli';
