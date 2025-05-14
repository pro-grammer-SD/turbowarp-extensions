// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/tweakpane.min.js',
  output: {
    file: 'dist/tweakpane.umd.js',
    format: 'umd',
    name: 'Tweakpane'
  },
  plugins: [resolve(), commonjs()]
};
