import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/m-share.js',
  format: 'umd',
  sourceMap: 'inline',
  plugins: [
    babel({
        exclude: 'node_modules/**'
    })
  ]
};