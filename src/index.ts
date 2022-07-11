import { LoadOptions } from '@commitlint/types'
import { exec } from 'child_process'
import { satisfies } from 'semver'
import { promisify } from 'util'
import { classicHandler } from './handlers/classic'
import { modernHandler } from './handlers/modern'

export const getPackages = ({ cwd = process.cwd() }: LoadOptions = {}) =>
  promisify(exec)('yarn --version', { encoding: 'utf-8' })
    .then(({ stderr, stdout }) => {
      if (stderr) {
        return Promise.reject(Error(stderr))
      }

      if (satisfies(stdout, '1.x')) {
        return classicHandler(cwd)
      }

      return modernHandler()
    })
    .catch((error) => {
      console.error(error)

      return []
    })

export default {
  rules: {
    'scope-enum': (ctx: LoadOptions) => getPackages(ctx).then((packages) => [2, 'always', packages]),
  },
  utils: { getPackages },
}
