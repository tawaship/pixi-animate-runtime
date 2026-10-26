import { IContent, TContentFactory } from './content';
/**
 * The global runtime content files register their factories in, by
 * composition id: `window.PixiAnimateRuntimeContents[id] = factory`. It is not
 * under the player's namespace, so that a runtime content file can be loaded
 * before the player, and the same file serves every player package.
 */
export declare const CONTENTS_GLOBAL = "PixiAnimateRuntimeContents";
/** What to load a content from: its composition id, and the directory its images are relative to */
export interface IContentTarget {
    /** The content's composition id (lib.properties.id of the published content) */
    id: string;
    /** The directory the content's image paths are relative to (usually where its runtime content file is) */
    basepath: string;
    options?: {
        /** Whether images are requested with CORS (anonymous). true when omitted */
        crossOrigin?: boolean;
    };
}
export interface ILoadContentOptions {
    /** Added to every image URL as the query `_fv=<version>` (the query an image path already has stays) */
    version?: string | number;
}
/**
 * The factory a runtime content file registered under a composition id. The
 * file has to be loaded first (a script tag, or any other way).
 */
export declare function getContentFactory(id: string): TContentFactory;
/**
 * The URL of a content's image: its path resolved against the base path, with
 * the version added as `_fv=<version>` (the query the path already has, such as
 * the one Animate adds on every publish, stays). data: and blob: URLs are used
 * as they are. The same as Pixim.js's utils.resolveUri.
 */
export declare function resolveContentUrl(basepath: string, src: string, version?: string | number | null): string;
/**
 * Loads contents: the factory each runtime content file registered under the
 * target's composition id (the file has to be loaded already), the content's
 * images from the target's base path, and the content built with them.
 */
export declare function loadContentAsync(target: IContentTarget, options?: ILoadContentOptions): Promise<IContent>;
export declare function loadContentAsync(targets: IContentTarget[], options?: ILoadContentOptions): Promise<IContent[]>;
