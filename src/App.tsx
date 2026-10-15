// Three kinds of page, read off the path once: the site is static, and every
// page is a file of its own (scripts/pages.ts), so following a link reloads.
import { Header, Footer } from './Header'
import { Home } from './pages/Home'
import { Connect } from './pages/Connect'
import { href } from './links'
import { useTheme } from './shared/theme'

function route(): { page: 'home' } | { page: 'connect'; tool?: string } | { page: 'missing' } {
  const path = window.location.pathname
    .slice(import.meta.env.BASE_URL.length)
    .replace(/\/+$/, '')
  if (path === '' || path === 'index.html') return { page: 'home' }
  const [first, tool, ...rest] = path.split('/')
  if (first === 'connect' && rest.length === 0) return { page: 'connect', tool }
  return { page: 'missing' }
}

export function App() {
  const [theme, toggleTheme] = useTheme()
  const r = route()
  return (
    <div className="ap-root" data-ap-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      {r.page === 'home' && <Home />}
      {r.page === 'connect' && <Connect tool={r.tool} />}
      {r.page === 'missing' && (
        <main className="ap-landing" style={{ maxWidth: 640 }}>
          <h1 className="ap-display" style={{ margin: 0 }}>Nothing here</h1>
          <p style={{ color: 'var(--muted)' }}>
            The page has moved or never was. <a href={href('/')}>Back to the start</a>.
          </p>
        </main>
      )}
      <Footer />
    </div>
  )
}
