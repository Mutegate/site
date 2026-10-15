import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Bundled rather than fetched from a font CDN, as in the console.
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import './shared/console/theme.css'
import './site.css'
import { App } from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
