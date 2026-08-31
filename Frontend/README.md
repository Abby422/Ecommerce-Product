# SPACEJOY — Frontend

A home-decor storefront with a full admin dashboard. React 18, Redux Toolkit, React Router 6, built with Vite.

## Running it

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

That starts the app in **demo mode**: no backend required. Catalogue, users and
orders come from `src/lib/demo/`, and anything you change in the admin area is
saved to your browser's `localStorage`.

```
Demo admin — admin@spacejoy.demo / demo1234
```

To run against the real Express + SQL Server backend in `../Backend`, copy
`.env.example` to `.env` and fill in the two URLs:

```bash
VITE_API_URL=http://localhost:5001     # Business Logic service
VITE_AUTH_URL=http://localhost:5006    # Auth service
```

`src/lib/api.js` is the only module that knows which mode is active. Components
call `api.getProducts()` and friends and never branch on it.

## Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server with HMR |
| `pnpm build` | Production build into `build/` |
| `pnpm preview` | Serve the production build locally |
| `pnpm lint` | ESLint (flat config, react + hooks rules) |
| `pnpm test:e2e` | 21-check end-to-end smoke test in real Chrome |

`pnpm test:e2e` needs a build first — it serves `build/` and drives it with
Playwright, failing on any uncaught console or page error.

## Layout

```
src/
  lib/
    api.js           single API surface; demo mode lives behind the same calls
    useAsync.js      fetch-on-mount hook with cancellation and a reload()
    placeholder.js   inline SVG fallback for images that fail to load
    demo/            fixtures + a localStorage-backed database
  redux/
    slices/          cart and auth — client state only
    persist.js       localStorage persistence with a leading-edge throttle
  Components/
    common/          ProtectedRoute, loading/error/empty blocks, demo banner
    …                one folder per screen, each with its own stylesheet
```

Server data is not kept in Redux. Each screen fetches what it needs through
`useAsync`, so it can't go stale; Redux holds the cart and the session, which
are genuinely client state and are persisted across reloads.

## Deploying

Vercel picks this up as a Vite project. `vercel.json` sets the SPA rewrite,
long-lived caching for hashed assets, and a few security headers.

Leave `VITE_API_URL` unset in the Vercel project and the deployed site runs in
demo mode, which is what makes it work as a portfolio piece with no server to
keep alive.
