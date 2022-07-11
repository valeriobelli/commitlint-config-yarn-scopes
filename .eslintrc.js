const path = require('path')

const tsProjectPath = path.join(__dirname, 'tsconfig.eslint.json')

/** @type {import('eslint').Linter.BaseConfig} */
const config = {
  env: {
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: ['eslint:recommended', 'plugin:node/recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  globals: {
    process: true,
  },
  overrides: [
    {
      files: ['.eslintrc.js'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    project: tsProjectPath,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    'node/no-missing-import': 'off',
    'node/no-unsupported-features/es-syntax': 'off',
    'sort-keys': ['warn', 'asc', { natural: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['mjs', 'js', 'ts', 'tsx'],
      },
      typescript: {
        project: tsProjectPath,
      },
    },
  },
}

module.exports = config
