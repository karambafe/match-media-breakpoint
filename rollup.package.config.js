import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default [
  {
    input: 'src/main.js',
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.browser, format: 'umd', name: 'MatchMediaBreakpoint' },
      { file: pkg.module, format: 'es' },
    ],
    plugins: [
      babel(),
    ],
  },
];
