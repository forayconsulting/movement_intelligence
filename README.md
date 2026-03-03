# Movement Intelligence

Restorative movement session builder for David O'Connell. Users select body regions on an interactive body map, choose session length and equipment, then receive an AI-generated corrective exercise session based on somatic movement, Original Strength, AIS, and NASM corrective exercise methodologies.

**Live:** [movement-intelligence.pages.dev](https://movement-intelligence.pages.dev)

## Architecture

- **Frontend:** Vanilla JS (ES modules), deployed as static assets on Cloudflare Pages
- **Backend:** Cloudflare Pages Function (`functions/api/session.js`) calls the Anthropic API (Claude Sonnet 4.6) to generate structured session plans
- **No build step** — source files in `app/public/` are deployed directly

## Project Structure

```
app/
  public/           # Static frontend (deployed to Cloudflare Pages)
    index.html      # Single-page app shell
    css/style.css   # All styles
    js/
      app.js        # Entry point — orchestrates views and data flow
      body-map.js   # Interactive body map with SVG region overlays
      controls.js   # Sidebar controls (session length, equipment, build)
      regions.js    # Body region definitions (polygons, muscles)
      session.js    # Session plan renderer
      api.js        # Fetch wrapper for POST /api/session
    images/         # Body map images (skin/muscle, front/back), hero, icons
  functions/
    api/
      session.js    # Cloudflare Pages Function — Anthropic API integration
  server.js         # Local Express dev server
  package.json
reqs/               # Requirements docs, analysis, image specs
```

## Local Development

```bash
cd app
npm install
npm run dev          # Express server with nodemon on http://localhost:3000
```

## Deployment

Deployed to Cloudflare Pages. The `ANTHROPIC_API_KEY` secret is configured via Cloudflare dashboard/CLI.

```bash
cd app
npx wrangler pages deploy public --project-name=movement-intelligence
```

## Key Design Decisions

- **View/Layer controls** live as a floating overlay on the body map (not in the sidebar) to keep the left panel compact
- **Session generation** uses a detailed system prompt enforcing a 5-phase sequence (Reset, Mobilize, Lengthen, Strengthen, Integrate) with strict biomechanical constraints
- **Open kinetic chain only** — all prescribed movements keep the distal segment free
- **Scaling** — every exercise includes Good/Better/Best progressions
