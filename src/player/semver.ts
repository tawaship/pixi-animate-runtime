/**
 * Semantic version numbers and ranges, as far as the version checks of
 * definitions and runtime content need them: versions are MAJOR.MINOR.PATCH,
 * and ranges are written as npm writes them (`1.2.3`, `1.x`, `^1.2.0`,
 * `~1.2.0`, `>=1.0.0 <2.0.0`, `0.x || 1.x`). Pre-release tags are not handled.
 */

type TVersion = [number, number, number];

/** A version as its three numbers, or null when it is not MAJOR.MINOR.PATCH */
export function parseVersion(text: string): TVersion | null {
	const match = /^\s*v?(\d+)\.(\d+)\.(\d+)\s*$/.exec(text);
	return match ? [Number(match[1]), Number(match[2]), Number(match[3])] : null;
}

function compareParsed(a: TVersion, b: TVersion): number {
	for (let i = 0; i < 3; i++) {
		if (a[i] !== b[i]) {
			return a[i] < b[i] ? -1 : 1;
		}
	}
	return 0;
}

/** -1, 0 or 1 as a is lower than, the same as or higher than b (both have to be versions) */
export function compareVersions(a: string, b: string): number {
	const pa = parseVersion(a);
	const pb = parseVersion(b);
	if (!pa || !pb) {
		throw new Error('not a version: ' + (pa ? b : a));
	}
	return compareParsed(pa, pb);
}

/** A test on a version: the version compared with a bound */
interface IComparator {
	op: '>=' | '<';
	bound: TVersion;
}

/** A partial version (1, 1.2, 1.x, *): the numbers given, the rest left open */
function parsePartial(text: string): number[] | null {
	if (text === '*' || text === 'x' || text === 'X') {
		return [];
	}
	const parts = text.split('.');
	if (parts.length > 3) {
		return null;
	}
	const numbers: number[] = [];
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

function lowest(numbers: number[]): TVersion {
	return [numbers[0] || 0, numbers[1] || 0, numbers[2] || 0];
}

/** The first version above every version the given numbers start (1.2 -> 1.3.0); null for none (*) */
function above(numbers: number[]): TVersion | null {
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
function parseComparator(word: string): IComparator[] | null {
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
	const result: IComparator[] = [];
	const atLeast = (bound: TVersion): void => {
		result.push({ op: '>=', bound });
	};
	const below = (bound: TVersion | null): void => {
		if (bound) {
			result.push({ op: '<', bound });
		}
	};
	if (op === '=') {
		atLeast(low);
		below(above(numbers));
	} else if (op === '^') {
		// The left-most non-zero number given stays the same (^1.2.3 <2.0.0, ^0.2.3 <0.3.0, ^0.0.3 <0.0.4)
		let fixed = 0;
		while (fixed < numbers.length - 1 && numbers[fixed] === 0) {
			fixed++;
		}
		atLeast(low);
		below(above(numbers.slice(0, fixed + 1)));
	} else if (op === '~') {
		atLeast(low);
		below(above(numbers.slice(0, numbers.length > 1 ? 2 : 1)));
	} else if (op === '>=') {
		atLeast(low);
	} else if (op === '>') {
		const next = above(numbers);
		if (!next) {
			return null;
		}
		atLeast(next);
	} else if (op === '<') {
		below(low);
	} else {
		// <=
		below(above(numbers));
	}
	return result;
}

/** Whether a version is in a range (npm's notation, see above); a range not understood throws */
export function satisfies(version: string, range: string): boolean {
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

/**
 * Whether data a reader is given can be read: `error` when its writer's
 * version is outside the range the reader reads, `warning` when it is in the
 * range but newer than the version the reader knows of (the data may hold
 * what the reader does not know and leaves out). Both null when it reads.
 */
export interface IVersionCheck {
	error: string | null;
	warning: string | null;
	/** With an error: whether the writer is newer than the reader (update the reader) or older (write the data again) */
	newer: boolean;
}

export function checkVersion(version: string, range: string, known: string): IVersionCheck {
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
