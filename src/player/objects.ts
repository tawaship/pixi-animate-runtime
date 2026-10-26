import * as PIXI from 'pixi.js';
import { DisplayObject, Container, IOwnedNode, NO_HIT_AREA } from './display';
import { Event } from './events';
import { Rectangle } from './geom';
import type { IGraphicsCommandDef, IDataMap, TDataValue } from './data';

/** Changes a geometry's reference count (Pixi 5 counts the Graphics showing it, and disposes of it at 0) */
function addReference(geometry: PIXI.GraphicsGeometry, delta: number): void {
	const count: number = Reflect.get(geometry, 'refCount');
	Reflect.set(geometry, 'refCount', count + delta);
}

export class PixiGraphics extends PIXI.Graphics implements IOwnedNode {
	owner: DisplayObject | null = null;

	/**
	 * Shows another (shared) geometry. Pixi 5 can share a geometry between
	 * Graphics (new Graphics(geometry), as clone() does) but has no way to
	 * change it afterwards, and does not declare the field that holds it; it is
	 * set by name here, and what Pixi derives from the geometry (the batches,
	 * their vertices and tint) is marked stale so it is built again.
	 */
	setGeometry(geometry: PIXI.GraphicsGeometry): void {
		const current = this.geometry;
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
	}

	/**
	 * Pixi 5's Graphics keeps the blend mode in the batches it builds, and
	 * builds them again only when the geometry changes: a blend mode set later
	 * would not be drawn. The batches are marked stale so they are built again.
	 */
	setBlendMode(mode: PIXI.BLEND_MODES): void {
		if (this.blendMode !== mode) {
			this.blendMode = mode;
			this.batchDirty = -1;
		}
	}
}

export class PixiSprite extends PIXI.Sprite implements IOwnedNode {
	owner: DisplayObject | null = null;
}

export class PixiText extends PIXI.Text implements IOwnedNode {
	owner: DisplayObject | null = null;
}

/**
 * Where a content's images come from: manifest images by id, and frames of
 * its sprite sheets (the images published code draws from a frame for a
 * bitmap fill).
 */
export interface ITextureSource {
	image(id: string): PIXI.Texture | null;
	frame(sheet: string, index: number): PIXI.Texture | null;
	imageAsset(id: string): IImageAsset | null;
	frameAsset(sheet: string, index: number): IImageAsset | null;
}

const NAMED_COLORS: { [name: string]: number } = {
	black: 0x000000, white: 0xffffff, red: 0xff0000, green: 0x008000, blue: 0x0000ff,
	yellow: 0xffff00, cyan: 0x00ffff, magenta: 0xff00ff, gray: 0x808080, grey: 0x808080
};

interface IColor {
	color: number;
	alpha: number;
}

/**
 * A CSS color as createjs writes it (#RGB, #RRGGBB, rgb(), rgba(), a few names).
 */
export function parseColor(value: TDataValue | undefined): IColor | null {
	if (typeof value !== 'string') {
		return null;
	}

	const text = value.trim().toLowerCase();
	if (text.charAt(0) === '#') {
		let hex = text.slice(1);
		if (hex.length === 3) {
			hex = hex.charAt(0) + hex.charAt(0) + hex.charAt(1) + hex.charAt(1) + hex.charAt(2) + hex.charAt(2);
		}
		const color = parseInt(hex.slice(0, 6), 16);
		return isNaN(color) ? null : { color, alpha: 1 };
	}

	const match = /^rgba?\(([^)]*)\)$/.exec(text);
	if (match) {
		const parts = match[1].split(',').map(part => parseFloat(part));
		const alpha = parts.length > 3 ? parts[3] : 1;
		return { color: ((parts[0] & 255) << 16) | ((parts[1] & 255) << 8) | (parts[2] & 255), alpha };
	}

	const named = NAMED_COLORS[text];
	return named === undefined ? null : { color: named, alpha: 1 };
}

function num(props: IDataMap, key: string): number {
	const value = props[key];
	return typeof value === 'number' ? value : 0;
}

function isDataMap(value: TDataValue | undefined): value is IDataMap {
	return value !== null && typeof value === 'object' && !Array.isArray(value);
}

const LINE_CAPS = [PIXI.LINE_CAP.BUTT, PIXI.LINE_CAP.ROUND, PIXI.LINE_CAP.SQUARE];
const LINE_JOINS = [PIXI.LINE_JOIN.MITER, PIXI.LINE_JOIN.ROUND, PIXI.LINE_JOIN.BEVEL];

function lineCap(value: TDataValue | undefined): PIXI.LINE_CAP {
	if (typeof value === 'number') {
		return LINE_CAPS[value] || PIXI.LINE_CAP.BUTT;
	}
	return value === 'round' ? PIXI.LINE_CAP.ROUND : value === 'square' ? PIXI.LINE_CAP.SQUARE : PIXI.LINE_CAP.BUTT;
}

function lineJoin(value: TDataValue | undefined): PIXI.LINE_JOIN {
	if (typeof value === 'number') {
		return LINE_JOINS[value] || PIXI.LINE_JOIN.MITER;
	}
	return value === 'round' ? PIXI.LINE_JOIN.ROUND : value === 'bevel' ? PIXI.LINE_JOIN.BEVEL : PIXI.LINE_JOIN.MITER;
}

const PATH_COMMANDS = ['MoveTo', 'LineTo', 'QuadraticCurveTo', 'BezierCurveTo', 'ArcTo', 'Arc', 'ClosePath', 'Rect', 'RoundRect', 'Circle', 'Ellipse', 'PolyStar'];

/**
 * A fill or stroke style as Pixi takes it.
 */
interface IPaint {
	color: number;
	alpha: number;
	texture: PIXI.Texture | null;
	matrix: PIXI.Matrix | null;
}

function paintOf(style: TDataValue | undefined, matrix: TDataValue | undefined, textures: ITextureSource): IPaint | null {
	const solid = parseColor(style);
	if (solid) {
		return { color: solid.color, alpha: solid.alpha, texture: null, matrix: null };
	}

	if (!isDataMap(style)) {
		return null;
	}

	if (style.type === 'bitmap') {
		const image = style.image;
		let texture: PIXI.Texture | null = null;
		if (isDataMap(image)) {
			if (typeof image.image === 'string') {
				texture = textures.image(image.image);
			} else if (typeof image.sheet === 'string' && typeof image.frame === 'number') {
				texture = textures.frame(image.sheet, image.frame);
			}
		}
		const m = isDataMap(matrix) ? new PIXI.Matrix(num(matrix, 'a'), num(matrix, 'b'), num(matrix, 'c'), num(matrix, 'd'), num(matrix, 'tx'), num(matrix, 'ty')) : null;
		return texture ? { color: 0xffffff, alpha: 1, texture, matrix: m } : null;
	}

	const gradient = gradientOf(style);
	if (!gradient) {
		return null;
	}
	const texture = gradientTexture(gradient);
	// A gradient canvas paints nothing with (a line of length 0, a circle of radius 0): nothing is drawn
	return texture ? { color: 0xffffff, alpha: 1, texture, matrix: texture.toShape } : { color: 0, alpha: 0, texture: null, matrix: null };
}

/**
 * A linear or radial gradient as createjs makes it (the props of a Fill or
 * Stroke style made by beginLinearGradientFill and the like): colors at
 * ratios along the line from (x0, y0) to (x1, y1), or between the circles
 * (x0, y0, r0) and (x1, y1, r1), in the shape's coordinates.
 */
export interface IGradient {
	type: 'linear' | 'radial';
	colors: string[];
	ratios: number[];
	x0: number;
	y0: number;
	r0: number;
	x1: number;
	y1: number;
	r1: number;
}

function gradientOf(style: IDataMap): IGradient | null {
	const type = style.type;
	const colors = style.colors;
	const ratios = style.ratios;
	if ((type !== 'linear' && type !== 'radial') || !Array.isArray(colors) || !Array.isArray(ratios)) {
		return null;
	}
	return {
		type,
		colors: colors.map(color => String(color)),
		ratios: ratios.map(ratio => Number(ratio)),
		x0: num(style, 'x0'), y0: num(style, 'y0'), r0: type === 'radial' ? num(style, 'r0') : 0,
		x1: num(style, 'x1'), y1: num(style, 'y1'), r1: type === 'radial' ? num(style, 'r1') : 0
	};
}

/** Pixels a gradient is drawn across: along the line of a linear one, across the circles of a radial one */
const GRADIENT_SIZE = 256;

/**
 * A gradient drawn into a canvas by the browser's own gradient (so its
 * colors are what canvas, and createjs, paints), as a texture that Pixi's
 * Graphics fills and strokes with through a matrix. `gradient` is the
 * gradient in the shape's coordinates, `local` the same gradient in the
 * texture's pixels, and `toShape` takes texture pixels to the shape's
 * coordinates. Outside the drawn area the texture's edge pixels repeat
 * (Pixi clamps), which is how canvas pads a gradient with its end colors.
 */
export class GradientTexture extends PIXI.Texture {
	readonly gradient: IGradient;
	readonly local: IGradient;
	readonly toShape: PIXI.Matrix;

	constructor(canvas: HTMLCanvasElement, gradient: IGradient, local: IGradient, toShape: PIXI.Matrix) {
		super(PIXI.BaseTexture.from(canvas));
		this.gradient = gradient;
		this.local = local;
		this.toShape = toShape;
	}
}

/** Gradient textures by their gradient, shared by every drawing that uses the same gradient */
const gradientTextures = new Map<string, GradientTexture | null>();

function gradientTexture(gradient: IGradient): GradientTexture | null {
	const key = JSON.stringify(gradient);
	const known = gradientTextures.get(key);
	if (known !== undefined) {
		return known;
	}
	const texture = gradient.type === 'linear' ? linearGradientTexture(gradient) : radialGradientTexture(gradient);
	gradientTextures.set(key, texture);
	return texture;
}

function paintGradient(canvas: HTMLCanvasElement, local: IGradient): void {
	const context = canvas.getContext('2d');
	if (!context) {
		return;
	}
	const paint = local.type === 'linear'
		? context.createLinearGradient(local.x0, local.y0, local.x1, local.y1)
		: context.createRadialGradient(local.x0, local.y0, local.r0, local.x1, local.y1, local.r1);
	local.colors.forEach((color, i) => {
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
function linearGradientTexture(gradient: IGradient): GradientTexture | null {
	const dx = gradient.x1 - gradient.x0;
	const dy = gradient.y1 - gradient.y0;
	const length = Math.sqrt(dx * dx + dy * dy);
	if (!length) {
		return null;
	}
	const canvas = document.createElement('canvas');
	canvas.width = GRADIENT_SIZE;
	canvas.height = 1;
	const local: IGradient = {
		type: 'linear', colors: gradient.colors, ratios: gradient.ratios,
		x0: 0, y0: 0, r0: 0, x1: GRADIENT_SIZE, y1: 0, r1: 0
	};
	paintGradient(canvas, local);
	const toShape = new PIXI.Matrix(dx / GRADIENT_SIZE, dy / GRADIENT_SIZE, -dy / length, dx / length, gradient.x0, gradient.y0);
	return new GradientTexture(canvas, gradient, local, toShape);
}

/**
 * A radial gradient drawn into a square canvas covering both of its circles,
 * scaled to fit (the mapping is a scale and a move, so the circles stay
 * circles and every point keeps its place in the gradient).
 */
function radialGradientTexture(gradient: IGradient): GradientTexture | null {
	const left = Math.min(gradient.x0 - gradient.r0, gradient.x1 - gradient.r1);
	const top = Math.min(gradient.y0 - gradient.r0, gradient.y1 - gradient.r1);
	const right = Math.max(gradient.x0 + gradient.r0, gradient.x1 + gradient.r1);
	const bottom = Math.max(gradient.y0 + gradient.r0, gradient.y1 + gradient.r1);
	const size = Math.max(right - left, bottom - top);
	if (!(size > 0) || gradient.r1 === gradient.r0 && gradient.x0 === gradient.x1 && gradient.y0 === gradient.y1) {
		return null;
	}
	const scale = GRADIENT_SIZE / size;
	const canvas = document.createElement('canvas');
	canvas.width = GRADIENT_SIZE;
	canvas.height = GRADIENT_SIZE;
	const local: IGradient = {
		type: 'radial', colors: gradient.colors, ratios: gradient.ratios,
		x0: (gradient.x0 - left) * scale, y0: (gradient.y0 - top) * scale, r0: gradient.r0 * scale,
		x1: (gradient.x1 - left) * scale, y1: (gradient.y1 - top) * scale, r1: gradient.r1 * scale
	};
	paintGradient(canvas, local);
	const toShape = new PIXI.Matrix(1 / scale, 0, 0, 1 / scale, left, top);
	return new GradientTexture(canvas, gradient, local, toShape);
}

function drawPath(target: PIXI.Graphics, command: IGraphicsCommandDef): void {
	const p = command.props;
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
			const w = num(p, 'w');
			const h = num(p, 'h');
			target.drawEllipse(num(p, 'x') + w / 2, num(p, 'y') + h / 2, w / 2, h / 2);
			break;
		}
		case 'PolyStar': {
			const sides = num(p, 'sides');
			const pointSize = num(p, 'pointSize');
			const radius = num(p, 'radius');
			const rotation = num(p, 'angle') / 180 * Math.PI;
			if (pointSize > 0 && pointSize < 1) {
				target.drawStar(num(p, 'x'), num(p, 'y'), sides, radius, radius * (1 - pointSize), rotation);
			} else {
				target.drawRegularPolygon(num(p, 'x'), num(p, 'y'), radius, sides, rotation);
			}
			break;
		}
	}
}

/**
 * A path and the paint that follows it. createjs keeps drawing commands the
 * way canvas draws: a path (BeginPath, then path commands), then the Fill
 * and/or Stroke that paint it.
 */
interface IPathSegment {
	path: IGraphicsCommandDef[];
	fill: IGraphicsCommandDef | null;
	stroke: IGraphicsCommandDef | null;
	strokeStyle: IDataMap | null;
}

function pathSegments(commands: IGraphicsCommandDef[]): IPathSegment[] {
	const segments: IPathSegment[] = [];
	let path: IGraphicsCommandDef[] = [];
	let fill: IGraphicsCommandDef | null = null;
	let stroke: IGraphicsCommandDef | null = null;
	let strokeStyle: IDataMap | null = null;
	let painted = false;

	const push = (): void => {
		if (path.length && (fill || stroke)) {
			segments.push({ path, fill, stroke, strokeStyle });
		}
	};

	commands.forEach(command => {
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
		} else if (command.type === 'Stroke') {
			stroke = command;
			painted = true;
		} else if (command.type === 'StrokeStyle') {
			strokeStyle = command.props;
		}
	});

	push();
	return segments;
}

/** A Pixi Graphics that draws a geometry once (for working out holes, and for the shared geometries) */
class GeometryBuilder extends PIXI.Graphics {
	finish(): void {
		this.finishPoly();
	}
}

let emptyGraphics: PIXI.Graphics | null = null;

/** The geometry of a shape with no drawing, shared (kept by a Graphics that is never destroyed) */
function getEmptyGeometry(): PIXI.GraphicsGeometry {
	if (!emptyGraphics) {
		emptyGraphics = new PIXI.Graphics();
	}
	return emptyGraphics.geometry;
}

/**
 * The subpaths of a filled path that cut holes: a subpath that starts inside
 * what the path's earlier subpaths cover (holes taken out) is a hole in it;
 * one that starts outside, or inside a hole, is a shape of its own. The
 * MoveTo commands that start holes are returned.
 */
function findHoles(path: IGraphicsCommandDef[]): IGraphicsCommandDef[] {
	const holes: IGraphicsCommandDef[] = [];
	const probe = new GeometryBuilder();
	probe.beginFill(0);
	let first = true;
	let inHole = false;

	path.forEach(command => {
		if (command.type === 'MoveTo') {
			if (!first) {
				probe.finish();
				const inside = probe.geometry.containsPoint(new PIXI.Point(num(command.props, 'x'), num(command.props, 'y')));
				if (inside) {
					holes.push(command);
					if (!inHole) {
						probe.beginHole();
						inHole = true;
					}
				} else if (inHole) {
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
function drawPathWithHoles(target: PIXI.Graphics, path: IGraphicsCommandDef[], holes: IGraphicsCommandDef[] | null): void {
	let inHole = false;
	path.forEach(command => {
		if (holes && command.type === 'MoveTo') {
			const hole = holes.indexOf(command) >= 0;
			if (hole && !inHole) {
				target.beginHole();
				inHole = true;
			} else if (!hole && inHole) {
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
export function drawCommands(target: PIXI.Graphics, commands: IGraphicsCommandDef[], textures: ITextureSource, holes?: IGraphicsCommandDef[] | null): void {
	target.clear();

	pathSegments(commands).forEach(segment => {
		const fill = segment.fill ? paintOf(segment.fill.props.style, segment.fill.props.matrix, textures) : null;
		const stroke = segment.stroke ? paintOf(segment.stroke.props.style, null, textures) : null;
		const strokeStyle = segment.strokeStyle;
		if (!fill && !stroke) {
			return;
		}
		if (stroke && strokeStyle) {
			target.lineTextureStyle({
				width: num(strokeStyle, 'width'),
				color: stroke.color,
				alpha: stroke.alpha,
				texture: stroke.texture || PIXI.Texture.WHITE,
				matrix: stroke.matrix || undefined,
				cap: lineCap(strokeStyle.caps),
				join: lineJoin(strokeStyle.joints),
				miterLimit: typeof strokeStyle.miterLimit === 'number' ? strokeStyle.miterLimit : 10
			});
		} else {
			target.lineStyle(0);
		}
		if (fill) {
			target.beginTextureFill({ texture: fill.texture || PIXI.Texture.WHITE, color: fill.color, alpha: fill.alpha, matrix: fill.matrix || undefined });
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
export class GraphicsCommand {
}

/** The createjs drawing command class names */
export const GRAPHICS_COMMANDS = [
	'MoveTo', 'LineTo', 'ArcTo', 'Arc', 'QuadraticCurveTo', 'BezierCurveTo', 'Rect', 'ClosePath', 'BeginPath',
	'Fill', 'Stroke', 'StrokeStyle', 'StrokeDash', 'RoundRect', 'Circle', 'Ellipse', 'PolyStar'
];

const COMMAND_CLASSES: { [type: string]: typeof GraphicsCommand } = {};
GRAPHICS_COMMANDS.forEach(type => {
	COMMAND_CLASSES[type] = class extends GraphicsCommand {};
});

const MATRIX_KEYS = ['a', 'b', 'c', 'd', 'tx', 'ty'];

/** A recorded command value as createjs holds it (images as image assets) */
type TCommandValue = string | number | boolean | null | IImageAsset | TCommandValue[] | ICommandValueMap;

interface ICommandValueMap {
	[key: string]: TCommandValue;
}

function toCommandValue(value: TDataValue, assets: ITextureSource): TCommandValue {
	if (Array.isArray(value)) {
		return value.map(v => toCommandValue(v, assets));
	}
	if (!isDataMap(value)) {
		return value;
	}
	const keys = Object.keys(value);
	if (keys.length === 1 && typeof value.image === 'string') {
		return assets.imageAsset(value.image);
	}
	if (keys.length === 2 && typeof value.sheet === 'string' && typeof value.frame === 'number') {
		return assets.frameAsset(value.sheet, value.frame);
	}
	const map: ICommandValueMap = {};
	if (keys.length === 6 && MATRIX_KEYS.every(key => typeof value[key] === 'number')) {
		MATRIX_KEYS.forEach(key => { map[key] = value[key]; });
		return map;
	}
	keys.forEach(key => { map[key] = toCommandValue(value[key], assets); });
	return map;
}

/**
 * Draws the path of createjs drawing commands filled, ignoring their fills
 * and strokes: the shape a createjs mask clips with (all the drawing as one
 * path, with the holes named by holes, see Graphics.maskHoles).
 */
export function drawMaskPath(target: PIXI.Graphics, commands: IGraphicsCommandDef[], holes?: IGraphicsCommandDef[] | null): void {
	target.clear();
	const path = commands.filter(command => PATH_COMMANDS.indexOf(command.type) >= 0);
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
export class Graphics {
	readonly commands: IGraphicsCommandDef[];
	readonly textures: ITextureSource;
	private _instructions: GraphicsCommand[] | null = null;
	private _holes: IGraphicsCommandDef[] | null = null;
	private _maskHoles: IGraphicsCommandDef[] | null = null;
	private _geometry: GeometryBuilder | null = null;
	private _maskGeometry: GeometryBuilder | null = null;

	constructor(commands: IGraphicsCommandDef[], textures: ITextureSource) {
		this.commands = commands;
		this.textures = textures;
	}

	/** The commands as createjs's command objects (made when first read) */
	get instructions(): GraphicsCommand[] {
		if (!this._instructions) {
			const assets = this.textures;
			this._instructions = this.commands.map(command => {
				const CommandClass = COMMAND_CLASSES[command.type] || GraphicsCommand;
				const instruction = new CommandClass();
				Object.keys(command.props).forEach(key => {
					const value = toCommandValue(command.props[key], assets);
					// A gradient or bitmap style object carries its arguments as props
					Reflect.set(instruction, key, key === 'style' && value !== null && typeof value === 'object' ? { props: value } : value);
				});
				return instruction;
			});
		}
		return this._instructions;
	}

	isEmpty(): boolean {
		return !this.commands.length;
	}

	/**
	 * The MoveTo commands that start holes in the filled paths (worked out once
	 * per drawing and shared by every shape that shows it)
	 */
	holes(): IGraphicsCommandDef[] {
		if (!this._holes) {
			const holes: IGraphicsCommandDef[] = [];
			pathSegments(this.commands).forEach(segment => {
				if (segment.fill) {
					findHoles(segment.path).forEach(command => holes.push(command));
				}
			});
			this._holes = holes;
		}
		return this._holes;
	}

	/**
	 * The drawing as a Pixi geometry, drawn the first time it is asked for and
	 * shared from then on by every shape that shows this drawing (a shape's
	 * Pixi node must therefore not be drawn into: that would change it for all)
	 */
	geometry(): PIXI.GraphicsGeometry {
		if (!this._geometry) {
			const builder = new GeometryBuilder();
			drawCommands(builder, this.commands, this.textures, this.holes());
			builder.finish();
			this._geometry = builder;
		}
		return this._geometry.geometry;
	}

	/** The drawing as a mask (its path filled), shared the same way */
	maskGeometry(): PIXI.GraphicsGeometry {
		if (!this._maskGeometry) {
			const builder = new GeometryBuilder();
			drawMaskPath(builder, this.commands, this.maskHoles());
			builder.finish();
			this._maskGeometry = builder;
		}
		return this._maskGeometry.geometry;
	}

	/** The holes of the drawing as a mask (all of it one path) */
	maskHoles(): IGraphicsCommandDef[] {
		if (!this._maskHoles) {
			this._maskHoles = findHoles(this.commands.filter(command => PATH_COMMANDS.indexOf(command.type) >= 0));
		}
		return this._maskHoles;
	}
}

GRAPHICS_COMMANDS.forEach(type => {
	Object.defineProperty(Graphics, type, { value: COMMAND_CLASSES[type], enumerable: true });
});

/**
 * createjs-compatible Shape on a Pixi Graphics.
 */
export class Shape extends DisplayObject {
	readonly pixiGraphics: PixiGraphics;
	private _graphics: Graphics | null = null;
	/** The shape as a mask (made when first used as one), a child of this shape's node */
	private _maskGraphics: PixiGraphics | null = null;

	constructor(graphics?: Graphics | null) {
		const node = new PixiGraphics(graphics ? graphics.geometry() : getEmptyGeometry());
		super(node);
		this.pixiGraphics = node;
		this._graphics = graphics || null;
	}

	get graphics(): Graphics | null {
		return this._graphics;
	}

	set graphics(value: Graphics | null) {
		if (value === this._graphics) {
			return;
		}
		this._graphics = value;
		this.pixiGraphics.setGeometry(value ? value.geometry() : getEmptyGeometry());
		if (this._maskGraphics) {
			this._maskGraphics.setGeometry(value ? value.maskGeometry() : getEmptyGeometry());
		}
		this._maskTargets.forEach(target => target._updatePixiMask());
	}

	_clipsAsMask(): boolean {
		return !!(this._graphics && !this._graphics.isEmpty());
	}

	_setBlendMode(mode: PIXI.BLEND_MODES): void {
		this.pixiGraphics.setBlendMode(mode);
	}

	/**
	 * createjs clips with the shape's path alone (Graphics.drawAsPath, then
	 * clip), whatever its fill and stroke; published masks are paths with no
	 * fill. The mask node is that path, filled. It is a child of the shape's
	 * node, so it moves with the shape (the shape's own node is not drawn while
	 * it serves as a mask).
	 */
	_pixiMaskNode(): PIXI.Container {
		let node = this._maskGraphics;
		if (!node) {
			node = this._maskGraphics = new PixiGraphics(this._graphics ? this._graphics.maskGeometry() : getEmptyGeometry());
			// Never hit by the pointer, as createjs never hits a mask
			node.hitArea = NO_HIT_AREA;
			this.pixiGraphics.addChild(node);
		}
		return node;
	}

	_releaseMaskNode(): void {
		const node = this._maskGraphics;
		if (node && !node.isMask) {
			node.renderable = false;
		}
	}

	toString(): string {
		return '[Shape (name=' + this.name + ')]';
	}
}

/**
 * A frame of a sprite sheet, as createjs describes it.
 */
export interface ISpriteFrame {
	image: IImageAsset;
	rect: Rectangle;
}

/**
 * An image as content sees it (`src` names it).
 */
export interface IImageAsset {
	src: string;
	texture: PIXI.Texture;
}

/**
 * createjs-compatible SpriteSheet: frames cut from an atlas image.
 */
export class SpriteSheet {
	readonly frames: ISpriteFrame[];
	readonly textures: PIXI.Texture[];
	framerate = 0;
	complete = true;

	constructor(image: IImageAsset, rects: number[][]) {
		this.frames = rects.map(rect => ({ image, rect: new Rectangle(rect[0], rect[1], rect[2], rect[3]) }));
		this.textures = this.frames.map(frame => new PIXI.Texture(image.texture.baseTexture, frame.rect.toPixi()));
	}

	getFrame(index: number): ISpriteFrame | null {
		return this.frames[index] || null;
	}

	getNumFrames(): number {
		return this.frames.length;
	}
}

/**
 * createjs-compatible Sprite (frame by frame from a sprite sheet).
 */
export class Sprite extends DisplayObject {
	readonly pixiSprite: PixiSprite;
	spriteSheet: SpriteSheet;
	currentFrame = 0;
	paused = false;
	framerate = 0;

	constructor(spriteSheet: SpriteSheet, frame?: number) {
		const node = new PixiSprite(PIXI.Texture.EMPTY);
		super(node);
		this.pixiSprite = node;
		this.spriteSheet = spriteSheet;
		if (frame != null) {
			this.gotoAndPlay(frame);
		}
	}

	play(): void { this.paused = false; }
	stop(): void { this.paused = true; }

	gotoAndPlay(frame: number): void {
		this.paused = false;
		this._goto(frame);
	}

	gotoAndStop(frame: number): void {
		this.paused = true;
		this._goto(frame);
	}

	advance(): void {
		const count = this.spriteSheet.getNumFrames();
		this._goto(count ? (this.currentFrame + 1) % count : 0);
	}

	_goto(frame: number): void {
		this.currentFrame = frame;
		const texture = this.spriteSheet.textures[frame];
		this.pixiSprite.texture = texture || PIXI.Texture.EMPTY;
	}

	_tick(event: Event): void {
		if (!this.paused) {
			this.advance();
		}
		super._tick(event);
	}

	_setBlendMode(mode: PIXI.BLEND_MODES): void {
		this.pixiSprite.blendMode = mode;
	}

	toString(): string {
		return '[Sprite (name=' + this.name + ')]';
	}
}

/**
 * createjs-compatible Bitmap.
 */
export class Bitmap extends DisplayObject {
	readonly pixiSprite: PixiSprite;
	private _image: IImageAsset | null = null;
	private _sourceRect: Rectangle | null = null;

	constructor(image?: IImageAsset | null) {
		const node = new PixiSprite(PIXI.Texture.EMPTY);
		super(node);
		this.pixiSprite = node;
		this.image = image || null;
	}

	get image(): IImageAsset | null { return this._image; }
	set image(value: IImageAsset | null) {
		this._image = value;
		this._updateTexture();
	}

	get sourceRect(): Rectangle | null { return this._sourceRect; }
	set sourceRect(value: Rectangle | null) {
		this._sourceRect = value;
		this._updateTexture();
	}

	private _updateTexture(): void {
		const image = this._image;
		if (!image) {
			this.pixiSprite.texture = PIXI.Texture.EMPTY;
			return;
		}
		const rect = this._sourceRect;
		this.pixiSprite.texture = rect ? new PIXI.Texture(image.texture.baseTexture, rect.toPixi()) : image.texture;
	}

	_setBlendMode(mode: PIXI.BLEND_MODES): void {
		this.pixiSprite.blendMode = mode;
	}

	toString(): string {
		return '[Bitmap (name=' + this.name + ')]';
	}
}

interface IFontParts {
	fontStyle: string;
	fontWeight: string;
	fontSize: number;
	fontFamily: string;
}

/**
 * The parts of a CSS font shorthand ("bold 20px 'Nirmala UI'").
 */
function parseFont(font: string): IFontParts {
	const match = /^\s*(.*?)\s*(\d+(?:\.\d+)?)px(?:\/\S+)?\s+(.+)$/.exec(font);
	if (!match) {
		return { fontStyle: 'normal', fontWeight: 'normal', fontSize: 10, fontFamily: 'sans-serif' };
	}
	const words = match[1].split(/\s+/);
	let fontStyle = 'normal';
	let fontWeight = 'normal';
	words.forEach(word => {
		if (word === 'italic' || word === 'oblique') {
			fontStyle = word;
		} else if (word === 'bold' || word === 'bolder' || word === 'lighter' || /^\d{3}$/.test(word)) {
			fontWeight = word;
		}
	});
	return { fontStyle, fontWeight, fontSize: parseFloat(match[2]), fontFamily: match[3].replace(/['"]/g, '') };
}

const TEXT_ANCHOR_X: { [align: string]: number } = { left: 0, start: 0, center: 0.5, right: 1, end: 1 };
const TEXT_ANCHOR_Y: { [baseline: string]: number } = { top: 0, hanging: 0, middle: 0.5, alphabetic: 0.8, ideographic: 0.9, bottom: 1 };

/**
 * createjs-compatible Text on a Pixi Text.
 */
export class Text extends DisplayObject {
	readonly pixiText: PixiText;
	private _text = '';
	private _font = '10px sans-serif';
	private _color = '#000';
	private _textAlign = 'left';
	private _textBaseline = 'top';
	private _lineHeight = 0;
	private _lineWidth: number | null = null;
	private _maxWidth: number | null = null;
	private _outline = 0;

	constructor(text?: string, font?: string, color?: string) {
		const node = new PixiText('');
		super(node);
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

	get text(): string { return this._text; }
	set text(value: string) { this._text = value; this._updateText(); }
	get font(): string { return this._font; }
	set font(value: string) { this._font = value; this._updateText(); }
	get color(): string { return this._color; }
	set color(value: string) { this._color = value; this._updateText(); }
	get textAlign(): string { return this._textAlign; }
	set textAlign(value: string) { this._textAlign = value; this._updateText(); }
	get textBaseline(): string { return this._textBaseline; }
	set textBaseline(value: string) { this._textBaseline = value; this._updateText(); }
	get lineHeight(): number { return this._lineHeight; }
	set lineHeight(value: number) { this._lineHeight = value; this._updateText(); }
	get lineWidth(): number | null { return this._lineWidth; }
	set lineWidth(value: number | null) { this._lineWidth = value; this._updateText(); }
	get maxWidth(): number | null { return this._maxWidth; }
	set maxWidth(value: number | null) { this._maxWidth = value; this._updateText(); }
	get outline(): number { return this._outline; }
	set outline(value: number) { this._outline = value; this._updateText(); }

	private _updateText(): void {
		const node = this.pixiText;
		const font = parseFont(this._font);
		const color = parseColor(this._color);
		node.text = this._text;
		node.style = new PIXI.TextStyle({
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
		const anchorX = TEXT_ANCHOR_X[this._textAlign];
		const anchorY = TEXT_ANCHOR_Y[this._textBaseline];
		node.anchor.set(anchorX === undefined ? 0 : anchorX, anchorY === undefined ? 0 : anchorY);
	}

	_setBlendMode(mode: PIXI.BLEND_MODES): void {
		this.pixiText.blendMode = mode;
	}

	toString(): string {
		return '[Text (text=' + this._text + ')]';
	}
}

/**
 * createjs-compatible ColorFilter on a Pixi ColorMatrixFilter.
 */
export class ColorFilter {
	readonly pixiFilter: PIXI.filters.ColorMatrixFilter;
	private _values: number[];

	constructor(redMultiplier?: number, greenMultiplier?: number, blueMultiplier?: number, alphaMultiplier?: number,
		redOffset?: number, greenOffset?: number, blueOffset?: number, alphaOffset?: number) {
		this.pixiFilter = new PIXI.filters.ColorMatrixFilter();
		this._values = [
			redMultiplier == null ? 1 : redMultiplier,
			greenMultiplier == null ? 1 : greenMultiplier,
			blueMultiplier == null ? 1 : blueMultiplier,
			alphaMultiplier == null ? 1 : alphaMultiplier,
			redOffset || 0, greenOffset || 0, blueOffset || 0, alphaOffset || 0
		];
		this._updateMatrix();
	}

	get redMultiplier(): number { return this._values[0]; }
	set redMultiplier(value: number) { this._set(0, value); }
	get greenMultiplier(): number { return this._values[1]; }
	set greenMultiplier(value: number) { this._set(1, value); }
	get blueMultiplier(): number { return this._values[2]; }
	set blueMultiplier(value: number) { this._set(2, value); }
	get alphaMultiplier(): number { return this._values[3]; }
	set alphaMultiplier(value: number) { this._set(3, value); }
	get redOffset(): number { return this._values[4]; }
	set redOffset(value: number) { this._set(4, value); }
	get greenOffset(): number { return this._values[5]; }
	set greenOffset(value: number) { this._set(5, value); }
	get blueOffset(): number { return this._values[6]; }
	set blueOffset(value: number) { this._set(6, value); }
	get alphaOffset(): number { return this._values[7]; }
	set alphaOffset(value: number) { this._set(7, value); }

	private _set(index: number, value: number): void {
		this._values[index] = value;
		this._updateMatrix();
	}

	private _updateMatrix(): void {
		const v = this._values;
		const m = this.pixiFilter.matrix;
		for (let i = 0; i < 20; i++) {
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
	}

	toString(): string {
		return '[ColorFilter]';
	}
}

/**
 * Members ButtonHelper needs from its target (a MovieClip).
 */
export interface IButtonTarget extends Container {
	paused: boolean;
	actionsEnabled: boolean;
	gotoAndPlay(frame: string | number): void;
	gotoAndStop(frame: string | number): void;
	_reset(): void;
}

/**
 * createjs-compatible ButtonHelper: sends its target to the out / over /
 * down frames on mouse events, and stops it on the out frame from the start.
 */
export class ButtonHelper {
	readonly target: IButtonTarget;
	overLabel: string | number;
	outLabel: string | number;
	downLabel: string | number;
	play: boolean;
	_isPressed = false;
	_isOver = false;
	_enabled = false;
	private _originalReset: (() => void) | null = null;

	constructor(target: IButtonTarget, outLabel?: string | number | null, overLabel?: string | number | null, downLabel?: string | number | null,
		play?: boolean, hitArea?: IButtonTarget | null, hitLabel?: string | number | null) {
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
	}

	get enabled(): boolean { return this._enabled; }
	set enabled(value: boolean) {
		if (value === this._enabled) {
			return;
		}
		const target = this.target;
		this._enabled = value;
		if (value) {
			target.cursor = 'pointer';
			target.addEventListener('rollover', this);
			target.addEventListener('rollout', this);
			target.addEventListener('mousedown', this);
			target.addEventListener('pressup', this);
			// The target keeps its paused state when its timeline resets it on re-entry
			const reset = target._reset;
			this._originalReset = reset;
			target._reset = function (): void {
				const paused = target.paused;
				reset.call(target);
				target.paused = paused;
			};
		} else {
			target.cursor = null;
			target.removeEventListener('rollover', this);
			target.removeEventListener('rollout', this);
			target.removeEventListener('mousedown', this);
			target.removeEventListener('pressup', this);
			const original = this._originalReset;
			if (original) {
				target._reset = original;
				this._originalReset = null;
			}
		}
	}

	handleEvent(event: Event): void {
		const type = event.type;
		let label: string | number;
		if (type === 'mousedown') {
			this._isPressed = true;
			label = this.downLabel;
		} else if (type === 'pressup') {
			this._isPressed = false;
			label = this._isOver ? this.overLabel : this.outLabel;
		} else if (type === 'rollover') {
			this._isOver = true;
			label = this._isPressed ? this.downLabel : this.overLabel;
		} else {
			this._isOver = false;
			label = this._isPressed ? this.overLabel : this.outLabel;
		}
		if (this.play) {
			this.target.gotoAndPlay(label);
		} else {
			this.target.gotoAndStop(label);
		}
	}

	toString(): string {
		return '[ButtonHelper]';
	}
}
