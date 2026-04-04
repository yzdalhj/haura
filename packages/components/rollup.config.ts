import { defineConfig } from 'rollup'
import vue from 'rollup-plugin-vue'
import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import dts from 'rollup-plugin-dts'

const input = 'src/index.ts'

export default defineConfig([
  // ESM build
  {
    input,
    output: {
      format: 'esm',
      dir: 'dist/esm',
      preserveModules: true,
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      vue({ target: '3.3' }),
      typescript({
        tsconfig: '../../tsconfig.build.json',
        declaration: false,
      }),
      nodeResolve(),
      commonjs(),
      postcss({
        extract: 'style.css',
        minimize: true,
      }),
    ],
    external: ['vue', '@haura/theme', '@haura/motion', '@haura/utils', '@haura/locale'],
  },
  // CJS build
  {
    input,
    output: {
      format: 'cjs',
      dir: 'dist/cjs',
      preserveModules: true,
      sourcemap: true,
      exports: 'named',
    },
    plugins: [
      vue({ target: '3.3' }),
      typescript({
        tsconfig: '../../tsconfig.build.json',
        declaration: false,
      }),
      nodeResolve(),
      commonjs(),
      postcss({
        extract: 'style.css',
        minimize: true,
      }),
    ],
    external: ['vue', '@haura/theme', '@haura/motion', '@haura/utils', '@haura/locale'],
  },
  // Type declarations
  {
    input,
    output: {
      dir: 'dist/types',
      format: 'esm',
    },
    plugins: [
      dts({
        tsconfig: '../../tsconfig.build.json',
      }),
    ],
    external: ['vue', '@haura/theme', '@haura/motion', '@haura/utils', '@haura/locale'],
  },
])