import { exec } from 'child_process'
import { readFile } from 'fs/promises'
import path from 'path'
import { promisify } from 'util'
import { getScope } from '~/utils/getScope'

export const classicHandler = (cwd: string) =>
  readFile(path.join(cwd, 'package.json'), { encoding: 'utf-8' })
    .then((file) => JSON.parse(file))
    .then(({ workspaces, name }: { workspaces?: string[]; name: string }) => {
      if (Array.isArray(workspaces)) {
        return promisify(exec)('yarn workspaces info', { encoding: 'utf-8' })
          .then(({ stderr, stdout }) => {
            if (stderr) {
              return Promise.reject(stderr)
            }

            return stdout.split('\n').filter(Boolean)
          })
          .then((outputLines) => {
            if (outputLines[0].includes('yarn workspaces')) {
              outputLines.splice(0, 1)
            }

            if (outputLines[outputLines.length - 1].includes('Done')) {
              outputLines.splice(outputLines.length - 1, 1)
            }

            return Object.keys(JSON.parse(outputLines.join('\n'))).map(getScope)
          })
          .catch((error) => {
            console.error(error)

            return [] as string[]
          })
      }

      return Promise.resolve([getScope(name)])
    })
