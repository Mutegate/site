// Where the site sends people. Everything to run lives in the repositories;
// the site only points at it.
export const repo = 'https://github.com/Mutegate/mutegate'
export const quickstart = `${repo}#quickstart`
export const cli = 'https://github.com/Mutegate/cli'
export const docs = `${repo}/tree/main/docs`

/** A path inside the site, under wherever it is served from. */
export function href(path: string): string {
  return import.meta.env.BASE_URL + path.replace(/^\//, '')
}
