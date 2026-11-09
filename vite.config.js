import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// SINGLE=1 builds one self-contained HTML file (used for the live preview).
// A normal `npm run build` produces the regular dist/ folder for Vercel / Cloudflare Pages.
export default defineConfig({
  base: './',
  plugins: [react(), ...(process.env.SINGLE ? [viteSingleFile()] : [])],
})
