import { cpSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
cpSync(resolve(projectRoot, 'js'), resolve(projectRoot, 'dist/js'), { recursive: true })
