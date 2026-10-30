# @tawaship/pixi-animate-runtime

Plays content published from Adobe Animate for HTML5 Canvas (CreateJS) on PixiJS.

The published JavaScript is converted once, at development time, into a runtime content file that holds one shared
definition per symbol. The player builds instances from these definitions on PixiJS, without CreateJS and
without running the published code: creating many instances at once no longer rebuilds each symbol's
timeline for every instance.

It plays the same content as [@tawaship/pixi-animate-container](https://github.com/tawaship/pixi-animate-container)
and is used the same way (instances put on a container that the ticker drives); what changes is listed under
[Coming from pixi-animate-container](#coming-from-pixi-animate-container).

**Status: under development.** What works and what does not yet is listed under [Current limits](#current-limits).

API reference: https://tawaship.github.io/pixi-animate-runtime/docs/

Samples (content published from Animate, played by this package or by CreateJS): https://tawaship.github.io/pixi-animate-runtime/samples/

**Convert only content you trust.** Generating runs the published JavaScript, frame scripts included, in
Node.js, in a `vm` context that is not a security boundary: code in the file can reach what Node.js can (files,
commands, the network) with your permissions. Treat a published file as you would treat a script you run:
convert content published by you or by people you trust. In the browser, the runtime content is as safe as the
published content would be.

## What you need

- PixiJS 5.3 (`pixi.js` ^5.3.2) in your application
- Node.js 18 or later to convert the published file (the conversion does not run in the browser)

## Supported versions

- Content published by **Adobe Animate 24.0.15** for HTML5 Canvas. What this package reads is the form of the published
  JavaScript, which depends on the version of Animate; content published by other versions has not been checked
- PixiJS 5.3 (`pixi.js` ^5.3.2). Checked with 5.3.9

## Converting published content

Turn the published content into runtime content with the command line tool, giving it the directory Animate
published into (the one with the published `.js` files; `.fla` files and an `images/` directory there are
optional):

```
npx pixi-animate-runtime assets/animates
```

This writes, into `assets/animates/generated/`, one runtime content file for every published JavaScript file
in the directory, under the same name (`game.js` to `generated/game.js`), and copies the images each content
uses next to it at the same relative paths (`generated/images/...`). Images left over from earlier publishes
that no content uses are not copied, and scripts that are not Animate output are left alone. Copy the whole
`generated/` directory into your application's assets.

| Argument / option | Effect |
|---|---|
| a published `.js` file instead of a directory | Converts that file only |
| `--out-dir <directory>` | Writes straight into that directory instead of `generated/` |
| `--force` | Writes runtime content even when the content uses features that are not supported |

Nothing is ever deleted: files already in the output directory that the run did not write are listed, for you
to remove when they are no longer needed. Run in a terminal without a directory, the tool asks for it, lists
the published files it found with their composition ids, and asks where to write (empty: `generated/`); a
directory you name that is not empty is written to only after you answer `y`.

A content is not written when it uses unsupported features (each one is listed) or when an image it uses is
missing; the other contents still are, and the command then exits with `1`. It exits with `2` when the
directory or file cannot be read.

On Windows, `tools/pixi-animate-runtime.bat` (in the installed package) does the same: copy it into your
project, then drop the published directory on it, or double-click it to be asked.

The same is available from Node:

```js
const { generateFromPublishedFile } = require('@tawaship/pixi-animate-runtime/generator');

const generated = generateFromPublishedFile('assets/animates/game.js');
require('fs').writeFileSync('game.js', generated.source);
```

`generated.id` is the content's composition id, `generated.data` its data, `generated.issues` lists
unsupported features and `generated.warnings` what to look at (see [Versions](#versions)). Images are not
copied by this function.

Frame scripts are copied into the runtime content as they were published, as code. Nothing is rewritten
(a `console.log` left in a script stays), and the runtime content needs no `eval` at run time.

### Composition ids

A runtime content file registers itself, when it is loaded, under the content's **composition id**: the
`lib.properties.id` of the published content, the id Animate gives a document when the `.fla` is created. The
player takes the content by this id.

- Copying a `.fla` keeps its composition id, so two contents made that way share one id. Create a new document
  for a new content (the id can also be changed by editing the XML inside the `.fla`)
- Loading a runtime content file whose id is already registered replaces the earlier one, with a warning on the
  console. Contents already built from the earlier one keep working; contents loaded afterwards use the new one.
  This lets an application load contents of the same make (the same symbols, different looks) under one id in
  turn. Two different contents with one id are not told apart: if their symbols share names, the later content
  is shown where the earlier was meant

## Playing content

Load the runtime content file, load the content by its composition id, and put an instance of a symbol on an
`AnimateContainer`:

```html
<script src="pixi.js"></script>
<script src="pixi-animate-runtime.js"></script>
<script src="assets/animates/game.js"></script>   <!-- a runtime content file -->
```

```js
const { loadContentAsync, AnimateContainer } = PIXI.animateRuntime;

loadContentAsync({ id: '2FA8E0C7230941478CE2CA3DB82DBEDF', basepath: 'assets/animates/' })
	.then(content => {
		const container = new AnimateContainer();
		app.stage.addChild(container);
		app.ticker.add(container.handleTick, container);

		container.addCreatejs(content.create('game'));   // the symbol the published HTML used as its root
	});
```

This loads the content's images from `basepath` and shows the `game` symbol, playing it at the frame rate it
was published with, whatever the display's refresh rate: `handleTick` turns the ticker's time into the
content's frames.

- Runtime content files are loaded by you, before `loadContentAsync`: with script tags as above, or by adding
  script elements at run time. They register into `window.PixiAnimateRuntimeContents` and can be loaded
  before or after the player
- `id` is the composition id (the command line tool prints it, and it is written at the top of the runtime
  content file). When no content is registered under it, the error lists the ones that are
- `basepath` is the directory the content's image paths are relative to: where the runtime content file was
  written, ending with `/`. `options: { crossOrigin: false }` loads the images without CORS (requested with
  CORS, anonymous, by default)
- `options: { handleManifest(manifest) { ... } }` is called with the content's images (`{ id, src }`, `src` as
  published) before they are loaded. Changing an entry's `src` changes what this load reads: a `data:` or
  `blob:` URL is used as it is, another path is resolved against `basepath`. It may return a promise to make the
  loading wait
- The second argument, `{ version }`, adds `_fv=<version>` to every image URL to bypass caches; the query
  Animate adds to each image path on every publish stays
- An array of targets loads several contents, giving an array of contents
- `create(id)` creates an instance of any symbol, set up the way the published HTML sets up the root it
  creates: use it for the instances your application places. `content.lib` holds the symbol classes;
  `new content.lib.game()` creates an instance the way a frame script does, without that setup (it only
  matters for color effects, which the player draws the same either way)
- `content.id` is the composition id, and `content.properties` holds the values of the published
  `lib.properties` (`width`, `height`, `fps`, `color` and so on; read-only)
- To use an image of the content elsewhere, create the symbol that shows it and take its Pixi node:
  `content.create('Bitmap1').pixi.texture`
- `container.speed` changes the playback speed (`1` is the published frame rate, `0` stops). When the
  display runs slower than the content, one call plays several frames; set `container.overSpeed = false`
  to play at most one frame per call
- `container.smooth` (`true` by default) keeps the playing even when the time between frames of the display
  varies a little: the frames follow a steady clock (the usual time between frames of the display), so a
  display frame coming a little early or late does not leave one call with no frame and the next with two.
  The clock keeps to the real time, and frames the display misses are still caught up at once. `false`
  plays by the time of each call as it is, as pixi-animate-container does
- A movie clip starts from its first frame when it is put on the container. `removeCreatejs(instance)`
  takes it off, and it stops playing
- `tick(instance)` plays exactly one frame, for stepping through content by hand
- To play roots on a container of your own (of another framework built on PixiJS), give it an
  `AnimateController`: `new AnimateController(container)` has the `addCreatejs`, `handleTick`, `speed`,
  `overSpeed` and `smooth` of `AnimateContainer`, putting the instances on that container

For Pixim.js applications, use [@tawaship/pixim-animate-runtime](https://github.com/tawaship/Pixim-animate-runtime): it
includes this player and loads contents as assets of a Pixim content.

With a bundler, import the player instead (`import { loadContentAsync } from '@tawaship/pixi-animate-runtime'`);
the runtime content files are still loaded as scripts.

### Objects and their Pixi nodes

Every instance is a CreateJS-compatible object (what frame scripts see as `this`), shown by a PixiJS node
in its `pixi` property. Values the two have in common are kept in one place: `instance.x = 100` and
`instance.pixi.x = 100` are the same write, and what the timeline does with it afterwards is what
CreateJS would do.

Members whose meaning differs between CreateJS and PixiJS keep the CreateJS meaning on the instance and
the PixiJS meaning on its node:

| Member | On the instance | On `instance.pixi` |
|---|---|---|
| `rotation` | Degrees | Radians (`angle` is degrees) |
| `skewX` / `skewY` | Degrees, CreateJS skew | `skew` in radians |
| `mask`, `filters`, `parent`, `children` | CreateJS objects | PixiJS objects |

Shapes that show the same drawing share one PixiJS geometry, even across symbols. Do not draw into the
`pixi` node of a shape (`graphics.clear()`, `lineTo()` and so on): the change would show in every shape that
shares the drawing.

Rotation and skew combine the way CreateJS combines them (the object is rotated first and then skewed),
which matches what the published content shows in a browser.

Dynamic text breaks into lines the way the published content does: a line wider than the text box is broken
at spaces only, so a long word, or text without spaces such as Japanese, runs past the box. Animate's own
stage breaks such text inside words, so the two can look different; the player follows the published
content.

Frame scripts can use the names published code uses: `this`, `cjs` / `createjs` (the player's
CreateJS-compatible classes), and `lib` (the symbol classes). `exportRoot` and `stage` are undefined.
`playSound()` plays nothing.

## Coming from pixi-animate-container

pixi-animate-container loads CreateJS and the published JavaScript in the browser, runs them, and shows the
CreateJS display objects through PixiJS. This package does the CreateJS part once, at development time:

- In the browser, only PixiJS, the player and the runtime content files are loaded. CreateJS and the
  published JavaScript are not
- After publishing again from Animate, generate the runtime content again: the player does not read the
  published file
- Each symbol is defined once and shared by every instance, instead of each instance building its own
  timeline when it is created

The way content is put on the screen stays the same, under new names:

| pixi-animate-container | pixi-animate-runtime |
|---|---|
| `<script>` tags for CreateJS and the published `.js` | A `<script>` tag for the runtime content file (no CreateJS) |
| `PIXI.animate` | `PIXI.animateRuntime` |
| `loadAssetAsync(targets)`, giving `lib` | `loadContentAsync(targets)`, giving a content (its classes are in `content.lib`) |
| `new lib.game()` | `content.create('game')` (`new content.lib.game()` also works, see [Playing content](#playing-content)) |
| `PIXI.animate.Container` | `AnimateContainer` |
| `addCreatejs`, `addCreatejsAt`, `removeCreatejs`, `handleTick` | The same |
| `createjsSpeed` | `speed` |
| `createjsOverSpeed` | `overSpeed` |
| (none) | `smooth`: even playing when the time between frames varies (on by default; `false` plays as pixi-animate-container does) |
| `options: { crossOrigin }` | The same |
| `CreatejsMovieClip`, `CreatejsShape` and the other wrapper classes | `MovieClip`, `Shape` and the other CreateJS-compatible classes; `instance.pixi` is still the PixiJS node |

What behaves differently:

- `instance.pixi` is always current. The instance and its node share their values (see
  [Objects and their Pixi nodes](#objects-and-their-pixi-nodes)), so a frame script reading `instance.pixi.x`
  gets the value just written, not the value of the previous frame
- Not available: `options.listenFrameEvents` (`endAnimation`, `reachLabel`), `options.useSound` (sound is not
  played), and CreateJS mouse events on instances (see [Current limits](#current-limits))

## Current limits

- Buttons do not react to the pointer: a button shows its idle ("up") frame and stays there. Listeners for
  CreateJS mouse events (`mousedown`, `click`, `rollover` and so on) are not called. To react to the
  pointer, listen to PixiJS events on the instance's `pixi` node (`pointerdown`, `pointertap`,
  `pointerover` and so on, with `interactive = true`). Masks are never hit by the pointer
- Dynamic text is provisional. Lines break as in the published content (see above). Depending on the font,
  text sits slightly higher than in the published content. Paragraph indents and margins set in Animate are not
  in the published content and have no effect. `textBaseline` other than `top`, `maxWidth` and `outline` are
  not checked yet
- Sound is not played
- Content that uses the Animate camera ("Advanced Layers") is not supported: delete the camera layer and
  publish again

## Versions

Runtime content records the version of this package that generated it, and the player checks it when the
content is loaded (`loadContentAsync`):

| Runtime content generated by | What the player does |
|---|---|
| A version in `RUNTIME_CONTENT_RANGE`, not newer than the player | Plays it |
| A version in `RUNTIME_CONTENT_RANGE`, newer than the player | Plays it and warns on the console: what the newer version added may not play. Update the player |
| A version outside `RUNTIME_CONTENT_RANGE` (or none) | Fails to load (the promise is rejected). The message says whether to update the player or to generate the runtime content again |

The generator checks the same way the definitions it is given: a definition records the version of
`@tawaship/animate-data-converter` that extracted it. One from a version outside the range this package
depends on is refused, and one from a version newer than the generator was built with is generated with a
warning (in `generated.warnings`; the command line tool prints it and still writes the runtime content).
This matters when definitions are kept as files (`animate-data-converter --out`) and generated later.

`VERSION` is the version of the player, and `satisfies(version, range)` tests a version against a range
written as npm writes it (`0.x || 1.x`, `^1.2.0`, `>=1.0.0 <2.0.0`).

## How correctness is checked

The player was developed with Claude (Anthropic's AI assistant). Its correctness rests on testing rather
than on trust in the author: every test content is played both by CreateJS and by this player, and their
states are compared at every frame (positions, playback, display lists, drawing commands, text, filters,
masks, buttons), together with what the PixiJS nodes show (their matrices, masks, filters, textures).
What is drawn is compared too: every test content is drawn by CreateJS and by this player in the same
headless browser, frame by frame, and the pixels are compared, with differences in antialiasing allowed for.
Known faults are put into the player on purpose to confirm that the comparisons notice them.

## Change log

### 0.1.0

- First release: generates runtime content from content published by Adobe Animate for HTML5 Canvas (the command
  line tool and the API), and plays it on PixiJS 5.3 without CreateJS (`loadContentAsync`, `AnimateContainer`,
  `AnimateController`, with `speed`, `overSpeed` and `smooth`)

## License

MIT
