# @tawaship/pixi-animate-runtime

Plays content made in Adobe Animate (published for HTML5 Canvas) on PixiJS, without CreateJS.

- **Convert once, at development time**: a command turns the files Animate publishes into an optimized
  *runtime content* file
- **Play the runtime content in your PixiJS application**: the player plays it as CreateJS would, without
  CreateJS and without the published files
- **What it brings**: creating many instances at once stays light (each symbol is prepared once and shared),
  playback stays even when frame times vary, and what is played is checked frame by frame against CreateJS

Coming from [@tawaship/pixi-animate-container](https://github.com/tawaship/pixi-animate-container)? It plays the
same content and is used the same way; see [Coming from pixi-animate-container](#coming-from-pixi-animate-container).

**Status: under development.** What does not work yet is listed under [Current limits](#current-limits).

API reference: https://tawaship.github.io/pixi-animate-runtime/docs/

Samples (content published from Animate, played by this package or by CreateJS): https://tawaship.github.io/pixi-animate-runtime/samples/

**Convert only content you trust.** Converting runs the published JavaScript, frame scripts included, to read
it. It runs in a sandbox (QuickJS, a separate JavaScript engine compiled to WebAssembly) that is given nothing
of your machine: no files, no commands, no network. Running code is never without risk all the same: a flaw in
the sandbox or the engines could let code in the file reach further. Convert content published by you or by
people you trust, and treat content you receive (from a contractor, an asset store and so on) as code you would
run. In the browser, the runtime content is as safe as the published content would be.

## Quick start

The published files are needed only to convert. Your application ships the runtime content (and the images it
uses), not the published files. This example keeps them apart:

```
my-project/
├─ animate/          what Animate publishes (read when converting; not shipped)
└─ public/           what the application ships
   ├─ animates/      the runtime content, written by the command
   ├─ lib/           PixiJS and the player
   └─ index.html
```

1. **Publish from Animate.** In Adobe Animate, publish the document for HTML5 Canvas into `animate/` (you get
   `game.js`, `game.html` and an `images/` directory).

2. **Install.** In the project (Node.js 18 or later):

   ```
   npm install pixi.js@5 @tawaship/pixi-animate-runtime
   ```

   Copy `node_modules/pixi.js/dist/pixi.min.js` and
   `node_modules/@tawaship/pixi-animate-runtime/dist/pixi-animate-runtime.js` into `public/lib/` (or import the
   player with a bundler).

3. **Convert.** From the project's root:

   ```
   npx pixi-animate-runtime animate --out-dir public/animates
   ```

   It lists what it will write and asks; answer `y`. This writes `public/animates/game.js` (the runtime
   content) and copies the images it uses into `public/animates/images/`. The list shows the content's
   **composition id**, which the next step needs.

4. **Play.** In `public/index.html`, load PixiJS, the player and the runtime content, and put the symbol the
   published HTML showed (named after the published file, here `game`) on an `AnimateContainer`:

   ```html
   <script src="lib/pixi.min.js"></script>
   <script src="lib/pixi-animate-runtime.js"></script>
   <script src="animates/game.js"></script>
   <script>
   const app = new PIXI.Application({ width: 550, height: 400 });
   document.body.appendChild(app.view);

   const { loadContentAsync, AnimateContainer } = PIXI.animateRuntime;
   loadContentAsync({ id: '<composition id>', basepath: 'animates/' }).then(content => {
   	const container = new AnimateContainer();
   	app.stage.addChild(container);
   	app.ticker.add(container.handleTick, container);
   	container.addCreatejs(content.create('game'));
   });
   </script>
   ```

   The content plays at the frame rate it was published with.

5. **After publishing again from Animate, run step 3 again.** The player plays the runtime content, never the
   published files: a change made in Animate shows only once the runtime content is made again.

The sections below explain each step: [Converting published content](#converting-published-content) (options,
the Windows batch file, the Node API) and [Playing content](#playing-content) (loading options, the container,
the objects).

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
| `-o, --out-dir <directory>` | Writes straight into that directory instead of `generated/` |
| `-r, --recursive` | Also converts the published files in the directories below (not in `node_modules`, nor in directories whose name starts with `.`). With `-o`, each is written below that directory at the same relative path (`title/title.js` to `<directory>/title/title.js`); without it, into `generated/` next to its published file |
| `-y, --yes` | Writes without asking anything (directories not given take their defaults). Needed when run from a script or CI |
| `-f, --force` | Writes runtime content even when the content uses features that are not supported |
| `-h, --help` | Shows the usage |

Before writing anything, the tool lists each published file with where its runtime content goes, its
composition id, the number of images it uses, and whether it replaces a file already there:

```
Runtime content to write (from assets/animates):
  game.js -> assets/animates/generated/game.js  (composition id 2FA8E0C7230941478CE2CA3DB82DBEDF, 3 image(s))
Write these? (y/N):
```

Nothing is written unless you answer `y`. Run from a script or CI, where nobody can answer (not a terminal),
it only lists and writes nothing unless `-y` is given; with `-y`, it asks nothing and writes. Run in a terminal
without a directory (and without `-y`), the tool first asks for it, lists the published files it found, and
asks where to write (empty: `generated/`).

Nothing is ever deleted: files already in the output directory that the run did not write are listed, for you
to remove when they are no longer needed.

A content is not written when it uses unsupported features (each one is listed), when an image it uses is
missing, or when the path of an image leads out of the published directory (Animate writes them below it);
the other contents still are, and the command then exits with `1`. It exits with `2` when the directory or
file cannot be read.

On Windows, `tools/pixi-animate-runtime.bat` (in the installed package) does the same: copy it into your
project, then drop the published directory on it, or double-click it to be asked.

The same is available from Node, in two steps, so that a script of your own can show the plan, ask its own
questions or choose what to write in between:

```js
const { planGeneration, writeGeneration } = require('@tawaship/pixi-animate-runtime/generator');

planGeneration({ input: 'assets/animates', outDir: 'public/animates', recursive: true }).then(plan => {
	plan.contents.forEach(content => {
		console.log(content.name, '->', content.out, content.problem || '');
	});
	const result = writeGeneration(plan);
	console.log(result.written.length + ' file(s) written');
});
```

`planGeneration(options)` takes what the command line takes (`input`, `outDir`, `recursive`, `force`, `cwd`),
makes the runtime content and works out where everything goes, but writes nothing. Each of `plan.contents` is
one published file: `name`, `id` (composition id), `out` (where it goes), `exists` (a file is already there),
`images` (`from` and `to`), `issues`, `warnings`, and `problem`, the reason it is not written (`null` when it
is). `writeGeneration(plan)` writes the runtime content as the plan made it (a published file changed in
between does not change what is written), copies the images, and returns `written` (the files it wrote) and
`left` (the files already in the output directories that it did not write). It deletes nothing. To write only some of the contents, give it a plan with
the others removed from `contents`.

For one published file without writing anything:

```js
const { generateFromPublishedFile } = require('@tawaship/pixi-animate-runtime/generator');

generateFromPublishedFile('assets/animates/game.js').then(generated => {
	require('fs').writeFileSync('game.js', generated.source);
});
```

`generated.id` is the content's composition id, `generated.data` its data, `generated.issues` lists
unsupported features and `generated.warnings` what to look at (see [Versions](#versions)). Images are not
copied by this function.

`generate(definition)` makes the runtime content from a definition you already have, in the form
`@tawaship/animate-data-converter` extracts it (its compact form). An expanded definition (written with
`--expanded`, or made with `expand()`) is refused: turn it back with the converter's `compact()` first.

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

## How it works

Published content defines each symbol as a class whose constructor builds its children and its whole timeline,
for every instance. The command runs the published code once, at development time (in its sandbox, with
`@tawaship/animate-data-converter`), and records each symbol as data: the display objects it owns and the
value of every property its timeline sets, at every frame. The runtime content holds that data, written
compactly, and the frame scripts as code.

The player builds every instance of a symbol from the same data, so creating many instances at once does not
build a timeline for each, and it needs neither CreateJS nor the published code. It plays the frames as CreateJS
does: tests play every test content on both, frame by frame (see
[How correctness is checked](#how-correctness-is-checked)).

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
