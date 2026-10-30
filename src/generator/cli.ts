import * as fs from 'fs';
import * as path from 'path';
import { extractPublishedFile } from '@tawaship/animate-data-converter';
import type { IDefinition } from '@tawaship/animate-data-converter';
import { generate, compositionId } from './generate';
import type { IGenerated } from './generate';

export interface ICliIO {
	stdout(text: string): void;
	stderr(text: string): void;
	/** Asks a question and gives the answer; absent when nobody can answer (not a terminal) */
	ask?(question: string): Promise<string>;
	/** The directory relative paths are taken from */
	cwd?: string;
}

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

function relative(from: string, file: string): string {
	return path.relative(from, file).split(path.sep).join('/') || '.';
}

interface ISource {
	file: string;
	definition: IDefinition;
	id: string;
}

/**
 * The command line tool. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or the user declined, 2 for
 * usage and loading errors.
 */
export async function runCli(args: string[], io: ICliIO): Promise<number> {
	const cwd = io.cwd || process.cwd();
	let input: string | null = null;
	let outDirArg: string | null = null;
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
		} else if (arg === '--force') {
			force = true;
		} else if (arg === '--help' || arg === '-h') {
			io.stdout(USAGE + '\n');
			return 0;
		} else if (arg.indexOf('--') === 0 || input !== null) {
			io.stderr('unexpected argument: ' + arg + '\n\n' + USAGE + '\n');
			return 2;
		} else {
			input = arg;
		}
	}

	if (input === null) {
		input = io.ask ? (await io.ask('Directory of the published content (empty: the current directory): ')).trim() : '';
	}
	const inputPath = path.resolve(cwd, input || '.');
	if (!fs.existsSync(inputPath)) {
		io.stderr('not found: ' + inputPath + '\n');
		return 2;
	}
	const single = fs.statSync(inputPath).isFile();
	const publishedDir = single ? path.dirname(inputPath) : inputPath;
	const files = single ? [inputPath] : publishedFiles(inputPath);
	if (!files.length) {
		io.stderr('no published content (Animate HTML5 Canvas JavaScript) in ' + inputPath + '\n');
		return 2;
	}

	const sources: ISource[] = [];
	let failed = false;
	// One after another: each is run in a sandbox of its own
	for (const file of files) {
		try {
			const definition = await extractPublishedFile(file);
			sources.push({ file, definition, id: compositionId(definition) });
		} catch (e) {
			io.stderr('could not read ' + relative(cwd, file) + ': ' + (e instanceof Error ? e.message : String(e)) + '\n');
			failed = true;
		}
	}
	if (!sources.length) {
		return 2;
	}
	io.stdout('Published content in ' + relative(cwd, publishedDir) + ':\n');
	sources.forEach(source => {
		io.stdout('  ' + path.basename(source.file) + '  (composition id ' + source.id + ')\n');
	});
	const byId: { [id: string]: string[] } = {};
	sources.forEach(source => {
		(byId[source.id] = byId[source.id] || []).push(path.basename(source.file));
	});
	Object.keys(byId).filter(id => byId[id].length > 1).forEach(id => {
		io.stdout('note: ' + byId[id].join(', ') + ' share composition id ' + id + ' (loaded on one page, the later replaces the earlier)\n');
	});

	const defaultOut = path.join(publishedDir, 'generated');
	let outDir = outDirArg !== null ? path.resolve(cwd, outDirArg) : defaultOut;
	let chosen = false;
	if (outDirArg === null && io.ask) {
		const answer = (await io.ask('Output directory (empty: ' + relative(cwd, defaultOut) + '): ')).trim();
		if (answer) {
			outDir = path.resolve(cwd, answer);
			chosen = true;
		}
	}
	if (path.resolve(outDir) === path.resolve(publishedDir)) {
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
	const written: { [file: string]: boolean } = {};
	sources.forEach(source => {
		const name = path.basename(source.file);
		let generated: IGenerated;
		try {
			generated = generate(source.definition, name);
		} catch (e) {
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
			io.stderr(name + ': not written: image paths that lead out of its directory: ' + outside.join(', ') + '\n');
			failed = true;
			return;
		}
		if (missing.length) {
			io.stderr(name + ': not written: images it uses are missing: ' + missing.join(', ') + '\n');
			failed = true;
			return;
		}

		fs.mkdirSync(outDir, { recursive: true });
		const target = path.join(outDir, name);
		fs.writeFileSync(target, generated.source);
		written[path.resolve(target)] = true;
		images.forEach(image => {
			const to = path.join(outDir, image);
			if (!written[path.resolve(to)]) {
				fs.mkdirSync(path.dirname(to), { recursive: true });
				fs.copyFileSync(path.join(publishedDir, image), to);
				written[path.resolve(to)] = true;
			}
		});
		io.stdout(name + ' -> ' + relative(cwd, target) + '  (composition id ' + generated.id + (images.length ? ', ' + images.length + ' image(s)' : '') + ')\n');
	});

	const left = before.filter(file => !written[path.resolve(file)]);
	if (left.length) {
		io.stdout('Not written by this run (remove them if no longer needed):\n');
		left.forEach(file => {
			io.stdout('  ' + relative(cwd, file) + '\n');
		});
	}
	return failed ? 1 : 0;
}
