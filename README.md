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

Use the command line tool to turn the published JavaScript into runtime content for the player:

```
npx pixi-animate-runtime game.js --out game.content.js
```

This writes `game.content.js`, which contains every symbol of `game.js` and its frame scripts.

| Option | Effect |
|---|---|
| `--out <file>` | Where to write the runtime content. Without it, it goes to standard output |
| `--force` | Writes the runtime content even when the content uses features that are not supported |

The command exits with `1` and writes nothing when the content uses unsupported features (each one is
listed), and with `2` when the file cannot be read or is not Animate HTML5 Canvas output.

The same is available from Node:

```js
const { generateFromPublishedFile } = require('@tawaship/pixi-animate-runtime/generator');

const generated = generateFromPublishedFile('game.js');
require('fs').writeFileSync('game.content.js', generated.source);
```

`generated.data` is the content's data, `generated.issues` lists unsupported features and
`generated.warnings` what to look at (see [Versions](#versions)).

Frame scripts are copied into the runtime content as they were published, as code. Nothing is rewritten
(a `console.log` left in a script stays), and the runtime content needs no `eval` at run time.

## Playing content

Load the runtime content, build the content with the textures of its images, and put an instance of a symbol on an
`AnimateContainer`:

```js
import * as PIXI from 'pixi.js';
import { createContent, AnimateContainer } from '@tawaship/pixi-animate-runtime';
import factory from './game.content.js';

const content = createContent(factory, {
	images: { game_atlas_1: PIXI.Texture.from('images/game_atlas_1.png') }
});

const container = new AnimateContainer();
app.stage.addChild(container);
app.ticker.add(container.handleTick, container);

container.addCreatejs(content.createRoot('game'));   // the symbol the published HTML used as its root
```

This shows the `game` symbol and plays it at the frame rate it was published with, whatever the display's
refresh rate: `handleTick` turns the ticker's time into the content's frames.

- `images` maps the ids of the published manifest to textures. Sprite sheet frames are cut from the
  atlas images by the player itself
- `createRoot(id)` creates an instance the way the published HTML creates its root. `content.create(id)`
  creates a plain instance, and `content.lib` holds the symbol classes (`new content.lib.game()`)
- `container.speed` changes the playback speed (`1` is the published frame rate, `0` stops). When the
  display runs slower than the content, one call plays several frames; set `container.overSpeed = false`
  to play at most one frame per call
- A movie clip starts from its first frame when it is put on the container. `removeCreatejs(instance)`
  takes it off, and it stops playing
- `tick(instance)` plays exactly one frame, for stepping through content by hand

Loaded with a `<script>` tag after `pixi.js` (`dist/pixi-animate-runtime.js`), the player is
`PIXI.animateRuntime`: the same API, as `PIXI.animateRuntime.createContent(...)`.

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
- Runtime content is a CommonJS module or a plain script (it registers itself on
  `PixiAnimateRuntimeContents`); loading by path is not available yet

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
