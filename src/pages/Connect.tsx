// The guides: how to point each tool at a Mutegate gateway, and what the
// gateway then does to its traffic. The same guides an installation serves at
// /connect, with a stand-in address; the selected tool lives in the URL.
import { useState } from 'react'
import { card } from '../shared/console/styles'
import { ConnectGuide } from '../shared/connect/ConnectGuide'
import { explainer, guides } from '../shared/connect/guides'
import { href, quickstart } from '../links'

// An installation fills in its own address; here, the reader replaces this.
const base = 'https://mutegate.your-company.internal'

export function Connect({ tool: initial }: { tool?: string }) {
  const [tool, setTool] = useState(guides.some((g) => g.id === initial) ? initial : undefined)
  const choose = (id: string) => {
    setTool(id)
    // A guide can be linked to; switching one is not worth a Back step.
    window.history.replaceState(null, '', href(`/connect/${id}/`))
  }
  return (
    <main className="ap-landing" style={{ maxWidth: 960 }}>
      <section>
        <h1 className="ap-display" style={{ fontSize: 'clamp(28px, 3.6vw, 40px)', margin: 0, fontWeight: 700, letterSpacing: '-1px' }}>
          Connect your agent
        </h1>
        <p style={{ fontSize: 15, color: 'var(--muted)', maxWidth: 640, margin: '12px 0 0' }}>
          Point the tool at your Mutegate gateway instead of the provider, with a Mutegate key instead of the
          provider's. The provider's own key stays on the gateway. Keys are created in your gateway's console,
          under Settings → API keys, where these same snippets come with your address and key filled in. No
          gateway yet? <a href={quickstart}>Run one</a>.
        </p>
      </section>

      <section style={{ ...card, padding: '22px 24px' }}>
        <ConnectGuide base={base} tool={tool} onTool={choose} />
      </section>

      <section>
        <h2 className="ap-display" style={{ fontSize: 20, margin: '0 0 12px' }}>What happens to the traffic</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: 14 }}>
          {explainer.map((e) => (
            <div key={e.title} style={{ ...card, padding: '18px 20px' }}>
              <div style={{ fontWeight: 600, fontSize: 14.5, marginBottom: 6 }}>{e.title}</div>
              <div style={{ color: 'var(--muted)', fontSize: 13.5, lineHeight: 1.55 }}>{e.body}</div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
