/**
 * Semantic version numbers and ranges, as far as the version checks of
 * definitions and runtime content need them: versions are MAJOR.MINOR.PATCH,
 * and ranges are written as npm writes them (`1.2.3`, `1.x`, `^1.2.0`,
 * `~1.2.0`, `>=1.0.0 <2.0.0`, `0.x || 1.x`). Pre-release tags are not handled.
 */
type TVersion = [number, number, number];
/** A version as its three numbers, or null when it is not MAJOR.MINOR.PATCH */
export declare function parseVersion(text: string): TVersion | null;
/** -1, 0 or 1 as a is lower than, the same as or higher than b (both have to be versions) */
export declare function compareVersions(a: string, b: string): number;
/** Whether a version is in a range (npm's notation, see above); a range not understood throws */
export declare function satisfies(version: string, range: string): boolean;
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
export declare function checkVersion(version: string, range: string, known: string): IVersionCheck;
export {};
