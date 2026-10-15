import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Where the site is served from: a path on GitHub Pages until the project has
// a domain of its own, then the root. Links inside the site follow it.
export default defineConfig({
  base: process.env.SITE_BASE ?? '/',
  plugins: [react()],
})
