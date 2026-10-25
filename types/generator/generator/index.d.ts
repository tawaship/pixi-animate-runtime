import type { IDefinition, IIssue } from '@tawaship/animate-data-converter';
import type { IRuntimeData } from '../player/data';
export interface IGenerated {
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
/**
 * Generates the runtime content of a content from its extracted definition.
 */
export declare function generate(definition: IDefinition, id?: string): IGenerated;
/**
 * Extracts a published file and generates its runtime content.
 */
export declare function generateFromPublishedFile(publishedPath: string): IGenerated;
export interface ICliIO {
    stdout(text: string): void;
    stderr(text: string): void;
}
/**
 * The command line tool. Returns the exit code: 0 when the runtime content was
 * written, 1 when the content uses unsupported features (listed; nothing is
 * written unless --force), 2 for usage and loading errors.
 */
export declare function runCli(args: string[], io: ICliIO): number;
