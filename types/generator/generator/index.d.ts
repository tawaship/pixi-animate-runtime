import type { IDefinition, IIssue } from '@tawaship/animate-data-converter';
import type { IRuntimeData } from '../player/data';
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
/** The composition id of a content (lib.properties.id): the id its runtime content is registered and loaded under */
export declare function compositionId(definition: IDefinition): string;
/**
 * Generates the runtime content of a content from its extracted definition.
 * It is registered under the content's composition id; `sourceName` (the
 * published file it came from) is written into it to tell contents apart in
 * messages.
 */
export declare function generate(definition: IDefinition, sourceName?: string): IGenerated;
/**
 * Extracts a published file and generates its runtime content.
 */
export declare function generateFromPublishedFile(publishedPath: string): IGenerated;
export { runCli } from './cli';
export type { ICliIO } from './cli';
