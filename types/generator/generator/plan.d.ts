import type { IIssue } from '@tawaship/animate-data-converter';
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
/** A path from a directory, "/" separated */
export declare function relativePath(from: string, file: string): string;
/**
 * The published files an input names, and the directory their names are
 * taken from. Only reads the files (nothing is run). Throws when the input
 * does not exist or has no published file.
 */
export declare function findPublished(input: string, recursive?: boolean, cwd?: string): {
    root: string;
    files: string[];
};
/**
 * Finds the published files, makes their runtime content and works out where
 * everything would be written, without writing anything. Each published file
 * is run in a sandbox of its own, one after another. What cannot be written
 * (a file that cannot be read, unsupported features without force, missing
 * images) is in the plan with its problem. Throws when the input does not
 * exist, has no published file, or the output would be a published directory.
 * {@link writeGeneration} writes the plan.
 */
export declare function planGeneration(options: IPlanOptions): Promise<IGenerationPlan>;
/**
 * Writes a plan made by {@link planGeneration}: the runtime content it made
 * (as it was when the plan was made) and copies of the images. The contents
 * with a problem are not written. Nothing is deleted.
 */
export declare function writeGeneration(plan: IGenerationPlan): IWriteResult;
