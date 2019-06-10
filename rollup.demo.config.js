import vue from 'rollup-plugin-vue';
import uglify from 'rollup-plugin-uglify-es';
import html from 'rollup-plugin-fill-html';
import commonjs from 'rollup-plugin-commonjs';

export default {
  input: 'docs-src/main.js',
  output: 'docs/bundle-[hash].js',
  plugins: [
    commonjs(),
    vue({
      css: true,
      compileTemplate: true,
    }),
    uglify(),
    html({
      template: 'docs-src/index.html',
      filename: 'index.html',
    }),
  ],
};
