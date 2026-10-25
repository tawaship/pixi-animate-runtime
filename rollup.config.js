import typescript from '@rollup/plugin-typescript';
import buble from '@rollup/plugin-buble';
import { deleteAsync } from 'del';

const conf = require('./package.json');
const version = conf.version;

const banner = [
	'/*!',
	` * @tawaship/pixi-animate-runtime - v${version}`,
	' * ',
	' * @author tawaship (makazu.mori@gmail.com)',
	' * @license MIT',
	' */',
	''
].join('\n');

// Writes versions from package.json into the sources that hold their placeholders
function versions(values) {
	return {
		name: 'versions',
		transform(code) {
			let result = code;
			Object.keys(values).forEach(key => {
				result = result.split("'" + key + "'").join(JSON.stringify(values[key]));
			});
			return result === code ? null : { code: result, map: null };
		}
	};
}

// The converter this generator is built with, and the range of it the package depends on
const converterVersion = require('@tawaship/animate-data-converter/package.json').version;
const converterRange = conf.dependencies['@tawaship/animate-data-converter'];

export default (async () => {
	if (process.env.PROD) {
		await deleteAsync(['./dist/', './types/']);
	}

	return [
		// The player (browser): pixi.js is the application's own
		{
			input: 'src/player/index.ts',
			output: [
				{ banner, file: 'dist/pixi-animate-runtime.js', format: 'iife', name: 'PixiAnimateRuntime', globals: { 'pixi.js': 'PIXI' }, sourcemap: true },
				{ banner, file: 'dist/pixi-animate-runtime.cjs.js', format: 'cjs', sourcemap: true },
				{ banner, file: 'dist/pixi-animate-runtime.esm.js', format: 'esm', sourcemap: true }
			],
			external: ['pixi.js'],
			// ES5 for the browser (async / for-of are not used, as buble cannot lower them)
			plugins: [typescript({ tsconfig: './tsconfig.player.json', declaration: false }), versions({ __PACKAGE_VERSION__: version }), buble()]
		},
		// The generator (Node)
		{
			input: 'src/generator/index.ts',
			output: [
				{ banner, file: 'dist/generator.cjs.js', format: 'cjs', sourcemap: true }
			],
			external: ['fs', 'path', '@tawaship/animate-data-converter'],
			plugins: [
				typescript({ tsconfig: './tsconfig.generator.json', declaration: false }),
				versions({ __PACKAGE_VERSION__: version, __CONVERTER_VERSION__: converterVersion, __CONVERTER_RANGE__: converterRange })
			]
		}
	];
})();
