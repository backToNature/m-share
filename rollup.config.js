import babel from 'rollup-plugin-babel';

export default {
  entry: 'src/index.js',
  dest: 'dist/m-share.js',
  format: 'umd',
  name: 'Mshare',
  plugins: [
    babel({
        exclude: 'node_modules/**'
    })
  ]
};