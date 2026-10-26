import * as PIXI from 'pixi.js';
import { Content, IContent, TContentFactory, contentInterface } from './content';

/**
 * The global runtime content files register their factories in, by
 * composition id: `window.PixiAnimateRuntimeContents[id] = factory`. It is not
 * under the player's namespace, so that a runtime content file can be loaded
 * before the player, and the same file serves every player package.
 */
export const CONTENTS_GLOBAL = 'PixiAnimateRuntimeContents';

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

/** An image of a content to load: its manifest id and its URL */
interface IContentImageRequest {
	id: string;
	url: string;
}

/** The factories registered so far (none when no runtime content file was loaded) */
function registeredContents(): object | null {
	const contents = Reflect.get(window, CONTENTS_GLOBAL);
	return contents !== null && typeof contents === 'object' ? contents : null;
}

function describeRegistered(contents: object | null): string {
	if (!contents || !Object.keys(contents).length) {
		return 'none is loaded';
	}
	return 'loaded: ' + Object.keys(contents).map(id => {
		const source = Reflect.get(Reflect.get(contents, id), 'source');
		return JSON.stringify(id) + (typeof source === 'string' ? ' (' + source + ')' : '');
	}).join(', ');
}

/**
 * The factory a runtime content file registered under a composition id. The
 * file has to be loaded first (a script tag, or any other way).
 */
export function getContentFactory(id: string): TContentFactory {
	const contents = registeredContents();
	const found = contents ? Reflect.get(contents, id) : undefined;
	const factory: TContentFactory | null = typeof found === 'function' ? found : null;
	if (!factory) {
		throw new Error('No runtime content ' + JSON.stringify(id) + ' (' + describeRegistered(contents) + '). Load its runtime content file before loading the content.');
	}
	return factory;
}

/**
 * A query added to a URL, keeping the queries it has (one of the same name is
 * replaced). The same as Pixim.js's utils.resolveQuery, so that both players
 * request the same URL.
 */
function withQuery(url: string, name: string, value: string): string {
	const parts = url.split('?');
	const kept = parts[1] ? parts[1].split('&').filter(query => query.split('=')[0] !== name) : [];
	kept.push(name + '=' + value);
	return parts[0] + '?' + kept.join('&');
}

/**
 * The URL of a content's image: its path resolved against the base path, with
 * the version added as `_fv=<version>` (the query the path already has, such as
 * the one Animate adds on every publish, stays). data: and blob: URLs are used
 * as they are. The same as Pixim.js's utils.resolveUri.
 */
export function resolveContentUrl(basepath: string, src: string, version?: string | number | null): string {
	if (src.indexOf('data:') === 0 || src.indexOf('blob:') === 0) {
		return src;
	}
	const url = PIXI.utils.url.resolve(basepath, src);
	return version === undefined || version === null || version === '' ? url : withQuery(url, '_fv', String(version));
}

/** The images a content loads, with their URLs */
function imageRequests(content: Content, basepath: string, version?: string | number | null): IContentImageRequest[] {
	return content.data.images.map(entry => ({ id: entry.id, url: resolveContentUrl(basepath, entry.src, version) }));
}

function loadContent(target: IContentTarget, options: ILoadContentOptions): Promise<IContent> {
	return new Promise<IContent>((resolve, reject) => {
		const content = new Content(getContentFactory(target.id));
		const requests = imageRequests(content, target.basepath, options.version);
		if (!requests.length) {
			resolve(contentInterface(content));
			return;
		}
		const crossOrigin = !target.options || target.options.crossOrigin !== false;
		const loader = new PIXI.Loader();
		requests.forEach(request => {
			loader.add({ name: request.id, url: request.url, crossOrigin: crossOrigin ? 'anonymous' : undefined });
		});
		const failed: string[] = [];
		loader.onError.add((error: Error, _loader: PIXI.Loader, resource: PIXI.LoaderResource) => {
			failed.push(resource.url);
		});
		loader.load((_loader: PIXI.Loader, resources: Partial<Record<string, PIXI.LoaderResource>>) => {
			if (failed.length) {
				reject(new Error('Could not load the images of runtime content ' + JSON.stringify(target.id) + ': ' + failed.join(', ')));
				return;
			}
			const textures: { [id: string]: PIXI.Texture } = {};
			requests.forEach(request => {
				const resource = resources[request.id];
				if (resource && resource.texture) {
					textures[request.id] = resource.texture;
				}
			});
			content._applyImages(textures);
			resolve(contentInterface(content));
		});
	});
}

/**
 * Loads contents: the factory each runtime content file registered under the
 * target's composition id (the file has to be loaded already), the content's
 * images from the target's base path, and the content built with them.
 */
export function loadContentAsync(target: IContentTarget, options?: ILoadContentOptions): Promise<IContent>;
export function loadContentAsync(targets: IContentTarget[], options?: ILoadContentOptions): Promise<IContent[]>;
export function loadContentAsync(targets: IContentTarget | IContentTarget[], options?: ILoadContentOptions): Promise<IContent | IContent[]> {
	const opts = options || {};
	if (Array.isArray(targets)) {
		return Promise.all(targets.map(target => loadContent(target, opts)));
	}
	return loadContent(targets, opts);
}
