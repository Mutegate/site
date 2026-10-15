// Gives every address of the site a file of its own after the build, so a
// static host (GitHub Pages) answers /connect/claude-code/ with the page and
// not a 404. Each is the same index.html; the app reads the path.
import { copyFileSync, mkdirSync } from 'node:fs'
import { guides } from '../src/shared/connect/guides.ts'

const dist = new URL('../dist/', import.meta.url)
const index = new URL('index.html', dist)

const pages = ['connect', ...guides.map((g) => `connect/${g.id}`)]
for (const page of pages) {
  const dir = new URL(`${page}/`, dist)
  mkdirSync(dir, { recursive: true })
  copyFileSync(index, new URL('index.html', dir))
}
// Anything else: the app shows its not-found page.
copyFileSync(index, new URL('404.html', dist))
console.log(`pages: / and ${pages.length} more, plus 404.html`)
