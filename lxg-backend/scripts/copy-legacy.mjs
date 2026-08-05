import { cpSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distJs = resolve(projectRoot, 'dist/js')
rmSync(distJs, { recursive: true, force: true })
cpSync(resolve(projectRoot, 'js'), distJs, { recursive: true })
