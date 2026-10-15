// Copies what the site shares with the gateway's console — the connection
// guides, the theme, the mark — from github.com/Mutegate/mutegate, so the two
// never say different things. The copies in src/shared are not edited here:
// a change goes to the gateway first, then comes over with this.
//
//   npm run sync               copy from the gateway's main branch
//   npm run sync -- --ref next copy from another branch or a tag
//   npm run sync -- --check    fail if the copies differ (CI)
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

const repo = 'Mutegate/mutegate'

// The gateway's path → the path here. The directory layout under src/shared
// mirrors the console's, so the files' own imports work unchanged.
const files: Record<string, string> = {
  'web/src/connect/guides.ts': 'src/shared/connect/guides.ts',
  'web/src/connect/ConnectGuide.tsx': 'src/shared/connect/ConnectGuide.tsx',
  'web/src/console/styles.ts': 'src/shared/console/styles.ts',
  'web/src/console/ui.tsx': 'src/shared/console/ui.tsx',
  'web/src/console/theme.css': 'src/shared/console/theme.css',
  'web/src/theme.ts': 'src/shared/theme.ts',
  'web/public/favicon.svg': 'public/favicon.svg',
}

const args = process.argv.slice(2)
const check = args.includes('--check')
const refAt = args.indexOf('--ref')
const ref = refAt >= 0 ? args[refAt + 1] : 'main'

const local = (path: string) => new URL(`../${path}`, import.meta.url)

let stale = 0
for (const [from, to] of Object.entries(files)) {
  const url = `https://raw.githubusercontent.com/${repo}/${ref}/${from}`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url}: ${res.status}`)
  const upstream = await res.text()
  let current = ''
  try {
    current = readFileSync(local(to), 'utf8')
  } catch {
    // Not copied yet.
  }
  if (current === upstream) continue
  if (check) {
    console.error(`${to} differs from ${repo}@${ref}:${from}`)
    stale++
    continue
  }
  mkdirSync(dirname(local(to).pathname), { recursive: true })
  writeFileSync(local(to), upstream)
  console.log(`${to} ← ${repo}@${ref}`)
}

if (stale > 0) {
  console.error(`\n${stale} shared file(s) out of date: run npm run sync and commit.`)
  process.exit(1)
}
