# SPACEJOY

A home-decor storefront with a full admin dashboard — browsing and filtering, product pages with reviews, a multi-step checkout, and order history. Built with React, Redux Toolkit and React Router, bundled with Vite.

**[Live demo →](https://YOUR-VERCEL-URL.vercel.app)** · sign in as `admin@spacejoy.demo` / `demo1234` to see the admin side

> The deployed site runs in **demo mode**: the catalogue, users and orders are bundled with the app and saved to your browser, so there is no server to keep alive. The same code runs against the real Express + SQL Server backend in [`Backend/`](Backend) by setting one environment variable.

---

## What it does

**Storefront**
- 30 products across 6 categories, each with an image gallery, specifications, stock levels and ratings
- Filter by category, price, rating and availability; six sort orders; pagination
- Search-as-you-type with product suggestions
- Product pages with reviews, a rating distribution, related products and recently viewed
- Cart drawer, wishlist, save-for-later, and undo on removal

**Checkout**
- Address → delivery method → payment, each step validated
- Promo codes, a free-shipping threshold, and an order confirmation with a real order number
- Placing an order draws stock down; order history lives on the account page

**Admin**
- Dashboard with live figures, recent orders and low-stock alerts
- Add, edit and delete products; promote users to admin
- Guarded by a role check — `/admin` redirects anyone who is not an administrator

**Throughout**
- Filter state lives in the URL, so any view is linkable and survives the back button
- Loading skeletons shaped like the real content, and real error and empty states
- Responsive to 375px; cart and session persist across reloads

---

## Running it locally

Requires Node 20+ and pnpm.

```bash
cd Frontend
pnpm install
pnpm dev          # http://localhost:3000
```

That starts in demo mode — no backend needed.

```
Admin    admin@spacejoy.demo   / demo1234
Shopper  shopper@spacejoy.demo / demo1234
```

### Scripts

| Command | What it does |
| --- | --- |
| `pnpm dev` | Vite dev server with HMR |
| `pnpm build` | Production build into `build/` |
| `pnpm preview` | Serve the production build |
| `pnpm lint` | ESLint (flat config, react + hooks rules) |
| `pnpm test:e2e` | 56-check end-to-end suite in real Chrome |
| `pnpm check:images` | Verify every catalogue image still resolves |

`pnpm test:e2e` needs a build first. It serves `build/`, drives it with Playwright through the real user journeys — filtering, search, reviews, the full checkout, stock drawdown, admin CRUD — and fails on any uncaught console or page error.

---

## How it is put together

```
Frontend/
  src/
    lib/
      api.js           the single place the app talks to a server
      useAsync.js      fetch-on-mount hook with cancellation and reload()
      demo/            fixtures, imagery manifest, localStorage-backed database
    redux/
      slices/          cart, auth, wishlist, ui — client state only
      persist.js       persistence with a leading-edge throttle
    Components/
      common/          ProtectedRoute, toasts, cart drawer, skeletons, stars
      …                one folder per screen
  tests/smoke.mjs      end-to-end suite
Backend/
  Auth Service/        Express + JWT + SQL Server
  Business Logic/      products, orders, admin operations
  Email Service/       nodemailer
  Middlewares/         shared auth guards
  Database/            schema and stored procedures
```

Two decisions worth calling out:

**One API surface.** `lib/api.js` is the only module that knows whether a backend exists. With `VITE_API_URL` unset it resolves calls against the bundled demo database; set it and the identical calls go to the Express services. Components call `api.getProducts()` and never branch on which mode is active.

**Redux holds client state only.** The cart, session and wishlist live in Redux and persist across reloads. Server data is fetched per screen through `useAsync`, so it cannot go stale sitting in a store.

### Running against the real backend

```bash
cd Frontend
cp .env.example .env
```

```
VITE_API_URL=http://localhost:5001     # Business Logic service
VITE_AUTH_URL=http://localhost:5006    # Auth service
```

The backend services need a SQL Server instance with the schema in [`Backend/Database/`](Backend/Database). Each service has its own `.env.sample`.

---

## Deploying

The frontend deploys to Vercel as a static SPA. `Frontend/vercel.json` sets the SPA rewrite, long-lived caching for hashed assets, and a few security headers.

Import the repository in Vercel and set the **root directory to `Frontend`** — everything else is picked up from `vercel.json`. Leave `VITE_API_URL` unset so the deployed site runs in demo mode.

---

## Notes on the backend

The `Backend/` services are the original 2022 implementation, kept in the repository as part of the project's history. They are Express apps backed by SQL Server, which does not fit Vercel's serverless model — hence the demo-mode approach for the hosted site.

They are **not production-ready**, and the code carries comments where the gaps are: several admin routes had their auth middleware commented out, one middleware built a query by string interpolation, and password hashing used a bcrypt cost factor of 1. Treat them as a snapshot of earlier work rather than a deployable service.

---

## Credits

Product photography from [Unsplash](https://unsplash.com). Type is Playfair Display and Inter, served by Google Fonts.
