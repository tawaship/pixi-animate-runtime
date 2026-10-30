---
name: pixi-animate-runtime-guide
description: Use this skill whenever the user asks to create, edit, or debug content using @tawaship/pixi-animate-runtime — a player that plays Adobe Animate HTML5 Canvas (CreateJS) content on pixi.js from runtime content files generated at development time, without CreateJS. Trigger on any mention of 'pixi-animate-runtime', 'runtime content', 'Animate コンテンツ', 'Adobe Animate' or 'createjs' in a project that has @tawaship/pixi-animate-runtime installed, or on concepts like loadContentAsync, AnimateContainer, AnimateController, content.create, PIXI.animateRuntime, or the 'npx pixi-animate-runtime' command. If the project uses @tawaship/pixi-animate-container instead (CreateJS at run time, loadAssetAsync), use the pixi-animate-container-guide skill. If the user is working with Pixim.js, use the pixim-animate-runtime-guide skill (it builds on this one).
---

# @tawaship/pixi-animate-runtime development skill

Supported versions: **`^0.1.0`** (written against `0.1.0`).

First determine the installed version (`node_modules/@tawaship/pixi-animate-runtime/package.json`). If it is outside the supported range, **treat the type definitions in node_modules as authoritative** and follow them wherever they disagree with this skill.

The content is assumed to be published by **Adobe Animate 24.0.15** for HTML5 Canvas, the only version checked: this package depends on the form of the published JavaScript. If the user's content comes from another version of Animate and something does not work, mention this before looking for other causes.

## Dependencies

Read these skills first if they are available, then apply this one:

- A PixiJS v5.3 skill (such as pixijs-guide): the player runs on pixi.js 5.3 (`^5.3.2`)

## Overview

"Animate content" is what Adobe Animate publishes in HTML5 Canvas mode: a JavaScript file (plus images) that runs on CreateJS. This package plays it on pixi.js in two steps:

1. **At development time (Node.js 18+)**, the generator turns the published JavaScript into a **runtime content file** (one per published file). This runs CreateJS once and records every symbol
2. **In the browser**, the player loads runtime content files and plays them. **CreateJS and the published JavaScript are not loaded**

Consequences to keep in mind:

- **After the content is published again from Animate, the runtime content must be generated again.** The player never reads the published `.js`. When a change made in Animate does not show, check this first
- Never write `<script>` tags for CreateJS or the published `.js` in a project using this package

## Type definition files

**Before writing code that uses a class, method, or property of this package, check the corresponding type definition file** in the installed package (`node_modules/@tawaship/pixi-animate-runtime/`). That is the single source of truth.

| What | Type definition file |
|---|---|
| Everything the player exports | `types/player/index.d.ts` |
| `loadContentAsync`, `IContentTarget` (the load options) | `types/player/loader.d.ts` |
| `IContent` (`create`, `lib`, `properties`, `id`), `tick` | `types/player/content.d.ts` |
| `AnimateContainer`, `AnimateController` | `types/player/animate-container.d.ts` |
| `MovieClip` (`play`, `stop`, `gotoAndPlay`, `labels`, ...) | `types/player/movieclip.d.ts` |
| `DisplayObject`, `Container` (the CreateJS-compatible base classes, `pixi`) | `types/player/display.d.ts` |
| `Shape`, `Sprite`, `Bitmap`, `Text`, `ButtonHelper`, `ColorFilter` | `types/player/objects.d.ts` |
| The generator (Node): `planGeneration`, `writeGeneration`, `generateFromPublishedFile`, `generate` | `types/generator/generator/index.d.ts` (the plan types in `types/generator/generator/plan.d.ts`) |

## Basic usage

### 1. Generate the runtime content (development time)

```sh
npx pixi-animate-runtime assets/animates
```

Give it the directory Animate published into. It writes `assets/animates/generated/<same name>.js` for every published `.js`, and copies the images each content uses next to it (`generated/images/...`). Copy the `generated/` directory into the application's assets.

- `-o, --out-dir <dir>` writes there instead of `generated/`. `-r, --recursive` also converts the published files in the directories below (not `node_modules` or hidden ones), written below `-o` at the same relative paths, or next to each published file in `generated/`. `-h, --help` shows the usage. A published `.js` file instead of a directory converts only that file
- It first lists what it would write (published file → output file, composition id, images, files it replaces). It writes only after the user answers `y`. `-y, --yes` asks nothing and writes; run from a script, an npm script in CI or anything that is not a terminal, **`-y` is needed** (without it, nothing is written and the command exits with `1`)
- Nothing is deleted. Leftover files in the output directory are only listed
- From a Node script, `planGeneration(options)` (the same options as the command: `input`, `outDir`, `recursive`, `force`) makes everything and writes nothing, and `writeGeneration(plan)` writes it, so the script can show its own list or questions in between (or remove contents from the plan to write only some)
- A content using unsupported features (each one listed) is not written, and the command exits with `1`. Report the listed features to the user; do not reach for `--force`
- On Windows, `tools/pixi-animate-runtime.bat` in the installed package does the same (copy it into the project, drop the published directory on it)
- The command prints each content's **composition id**, needed below

### 2. Load and play (browser)

```html
<script src="pixi.js"></script>
<script src="pixi-animate-runtime.js"></script>
<script src="assets/animates/generated/game.js"></script><!-- runtime content file -->
```

```javascript
const { loadContentAsync, AnimateContainer } = PIXI.animateRuntime;

loadContentAsync({ id: 'COMPOSITION_ID', basepath: 'assets/animates/generated/' })
  .then((content) => {
    const container = new AnimateContainer();
    app.stage.addChild(container);
    app.ticker.add(container.handleTick, container); // required: nothing plays without it

    container.addCreatejs(content.create('game')); // the symbol the published HTML used as its root
  });
```

- Runtime content files must be loaded (script tags, or script elements added at run time) **before** `loadContentAsync` is called. They register under their composition id
- `id`: the composition id (`lib.properties.id`; printed by the command, and written at the top of the runtime content file). When nothing is registered under it, the error lists what is
- `basepath`: the directory the runtime content file was written to, ending with `/`; images are loaded relative to it
- `options.crossOrigin: false` loads images without CORS. `options.handleManifest(manifest)` can change image `src` before loading
- An array of targets gives an array of contents
- With a bundler: `import { loadContentAsync, AnimateContainer } from '@tawaship/pixi-animate-runtime'`. Runtime content files are still loaded as scripts

### 3. Creating instances

- `content.create('symbolName')` creates an instance set up the way the published HTML sets up its root. Use it for every instance the application places
- `new content.lib.symbolName()` is what frame scripts do; it skips that setup
- `content.properties` holds the published `lib.properties` (`width`, `height`, `fps`, `color`, ...)
- Symbol names are the library names in Animate (non-ASCII names kept as they are)

### 4. AnimateContainer

- `addCreatejs(instance)` / `addCreatejsAt(instance, index)` put an instance on the container; a movie clip plays from its first frame. `removeCreatejs(instance)` takes it off and it stops
- Content plays at its published frame rate whatever the display's refresh rate
- `speed`: playback speed (`1` = published frame rate, `0` stops)
- `overSpeed` (default `true`): when the display runs slower than the content, one tick may play several frames. `false` plays at most one frame per tick
- `smooth` (default `true`): frames follow a steady clock, so small variations of the frame time do not make the playing uneven (no frame on one tick, two on the next); it still keeps to the real time. Leave it on unless the user asks for the pixi-animate-container behavior (`false`)
- To play on a container of another PixiJS framework, use `new AnimateController(container)`; it has the same `addCreatejs`, `handleTick`, `speed`, `overSpeed`, `smooth`

## Objects and their PixiJS nodes

Every instance is a CreateJS-compatible object (what frame scripts see as `this`), shown by a PixiJS node in its `pixi` property. Common values are stored once: `instance.x = 100` and `instance.pixi.x = 100` are the same write, and `instance.pixi` is always current.

Members whose meaning differs keep the CreateJS meaning on the instance and the PixiJS meaning on the node:

| Member | On the instance | On `instance.pixi` |
|---|---|---|
| `rotation` | Degrees | Radians (`angle` is degrees) |
| `skewX` / `skewY` | Degrees, CreateJS skew | `skew` in radians |
| `mask`, `filters`, `parent`, `children` | CreateJS-compatible objects | PixiJS objects |

- **Do not draw into a shape's `pixi` node** (`clear()`, `lineTo()`, ...): shapes showing the same drawing share one geometry, so the change shows everywhere
- Named instances placed in Animate (`this.button`, ...) exist at run time but are not in the types (`MovieClip` has no index signature)
- `addEventListener` / `dispatchEvent` follow CreateJS, so the usual pattern of dispatching an event from a frame script and listening in the application works
- Frame scripts run as published. They see `this`, `cjs` / `createjs` (the player's compatible classes, not real CreateJS) and `lib`. `exportRoot` and `stage` are undefined; `playSound()` plays nothing

## Current limits (tell the user instead of working around silently)

- Buttons do not react to the pointer and CreateJS mouse events (`click`, `mousedown`, `rollover`, ...) are never called. For input, listen to PixiJS events on `instance.pixi` (`pointertap`, ... with `interactive = true`)
- Sound is not played
- The Animate camera ("Advanced Layers") is not supported: delete the camera layer and publish again
- Dynamic text: lines break as in the published content; vertical position can differ slightly by font

## Coming from pixi-animate-container

| pixi-animate-container | pixi-animate-runtime |
|---|---|
| Script tags for CreateJS and the published `.js` | Script tag for the runtime content file only |
| `PIXI.animate` | `PIXI.animateRuntime` |
| `loadAssetAsync(targets)` → `lib` | `loadContentAsync(targets)` → content (`content.lib`) |
| `new lib.game()` | `content.create('game')` |
| `PIXI.animate.Container` | `AnimateContainer` |
| `createjsSpeed` / `createjsOverSpeed` | `speed` / `overSpeed` |
| `CreatejsMovieClip` etc. | `MovieClip` etc. |

Not available: `listenFrameEvents`, `useSound`, CreateJS mouse events.
