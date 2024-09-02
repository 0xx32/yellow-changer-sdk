import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'

// const name = 'yellow-changer'
const name = 'index'
const outputDir = 'dist'

/**
 * @param {import('rollup').RollupOptions} config
 * @returns {import('rollup').RollupOptions}
 */
const bundle = (config) => ({
	...config,
	input: 'index.ts',
	external: ['axios', 'crypto'],
	// external: (id) => !/^[./]/.test(id),
})

export default [
	bundle({
		plugins: [typescriptPaths(), esbuild()],

		output: [
			// {
			// 	// file: `${outputDir}/${name}.js`,
			// 	dir: outputDir,
			// 	format: 'cjs',
			// 	sourcemap: true,
			// 	exports: 'named',
			// 	preserveModules: true, // Keep directory structure and files
			// },
			{
				// file: `${outputDir}/${name}.mjs`,
				dir: outputDir,
				format: 'module',
				// sourcemap: true,
				exports: 'named',
				preserveModules: true, // Keep directory structure and files
			},
		],
	}),
	bundle({
		plugins: [dts()],
		input: './src/index.ts',
		output: {
			dir: outputDir,
			format: 'es',
			exports: 'named',
		},
	}),
]
