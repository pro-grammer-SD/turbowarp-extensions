// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/tweakpane-4.0.5.min.js',
  output: {
    file: 'dist/tweakpane-4.0.5.min.js',
    format: 'umd',
    name: 'Tweakpane'
  },
  plugins: [resolve(), commonjs()]
};
