import { exec } from 'child_process'
import { promisify } from 'util'
import { getScope } from '~/utils/getScope'

export const modernHandler = () =>
  promisify(exec)('yarn workspaces list --json', { encoding: 'utf-8' })
    .then(({ stderr, stdout }) => {
      if (stderr) {
        return Promise.reject(stderr)
      }

      return stdout.split('\n')
    })
    .then((lines) => lines.filter(Boolean))
    .then((packagesAsString) => packagesAsString.map((packageAsString) => JSON.parse(packageAsString)))
    .then((packages) => packages.map(({ name }) => getScope(name)))
    .catch((error) => {
      console.error(error)

      return [] as string[]
    })
