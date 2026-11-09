# Maetasit Pittatanang – Portfolio

Vite + React + React Router. Content lives in `src/data.js`; styles in `src/styles.css`.

## Run locally
```
npm install
npm run dev
```

## Deploy free (Vercel or Cloudflare Pages)
1. Push this folder to a GitHub repository.
2. Vercel: New Project → import the repo → framework "Vite" → Deploy.
   Cloudflare Pages: Create project → connect repo → build command `npm run build`, output `dist`.
3. Every push to `main` redeploys automatically. You get a free `*.vercel.app` or `*.pages.dev` link.

## Deploy without Git (drag and drop)
`npm run build` creates the `dist/` folder. Upload that folder to Netlify Drop (app.netlify.com/drop) or Cloudflare Pages "Direct Upload". No account setup beyond signing in.

## Before publishing
- Set `resumeUrl` in `src/data.js` and put a web-safe resume PDF in `public/` (without phone number or GPA).
- Routing uses `HashRouter`, so no server rewrite rules are needed.
