/** @type {import('@commitlint/types').UserConfig} */
const config = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      referenceActions: ['closes', 'refs'],
    },
  },
  rules: {
    'footer-empty': ['error', 'never'],
    'header-max-length': ['error', 'always', 90],
    'type-empty': ['error', 'never'],
    'type-enum': ['error', 'always', ['ci', 'docs', 'feat', 'fix', 'refactor']],
  },
}

module.exports = config
