import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import path from 'path'
import swc from 'rollup-plugin-swc3'

const root = __dirname

const createConfig = ({ dir, format }) => {
  /** @type {import('rollup').RollupOptions} */
  const config = {
    external: /(semver|@swc\/helpers)/,
    input: 'src/index.ts',
    output: {
      dir,
      exports: 'named',
      format,
      sourcemap: true,
    },
    plugins: [
      alias({
        entries: {
          '~': path.resolve(root, 'src'),
        },
      }),
      nodeResolve({
        extensions: ['.ts'],
      }),
      swc({
        jsc: {
          externalHelpers: true,
        },
        sourceMaps: true,
        tsconfig: path.resolve(root, 'tsconfig.code.json'),
      }),
    ],
  }

  return config
}

export default [createConfig({ dir: 'lib', format: 'cjs' }), createConfig({ dir: 'esm', format: 'esm' })]
