import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const root = process.cwd()
const outputFile = resolve(root, 'dist', 'index.html')
const serverEntry = resolve(root, 'dist', 'server', 'entry-server.js')

const template = await readFile(outputFile, 'utf8')
const { render } = await import(pathToFileURL(serverEntry).href)
const html = render()

if (!template.includes('<div id="root"></div>')) {
  throw new Error('Could not find the empty React root in dist/index.html')
}

await writeFile(
  outputFile,
  template.replace('<div id="root"></div>', `<div id="root">${html}</div>`),
  'utf8',
)
await rm(resolve(root, 'dist', 'server'), { recursive: true, force: true })

console.log('Prerendered the portfolio homepage into dist/index.html')
