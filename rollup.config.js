import typescript from 'rollup-plugin-typescript2';
import uglify from 'rollup-plugin-uglify';

export default {
	entry: 'lib/index.ts',
	dest: 'dist/index.js',
	format: 'cjs',

	plugins: [typescript(), uglify()],

	external: ['fs', 'path'],
}
