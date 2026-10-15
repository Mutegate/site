// The bar across the site: the mark, the guides, the source, and how to start.
import { Logo } from './shared/console/ui'
import { cli, docs, href, quickstart, repo } from './links'
import type { Theme } from './shared/theme'

const ghost = { padding: '7px 11px', borderRadius: 7, fontSize: 13.5, color: 'var(--muted)' } as const
const accent = { background: 'var(--accent)', color: 'var(--on-accent)', padding: '8px 16px', borderRadius: 7, fontSize: 13.5, fontWeight: 600 } as const

export function Header({ theme, toggleTheme }: { theme: Theme; toggleTheme: () => void }) {
  return (
    <header className="ap-landing-bar">
      <a href={href('/')} style={{ display: 'flex', alignItems: 'center', gap: 9, color: 'var(--text)' }}>
        <Logo />
        <span className="ap-display ap-brand-text" style={{ fontSize: 18 }}>Mutegate</span>
      </a>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <a href={href('/connect/')} className="ap-ghost-btn" style={ghost}>
          Connect
        </a>
        <a href={repo} className="ap-ghost-btn ap-wide-only" style={ghost}>
          GitHub
        </a>
        <button onClick={toggleTheme} className="ap-ghost-btn" aria-label="Switch theme" style={{ background: 'none', border: 'none', padding: '7px 10px', borderRadius: 7, fontSize: 14, color: 'var(--muted)', cursor: 'pointer' }}>
          {theme === 'dark' ? '☀' : '☾'}
        </button>
        <a href={quickstart} className="ap-accent-btn" style={accent}>
          Get started
        </a>
      </nav>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="ap-landing-foot">
      <span style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <a href={repo}>Source</a>
        <a href={`${repo}/releases`}>Releases</a>
        <a href={docs}>Documentation</a>
        <a href={cli}>Command line</a>
      </span>
      <span style={{ fontFamily: 'var(--mono)', fontSize: 12 }}>Apache-2.0 · self-hosted</span>
    </footer>
  )
}
