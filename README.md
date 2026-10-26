# @tawaship/pixi-animate-runtime

Plays content published from Adobe Animate for HTML5 Canvas (CreateJS) on PixiJS.

The published JavaScript is converted once, at development time, into a runtime content file that holds one shared
definition per symbol. The player builds instances from these definitions on PixiJS, without CreateJS and
without running the published code: creating many instances at once no longer rebuilds each symbol's
timeline for every instance.

**Status: under development.** What works and what does not yet is listed under [Current limits](#current-limits).

## What you need

- PixiJS 5.3 (`pixi.js` ^5.3.2) in your application
- Node.js 18 or later to convert the published file (the conversion does not run in the browser)

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

		container.addCreatejs(content.createRoot('game'));   // the symbol the published HTML used as its root
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
- The second argument, `{ version }`, adds `_fv=<version>` to every image URL to bypass caches; the query
  Animate adds to each image path on every publish stays
- An array of targets loads several contents, giving an array of contents
- `createRoot(id)` creates an instance the way the published HTML creates its root. `content.create(id)`
  creates a plain instance, and `content.lib` holds the symbol classes (`new content.lib.game()`)
- `container.speed` changes the playback speed (`1` is the published frame rate, `0` stops). When the
  display runs slower than the content, one call plays several frames; set `container.overSpeed = false`
  to play at most one frame per call
- A movie clip starts from its first frame when it is put on the container. `removeCreatejs(instance)`
  takes it off, and it stops playing
- `tick(instance)` plays exactly one frame, for stepping through content by hand

With a bundler, import the player instead (`import { loadContentAsync } from '@tawaship/pixi-animate-runtime'`);
the runtime content files are still loaded as scripts.

To supply textures yourself instead of loading them, build the content from its registered factory:
`createContent(getContentFactory(id), { images: { <manifest id>: texture } })`.

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

## Current limits

- Buttons do not react to the pointer: a button shows its idle ("up") frame and stays there. Listeners for
  CreateJS mouse events (`mousedown`, `click`, `rollover` and so on) are not called. To react to the
  pointer, listen to PixiJS events on the instance's `pixi` node (`pointerdown`, `pointertap`,
  `pointerover` and so on, with `interactive = true`). Masks are never hit by the pointer
- Sound is not played
- Content that uses the Animate camera ("Advanced Layers") is not supported: delete the camera layer and
  publish again

## Versions

Runtime content records the version of this package that generated it, and the player checks it when the
content is built (`createContent`):

| Runtime content generated by | What the player does |
|---|---|
| A version in `RUNTIME_CONTENT_RANGE`, not newer than the player | Plays it |
| A version in `RUNTIME_CONTENT_RANGE`, newer than the player | Plays it and warns on the console: what the newer version added may not play. Update the player |
| A version outside `RUNTIME_CONTENT_RANGE` (or none) | Throws. The message says whether to update the player or to generate the runtime content again |

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
Known faults are put into the player on purpose to confirm that the comparison notices them.

## License

MIT
