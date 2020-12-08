import path from 'path';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
// import nodeResolve from '@rollup/plugin-node-resolve';
import rollupTypescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import merge from 'lodash.merge';
import pkg from './package.json'

const extensions = ['.js', '.ts'];

const resolve = function (...args) {
  return path.resolve(__dirname, ...args);
};

// 打包配置
const jobs = {
  // 为了项目的统一性，这里读取 package.json 中的配置项
  cjs: {
    output: {
      format: 'cjs',
      file: resolve(pkg.main),
      exports: 'auto',
    },
  },
  esm: {
    output: {
      format: 'esm',
      file: resolve(pkg.module),
    },
  },
  umd: {
    output: {
      format: 'umd',
      file: resolve(pkg.unpkg),
      name: pkg.name,
    },
    // plugins: [nodeResolve()]
  },
  min: {
    output: {
      format: 'umd',
      file: resolve(pkg.unpkg.replace(/(.\w+)$/, '.min$1')),
      name: pkg.name,
    },
    // plugins: [nodeResolve(), terser()],
    plugins: [terser()],
  },
};

// 打包目录
const mergeConfig = jobs[process.env.FORMAT || 'esm'];

module.exports = merge(
  {
    input: resolve('./src/index.ts'),
    output: {},
    plugins: [
      rollupTypescript({
        useTsconfigDeclarationDir: true,
        tsconfig: './tsconfig.json',
      }),
      babel({
        configFile: resolve('../../', 'babel.config.js'),
        exclude: 'node_modules/**',
        babelHelpers: 'runtime',
        extensions,
      }),
      commonjs({}),
    ],
  },
  mergeConfig,
);