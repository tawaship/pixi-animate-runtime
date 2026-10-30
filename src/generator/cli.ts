import * as path from 'path';
import { findPublished, planGeneration, writeGeneration, relativePath } from './plan';
import type { IGenerationPlan } from './plan';

export interface ICliIO {
	stdout(text: string): void;
	stderr(text: string): void;
	/** Asks a question and gives the answer; absent when nobody can answer (not a terminal) */
	ask?(question: string): Promise<string>;
	/** The directory relative paths are taken from */
	cwd?: string;
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

/** Lists what a plan writes and what it does not (problems, unsupported features and warnings on stderr) */
function showPlan(plan: IGenerationPlan, force: boolean, cwd: string, io: ICliIO): void {
	plan.contents.forEach(content => {
		content.warnings.forEach(warning => {
			io.stderr(content.name + ': warning: ' + warning + '\n');
		});
		content.issues.forEach(issue => {
			io.stderr(content.name + ': unsupported: ' + (issue.symbol ? issue.symbol : '(content)') + (issue.slot !== null ? ' slot ' + issue.slot : '') + ': ' + issue.message + '\n');
		});
		if (content.problem !== null) {
			io.stderr(content.name + ': not written: ' + content.problem + (content.issues.length && !force ?' (--force writes it anyway)' : '') + '\n');
		}
	});
	const writes = plan.contents.filter(content => content.problem === null);
	if (writes.length) {
		io.stdout('Runtime content to write (from ' + relativePath(cwd, plan.root) + '):\n');
		writes.forEach(content => {
			io.stdout('  ' + content.name + ' -> ' + relativePath(cwd, content.out) + '  (composition id ' + content.id +
				(content.images.length ? ', ' + content.images.length + ' image(s)' : '') + (content.exists ? ', replaces the file there' : '') + ')\n');
		});
	}
	const byId: { [id: string]: string[] } = {};
	plan.contents.forEach(content => {
		if (content.id !== null) {
			(byId[content.id] = byId[content.id] || []).push(content.name);
		}
	});
	Object.keys(byId).filter(id => byId[id].length > 1).forEach(id => {
		io.stdout('note: ' + byId[id].join(', ') + ' share composition id ' + id + ' (loaded on one page, the later replaces the earlier)\n');
	});
}

/**
 * The command line tool: {@link planGeneration}, the plan listed (and, in a
 * terminal, confirmed; without one, written only with -y), then
 * {@link writeGeneration}. Returns the exit code: 0 when every content was
 * written, 1 when some could not be (unsupported features without --force,
 * images the content uses that are missing) or nothing was written for want of
 * a "y", 2 for usage and loading errors.
 */
export async function runCli(args: string[], io: ICliIO): Promise<number> {
	const cwd = io.cwd || process.cwd();
	let input: string | null = null;
	let outDir: string | null = null;
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
		} else if (arg === '--force' || arg === '-f') {
			force = true;
		} else if (arg === '--recursive' || arg === '-r') {
			recursive = true;
		} else if (arg === '--yes' || arg === '-y') {
			yes = true;
		} else if (arg === '--help' || arg === '-h') {
			io.stdout(USAGE + '\n');
			return 0;
		} else if (arg.charAt(0) === '-' || input !== null) {
			io.stderr('unexpected argument: ' + arg + '\n\n' + USAGE + '\n');
			return 2;
		} else {
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
		let found: { root: string; files: string[] };
		try {
			found = findPublished(input, recursive, cwd);
		} catch (e) {
			io.stderr((e instanceof Error ? e.message : String(e)) + '\n');
			return 2;
		}
		io.stdout('Published content in ' + relativePath(cwd, found.root) + ':\n');
		found.files.forEach(file => {
			io.stdout('  ' + relativePath(found.root, file) + '\n');
		});
		const answer = (await ask('Output directory (empty: ' + (recursive ? 'generated/ next to each published file' : relativePath(cwd, path.join(found.root, 'generated'))) + '): ')).trim();
		outDir = answer || null;
	}

	let plan: IGenerationPlan;
	try {
		plan = await planGeneration({ input, outDir, recursive, force, cwd });
	} catch (e) {
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
