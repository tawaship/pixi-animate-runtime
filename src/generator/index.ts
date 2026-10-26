import * as path from 'path';
import { extractPublishedFile } from '@tawaship/animate-data-converter';
import type { IDefinition, IIssue, IMovieClipSymbolDef, IGraphicsDef, IMemberDef, IPropMapDef, ISlotDef, TDataValue, TFrameValue } from '@tawaship/animate-data-converter';
import { checkVersion } from '../player/semver';
import { VERSION } from '../player/version';
import { CONVERTER_RANGE, CONVERTER_KNOWN } from './converter-version';
import { SLOT_DEFAULTS, interpolated } from '../player/data';
import { easeOf, easeIds } from '../player/ease';
import type { IRuntimeData, IRuntimeMovieClipDef, IRuntimeSlotDef, TRuntimeSlotData, TRuntimeSlotRef, TRuntimeSymbolDef, TRuntimeFrameValue, TRuntimeFrameRef, IRuntimeGraphicsData, TRuntimeCommandKind } from '../player/data';

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
	/** Member writer function sources, by the index the data refers to them with */
	memberWriters: string[];
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
function interpolatedFrames(frames: TFrameValue[][], keyframes: number[]): { values: TFrameValue[][]; frames: TRuntimeFrameRef[] } {
	const values: TFrameValue[][] = [];
	const indexes = new Map<string, number>();
	const indexOf = (frame: TFrameValue[]): number => {
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
	const refs: TRuntimeFrameRef[] = [];
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
		} else {
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
function writtenFrames(props: string[], frames: TFrameValue[][], keyframes: number[]): { values: TRuntimeFrameValue[][]; frames: TRuntimeFrameRef[] } {
	const distinct = interpolatedFrames(frames, keyframes);
	const state = props.indexOf('state');
	return {
		frames: distinct.frames,
		values: distinct.values.map(frame => frame.map((value, i): TRuntimeFrameValue => {
			if (i !== state || !Array.isArray(value)) {
				return value;
			}
			return value.map(entry => entry.target.type === 'slot' && entry.props === null ? entry.target.slot : entry);
		}))
	};
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

/**
 * A slot's template as written in runtime content: the fields at their
 * defaults (SLOT_DEFAULTS) left out, the player filling them in. Its initial
 * values are not in it (the slot gives them).
 */
function slotTemplate(slot: ISlotDef, initWriter: number | null): TRuntimeSlotData {
	const { init, ...fields } = slot;
	const full: IRuntimeSlotDef = Object.assign({}, fields, { initWriter, initValues: null });
	const data: TRuntimeSlotData = { kind: full.kind };
	Object.keys(SLOT_DEFAULTS).forEach(key => {
		const value = Reflect.get(full, key);
		if (JSON.stringify(value) !== JSON.stringify(Reflect.get(SLOT_DEFAULTS, key))) {
			Reflect.set(data, key, value);
		}
	});
	return data;
}

/**
 * The drawings as written in runtime content: each command as the index of its
 * kind (its type and the names of its props, written once in commandKinds) and
 * its props' values, so that no name is written for every command.
 */
function writtenGraphics(list: IGraphicsDef[]): { graphics: IRuntimeGraphicsData[]; commandKinds: TRuntimeCommandKind[] } {
	const commandKinds: TRuntimeCommandKind[] = [];
	const indexes = new Map<string, number>();
	const graphics = list.map(def => ({
		commands: def.commands.map(command => {
			const names = Object.keys(command.props);
			const key = JSON.stringify([command.type, names]);
			let index = indexes.get(key);
			if (index === undefined) {
				index = commandKinds.push([command.type, names]) - 1;
				indexes.set(key, index);
			}
			const written: TDataValue[] = [index];
			return written.concat(names.map(name => command.props[name]));
		})
	}));
	return { graphics, commandKinds };
}

/** A table of values written once each, identical ones (compared as JSON) sharing one index */
class JsonTable<T> {
	readonly list: T[] = [];
	private readonly _indexes = new Map<string, number>();

	add(value: T): number {
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
const INIT_DEFAULTS: IPropMapDef = {
	x: 0, y: 0, scaleX: 1, scaleY: 1, rotation: 0, skewX: 0, skewY: 0, regX: 0, regY: 0,
	alpha: 1, visible: true, compositeOperation: null
};

/**
 * The initial values of a slot to write (those not at INIT_DEFAULTS), and the
 * writer that writes them: one assignment per property, the name written in
 * the code and the value taken from the values, so that slots setting the
 * same properties share one writer.
 */
function initWrite(init: IPropMapDef): { source: string; values: TFrameValue[] } | null {
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
function memberWriter(members: IMemberDef[]): string {
	return 'function (o, s) { ' + members.map(member => access(member.name) + ' = s[' + member.slot + '];').join(' ') + ' }';
}

/**
 * The content's drawing table: drawings with the same commands are one entry.
 * They are compared by their whole command list (no hash, so two different
 * drawings are never taken for one).
 */
class CodeTable {
	readonly list: string[] = [];
	private readonly _indexes = new Map<string, number>();

	/** The index of a function's source: functions written the same are one entry (they hold no state) */
	add(source: string): number {
		const known = this._indexes.get(source);
		if (known !== undefined) {
			return known;
		}
		this.list.push(source);
		this._indexes.set(source, this.list.length - 1);
		return this.list.length - 1;
	}
}

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

function convertMovieClip(def: IMovieClipSymbolDef, scripts: string[], writers: CodeTable, memberWriters: CodeTable, graphicsTable: GraphicsTable, slotTemplates: JsonTable<TRuntimeSlotData>): IRuntimeMovieClipDef {
	const add = (source: string): number => writers.add(source);
	return {
		kind: def.kind, id: def.id, nominalBounds: def.nominalBounds, frameBounds: def.frameBounds,
		defaults: def.defaults, labels: def.labels, duration: def.duration,
		// A slot is its template (shared by the slots that differ only in their initial values) and its initial values
		slots: def.slots.map((slot): TRuntimeSlotRef => {
			const write = initWrite(slot.init);
			const template = slotTemplates.add(slotTemplate(slot, write ? add(write.source) : null));
			return write ? [template, write.values] : template;
		}),
		memberWriter: def.members.length ? memberWriters.add(memberWriter(def.members)) : null,
		unmanaged: def.unmanaged, graphics: def.graphics.map(g => graphicsTable.add(g)), filterCacheList: def.filterCacheList,
		tweens: def.tweens.map(tween => Object.assign({
			target: tween.target, duration: tween.duration, props: tween.props,
			keyframes: tween.keyframes,
			actions: tween.actions.map(action => {
				scripts.push(action.source);
				return { position: action.position, script: scripts.length - 1, params: action.params };
			}),
			writer: tween.props.length ? add(tweenWriter(tween.props, tween.frames)) : null
		}, writtenFrames(tween.props, tween.frames, tween.keyframes)))
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
function runtimeContentSource(data: IRuntimeData, scripts: string[], writers: string[], memberWriters: string[], id: string, sourceName: string): string {
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
	// Writers written the same (the same values set, the same names given) are written once and shared
	const writers = new CodeTable();
	const memberWriters = new CodeTable();
	const graphicsTable = new GraphicsTable();
	const slotTemplates = new JsonTable<TRuntimeSlotData>();
	const symbols: { [id: string]: TRuntimeSymbolDef } = {};
	Object.keys(definition.symbols).forEach(key => {
		const def = definition.symbols[key];
		symbols[key] = def.kind === 'movieclip' ? convertMovieClip(def, scripts, writers, memberWriters, graphicsTable, slotTemplates) : def;
	});

	const data: IRuntimeData = {
		runtimeVersion: VERSION,
		properties: definition.properties,
		images: definition.manifest.filter(entry => IMAGE_SOURCE.test(entry.src)),
		spriteSheets: definition.spriteSheets,
		...writtenGraphics(graphicsTable.list),
		slotTemplates: slotTemplates.list,
		symbols
	};

	const source = runtimeContentSource(data, scripts, writers.list, memberWriters.list, id, sourceName || '(unknown)');
	return { id, data, scripts, writers: writers.list, memberWriters: memberWriters.list, source, issues: definition.issues, warnings };
}

/**
 * Extracts a published file and generates its runtime content.
 */
export function generateFromPublishedFile(publishedPath: string): IGenerated {
	return generate(extractPublishedFile(publishedPath), path.basename(publishedPath));
}

export { runCli } from './cli';
export type { ICliIO } from './cli';
