import typescript from 'rollup-plugin-typescript2';

export default {
	entry: 'lib/index.ts',
	dest: 'dist/index.js',
	format: 'cjs',

	plugins: [typescript()],

	external: ['fs', 'path'],
}
