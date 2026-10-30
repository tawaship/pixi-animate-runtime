import * as fs from 'fs';
import * as path from 'path';
import { extractPublishedFile } from '@tawaship/animate-data-converter';
import type { IIssue } from '@tawaship/animate-data-converter';
import { generate, compositionId } from './generate';
import type { IGenerated } from './generate';

export interface IPlanOptions {
	/** A directory of published content (every published JavaScript file directly in it), or one published file */
	input: string;
	/**
	 * Where to write: each content below it, at the path of its published file
	 * from the input directory. Absent or null: generated/ next to each published file
	 */
	outDir?: string | null;
	/** Also look in the directories below the input directory (not node_modules, nor directories whose name starts with ".") */
	recursive?: boolean;
	/** Write runtime content even when the content uses unsupported features */
	force?: boolean;
	/** The directory relative paths are taken from (default: the current directory) */
	cwd?: string;
}

export interface IPlannedImage {
	/** The image file next to the published file */
	from: string;
	/** Where it is copied */
	to: string;
}

export interface IPlannedContent {
	/** The published file */
	published: string;
	/** Its path from the input directory ("/" separated) */
	name: string;
	/** The composition id it registers under; null when the published file could not be read */
	id: string | null;
	/** Where its runtime content is written */
	out: string;
	/** Whether a file is already there (writing replaces it) */
	exists: boolean;
	/** The images it uses, copied next to its runtime content at the same relative paths */
	images: IPlannedImage[];
	/** The runtime content (JavaScript source) that is written; null when it is not written */
	source: string | null;
	/** Unsupported features the content uses (written anyway only with force) */
	issues: IIssue[];
	/** Things to look at that did not stop the generation */
	warnings: string[];
	/** Why it is not written; null when it is */
	problem: string | null;
}

export interface IGenerationPlan {
	/** The directory the names are taken from: the input directory, or the directory of the input file */
	root: string;
	/** The output directory; null when each content goes into generated/ next to its published file */
	outDir: string | null;
	/** Every published file found, in order */
	contents: IPlannedContent[];
	/** Files already in the output directories; the ones the plan does not write are left as they are */
	existing: string[];
}

export interface IWriteResult {
	/** The files written (runtime content and images) */
	written: string[];
	/** The files already in the output directories that were not written (nothing is deleted) */
	left: string[];
}

/** Whether a JavaScript file is Animate HTML5 Canvas output (it registers a composition) */
function isPublished(file: string): boolean {
	return /\.compositions\s*\[/.test(fs.readFileSync(file, 'utf8'));
}

function publishedFiles(dir: string): string[] {
	return fs.readdirSync(dir, { withFileTypes: true })
		.filter(entry => entry.isFile() && /\.js$/i.test(entry.name))
		.map(entry => path.join(dir, entry.name))
		.filter(isPublished)
		.sort();
}

/** Directories the recursive search does not enter: packages, and hidden ones (.git and the like) */
function isSkipped(name: string): boolean {
	return name === 'node_modules' || name.charAt(0) === '.';
}

/** The published files in a directory and in the directories below it */
function publishedFilesBelow(dir: string): string[] {
	const files = publishedFiles(dir);
	fs.readdirSync(dir, { withFileTypes: true })
		.filter(entry => entry.isDirectory() && !isSkipped(entry.name))
		.map(entry => entry.name)
		.sort()
		.forEach(name => {
			publishedFilesBelow(path.join(dir, name)).forEach(file => files.push(file));
		});
	return files;
}

/** The local file of an image path of the manifest (its query and hash left out), or null for a URL that is not a file */
function localImagePath(src: string): string | null {
	if (/^(data:|blob:|[a-z][a-z0-9+.-]*:\/\/)/i.test(src) || src.charAt(0) === '/') {
		return null;
	}
	return src.split('#')[0].split('?')[0];
}

/** Whether a relative path stays inside a directory (not absolute, and not leading up out of it) */
function isBelow(dir: string, relativePath: string): boolean {
	if (path.isAbsolute(relativePath)) {
		return false;
	}
	const fromDir = path.relative(dir, path.resolve(dir, relativePath));
	return fromDir !== '' && !fromDir.startsWith('..') && !path.isAbsolute(fromDir);
}

function listFiles(dir: string): string[] {
	if (!fs.existsSync(dir)) {
		return [];
	}
	const files: string[] = [];
	fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			listFiles(full).forEach(file => files.push(file));
		} else {
			files.push(full);
		}
	});
	return files;
}

/** A path from a directory, "/" separated */
export function relativePath(from: string, file: string): string {
	return path.relative(from, file).split(path.sep).join('/') || '.';
}

/**
 * The published files an input names, and the directory their names are
 * taken from. Only reads the files (nothing is run). Throws when the input
 * does not exist or has no published file.
 */
export function findPublished(input: string, recursive?: boolean, cwd?: string): { root: string; files: string[] } {
	const inputPath = path.resolve(cwd || process.cwd(), input);
	if (!fs.existsSync(inputPath)) {
		throw new Error('not found: ' + inputPath);
	}
	const single = fs.statSync(inputPath).isFile();
	const files = single ? [inputPath] : recursive ? publishedFilesBelow(inputPath) : publishedFiles(inputPath);
	if (!files.length) {
		throw new Error('no published content (Animate HTML5 Canvas JavaScript) in ' + inputPath + (recursive ? ' or below it' : ''));
	}
	return { root: single ? path.dirname(inputPath) : inputPath, files };
}

/** The local images a generated content uses (paths from its published directory), and why it cannot be written if it cannot */
function imagesOf(generated: IGenerated, publishedDir: string): { images: string[]; problem: string | null } {
	const images: string[] = [];
	const missing: string[] = [];
	const outside: string[] = [];
	generated.data.images.forEach(entry => {
		const local = localImagePath(entry.src);
		if (local === null) {
			return;
		}
		// Animate writes image paths relative to the published file, below its directory: a path
		// that leads elsewhere (up out of it, or absolute) is neither read nor copied
		if (!isBelow(publishedDir, local)) {
			outside.push(entry.src);
		} else if (fs.existsSync(path.join(publishedDir, local))) {
			images.push(local);
		} else {
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
export async function planGeneration(options: IPlanOptions): Promise<IGenerationPlan> {
	const cwd = options.cwd || process.cwd();
	const found = findPublished(options.input, options.recursive, cwd);
	const root = found.root;
	const outRoot = options.outDir !== undefined && options.outDir !== null ? path.resolve(cwd, options.outDir) : null;
	// Below the output directory at the path of its published file from the root, or into generated/ next to its published file
	const outDirOf = (file: string): string => outRoot !== null ? path.join(outRoot, path.relative(root, path.dirname(file))) : path.join(path.dirname(file), 'generated');
	if (found.files.some(file => path.resolve(outDirOf(file)) === path.resolve(path.dirname(file)))) {
		throw new Error('the output directory is the published directory: runtime content would overwrite the published files of the same names');
	}

	const contents: IPlannedContent[] = [];
	// One after another: each is run in a sandbox of its own
	for (const file of found.files) {
		const outDir = outDirOf(file);
		const out = path.join(outDir, path.basename(file));
		const content: IPlannedContent = {
			published: file,
			name: relativePath(root, file),
			id: null,
			out,
			exists: fs.existsSync(out),
			images: [],
			source: null,
			issues: [],
			warnings: [],
			problem: null
		};
		contents.push(content);
		try {
			const definition = await extractPublishedFile(file);
			content.id = compositionId(definition);
			const generated = generate(definition, path.basename(file));
			content.issues = generated.issues;
			content.warnings = generated.warnings;
			const images = imagesOf(generated, path.dirname(file));
			content.images = images.images.map(image => ({ from: path.join(path.dirname(file), image), to: path.join(outDir, image) }));
			if (generated.issues.length && !options.force) {
				content.problem = generated.issues.length + ' unsupported feature(s)';
			} else if (images.problem !== null) {
				content.problem = images.problem;
			} else {
				content.source = generated.source;
			}
		} catch (e) {
			content.problem = (content.id === null ? 'could not read: ' : '') + (e instanceof Error ? e.message : String(e));
		}
	}

	const existing: string[] = [];
	(outRoot !== null ? [outRoot] : contents.map(content => path.dirname(content.out)).filter((dir, i, all) => all.indexOf(dir) === i)).forEach(dir => {
		listFiles(dir).forEach(file => existing.push(file));
	});
	return { root, outDir: outRoot, contents, existing };
}

/**
 * Writes a plan made by {@link planGeneration}: the runtime content it made
 * (as it was when the plan was made) and copies of the images. The contents
 * with a problem are not written. Nothing is deleted.
 */
export function writeGeneration(plan: IGenerationPlan): IWriteResult {
	const written: { [file: string]: boolean } = {};
	const files: string[] = [];
	const add = (file: string): void => {
		written[path.resolve(file)] = true;
		files.push(file);
	};
	plan.contents.forEach(content => {
		if (content.source === null || content.problem !== null) {
			return;
		}
		fs.mkdirSync(path.dirname(content.out), { recursive: true });
		fs.writeFileSync(content.out, content.source);
		add(content.out);
		content.images.forEach(image => {
			if (!written[path.resolve(image.to)]) {
				fs.mkdirSync(path.dirname(image.to), { recursive: true });
				fs.copyFileSync(image.from, image.to);
				add(image.to);
			}
		});
	});
	return { written: files, left: plan.existing.filter(file => !written[path.resolve(file)]) };
}
