// End-to-end smoke test for the demo build.
//
//   pnpm build && pnpm test:e2e
//
// Drives a real Chrome against `vite preview`, walking the paths that were
// broken in the original app: the product list, the cart, admin auth, and the
// admin CRUD screens. Fails on any uncaught console or page error too.

import { chromium } from 'playwright';

import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = process.env.PORT || 4321;
const BASE = process.env.BASE || `http://127.0.0.1:${PORT}`;

// Reuse an already-running preview server if there is one, otherwise start it.
let server = null;
const reachable = async () => {
  try {
    const res = await fetch(BASE, { signal: AbortSignal.timeout(1500) });
    return res.ok;
  } catch {
    return false;
  }
};

if (!(await reachable())) {
  server = spawn(
    'npx',
    ['vite', 'preview', '--port', String(PORT), '--strictPort', '--host', '127.0.0.1'],
    { stdio: 'ignore', detached: false },
  );
  for (let i = 0; i < 40 && !(await reachable()); i += 1) await sleep(250);
  if (!(await reachable())) {
    console.error(`Preview server never came up on ${BASE}. Did you run \`pnpm build\` first?`);
    server.kill();
    process.exit(1);
  }
}

const results = [];
const errors = [];

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

page.on('console', (msg) => {
  if (msg.type() === 'error') errors.push(`console: ${msg.text()}`);
});
page.on('pageerror', (err) => errors.push(`pageerror: ${err.message}`));

const check = async (name, fn) => {
  try {
    await fn();
    results.push(`PASS  ${name}`);
  } catch (err) {
    results.push(`FAIL  ${name} — ${err.message.split('\n')[0]}`);
  }
};

// ---------- stylesheet integrity ----------

// An unclosed rule in one component stylesheet silently nests every later rule
// inside it, so a stray brace in the landing page can strip the styling off the
// product page. Cheap to check, and invisible until someone looks at the page.
await check('every stylesheet has balanced braces', async () => {
  const { readdirSync, readFileSync, statSync } = await import('node:fs');
  const { join } = await import('node:path');
  const walk = (dir) =>
    readdirSync(dir).flatMap((entry) => {
      const full = join(dir, entry);
      return statSync(full).isDirectory() ? walk(full) : [full];
    });
  const bad = walk('src')
    .filter((f) => f.endsWith('.css'))
    .map((f) => {
      const text = readFileSync(f, 'utf8');
      const open = (text.match(/\{/g) || []).length;
      const close = (text.match(/\}/g) || []).length;
      return open === close ? null : `${f} (${open} open, ${close} close)`;
    })
    .filter(Boolean);
  if (bad.length) throw new Error(bad.join('; '));
});

await check('product detail keeps its two-column layout', async () => {
  await page.goto(`${BASE}/product/2`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.product');
  const cols = await page.evaluate(
    () => getComputedStyle(document.querySelector('.product')).gridTemplateColumns.split(' ').length,
  );
  if (cols !== 2) throw new Error(`.product resolved to ${cols} column(s) — stylesheet not applied`);
  const crumbs = await page.evaluate(
    () => getComputedStyle(document.querySelector('.breadcrumbs ol')).display,
  );
  if (crumbs !== 'flex') throw new Error(`breadcrumbs display is "${crumbs}"`);
});

// ---------- browse & discover ----------

await check('landing page renders featured products and category tiles', async () => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 8000 });
  const cards = await page.locator('#shop .products-card').count();
  if (cards !== 8) throw new Error(`expected 8 featured cards, got ${cards}`);
  const tiles = await page.locator('.category-tile').count();
  if (tiles !== 6) throw new Error(`expected 6 category tiles, got ${tiles}`);
});

// Counting cards is not enough: the featured grid once rendered all eight in a
// full-bleed stack because the stylesheet defining `.products` belonged to a
// component the landing page had stopped importing. Assert the layout resolved.
await check('featured grid lays out as a real multi-column grid', async () => {
  const grid = await page.evaluate(() => {
    const el = document.querySelector('#shop .products');
    if (!el) return null;
    const cs = getComputedStyle(el);
    return {
      display: cs.display,
      columns: cs.gridTemplateColumns.split(' ').filter(Boolean).length,
      width: Math.round(el.getBoundingClientRect().width),
      viewport: document.documentElement.clientWidth,
    };
  });
  if (!grid) throw new Error('#shop .products not found');
  if (grid.display !== 'grid') throw new Error(`display is "${grid.display}"`);
  if (grid.columns < 3) throw new Error(`resolved to ${grid.columns} column(s)`);
  if (grid.width >= grid.viewport) {
    throw new Error(`grid is ${grid.width}px inside a ${grid.viewport}px viewport — not contained`);
  }
});

await check('every product image on the landing page actually loaded', async () => {
  // Cards below the fold are `loading="lazy"`, so scroll the page first —
  // otherwise this only proves the first row was requested.
  await page.evaluate(async () => {
    const step = window.innerHeight;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(
    () => [...document.querySelectorAll('.products-card img')].every((img) => img.complete),
    { timeout: 15000 },
  );
  const broken = await page.evaluate(() =>
    [...document.querySelectorAll('.products-card img')]
      .filter((img) => img.naturalWidth === 0)
      .map((img) => img.alt || img.src),
  );
  if (broken.length) throw new Error(`${broken.length} broken: ${broken.slice(0, 3).join(', ')}`);
});

await check('skeletons appear before products load', async () => {
  await page.goto(`${BASE}/shop`, { waitUntil: 'commit' });
  await page.waitForSelector('.skeleton-card', { timeout: 5000 });
  await page.waitForSelector('.products-card', { timeout: 8000 });
});

await check('shop lists the full catalogue with pagination', async () => {
  await page.goto(`${BASE}/shop`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card');
  const count = await page.locator('.shop__results .products-card').count();
  if (count !== 12) throw new Error(`expected 12 per page, got ${count}`);
  const summary = await page.locator('.shop__count').innerText();
  if (!summary.includes('30 products')) throw new Error(`count reads "${summary}"`);
});

await check('category filter narrows results and is reflected in the URL', async () => {
  await page.locator('.filter-option', { hasText: 'Lighting' }).locator('input').check();
  await page.waitForTimeout(700);
  if (!page.url().includes('category=lighting')) throw new Error(`url is ${page.url()}`);
  const summary = await page.locator('.shop__count').innerText();
  if (!summary.includes('5 products')) throw new Error(`lighting count reads "${summary}"`);
});

await check('a filtered URL is shareable (survives a reload)', async () => {
  const url = page.url();
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card');
  const summary = await page.locator('.shop__count').innerText();
  if (!summary.includes('5 products')) throw new Error(`after reload reads "${summary}"`);
});

await check('a filter chip clears the filter', async () => {
  await page.locator('.chip', { hasText: 'Lighting' }).click();
  await page.waitForTimeout(700);
  const summary = await page.locator('.shop__count').innerText();
  if (!summary.includes('30 products')) throw new Error(`after clearing reads "${summary}"`);
});

await check('sorting by price orders the grid ascending', async () => {
  await page.locator('.sort-control select').selectOption('price-asc');
  await page.waitForTimeout(700);
  const prices = await page.locator('.shop__results .price-now').allInnerTexts();
  const numbers = prices.map((p) => Number(p.replace(/[^0-9.]/g, '')));
  const sorted = [...numbers].sort((a, b) => a - b);
  if (JSON.stringify(numbers) !== JSON.stringify(sorted)) {
    throw new Error(`not ascending: ${numbers.slice(0, 5).join(', ')}`);
  }
});

await check('price and availability filters combine', async () => {
  await page.goto(`${BASE}/shop?maxPrice=200&inStock=1`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card, .status--empty');
  const prices = await page.locator('.shop__results .price-now').allInnerTexts();
  const over = prices.map((p) => Number(p.replace(/[^0-9.]/g, ''))).filter((n) => n > 200);
  if (over.length) throw new Error(`${over.length} products over the $200 cap`);
  const soldOut = await page.locator('.flag--out').count();
  if (soldOut) throw new Error('sold-out product shown under in-stock filter');
});

await check('an over-narrow filter shows an empty state, not a blank grid', async () => {
  await page.goto(`${BASE}/shop?maxPrice=25&rating=4.5`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.status--empty', { timeout: 6000 });
});

await check('category nav route filters to that category', async () => {
  await page.goto(`${BASE}/category/bedroom`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card');
  const heading = await page.locator('.shop__head h1').innerText();
  if (heading !== 'Bedroom') throw new Error(`heading reads "${heading}"`);
  const summary = await page.locator('.shop__count').innerText();
  if (!summary.includes('5 products')) throw new Error(`bedroom count reads "${summary}"`);
});

await check('search suggestions appear while typing', async () => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.fill('#site-search', 'lamp');
  await page.waitForSelector('.suggestions button', { timeout: 5000 });
  const results = await page.locator('.suggestions li').count();
  if (results < 2) throw new Error(`only ${results} suggestion rows`);
});

await check('clicking a suggestion opens that product', async () => {
  await page.locator('.suggestions button').first().click();
  await page.waitForSelector('.detail-container h1', { timeout: 6000 });
  if (!page.url().includes('/product/')) throw new Error(`landed on ${page.url()}`);
});

await check('breadcrumbs render the category trail', async () => {
  const crumbs = await page.locator('.breadcrumbs li').allInnerTexts();
  if (crumbs.length < 4) throw new Error(`only ${crumbs.length} crumbs`);
  if (!crumbs[0].includes('Home')) throw new Error(`first crumb is "${crumbs[0]}"`);
});

// ---------- product detail ----------

await check('product detail shows gallery, specs and assurances', async () => {
  await page.goto(`${BASE}/product/2`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.detail-container h1');
  const title = await page.locator('.detail-container h1').innerText();
  if (!title.includes('Emerald')) throw new Error(`title reads "${title}"`);
  const thumbs = await page.locator('.gallery__thumb').count();
  if (thumbs !== 3) throw new Error(`expected 3 gallery thumbs, got ${thumbs}`);
  const specs = await page.locator('.spec-table dl > div').count();
  if (specs < 4) throw new Error(`only ${specs} spec rows`);
  await page.waitForSelector('.assurances li');
});

await check('gallery thumbnails swap the main image', async () => {
  const before = await page.locator('.gallery__main img').getAttribute('src');
  await page.locator('.gallery__thumb').nth(1).click();
  await page.waitForTimeout(250);
  const after = await page.locator('.gallery__main img').getAttribute('src');
  if (before === after) throw new Error('main image did not change');
});

await check('reviews render with a rating distribution', async () => {
  await page.waitForSelector('.reviews__average');
  const average = await page.locator('.reviews__average').innerText();
  if (!/^\d\.\d$/.test(average)) throw new Error(`average reads "${average}"`);
  const bars = await page.locator('.reviews__bar').count();
  if (bars !== 5) throw new Error(`expected 5 distribution bars, got ${bars}`);
  const reviews = await page.locator('.review').count();
  if (reviews < 3) throw new Error(`only ${reviews} reviews rendered`);
});

await check('related products rail is populated', async () => {
  const rails = await page.locator('.product-rail').count();
  if (rails < 1) throw new Error('no product rail rendered');
  const items = await page.locator('.product-rail').first().locator('.products-card').count();
  if (items !== 4) throw new Error(`expected 4 related products, got ${items}`);
});

await check('quantity selector adds that many to the cart', async () => {
  await page.locator('.qty-select select').selectOption('3');
  await page.getByRole('button', { name: /Add to cart/i }).first().click();
  await page.waitForSelector('.nav-badge', { timeout: 5000 });
  const badge = await page.locator('.abby-navigation-left .nav-badge').last().innerText();
  if (badge !== '3') throw new Error(`cart badge reads "${badge}"`);
});

await check('adding to cart raises a toast with a view-cart action', async () => {
  await page.waitForSelector('.toast', { timeout: 4000 });
  const text = await page.locator('.toast__message').first().innerText();
  if (!text.includes('added')) throw new Error(`toast reads "${text}"`);
  await page.waitForSelector('.toast__action', { timeout: 3000 });
});

await check('recently viewed rail appears after browsing', async () => {
  await page.goto(`${BASE}/product/8`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.detail-container h1');
  const titles = await page.locator('.product-rail h2').allInnerTexts();
  if (!titles.some((t) => t.includes('Recently viewed'))) {
    throw new Error(`rails are: ${titles.join(', ')}`);
  }
});

// ---------- wishlist ----------

await check('wishlist heart saves a product', async () => {
  await page.locator('.wish-inline').click();
  await page.waitForTimeout(400);
  const badge = await page.locator('a[href="/wishlist"] .nav-badge').innerText();
  if (badge !== '1') throw new Error(`wishlist badge reads "${badge}"`);
});

await check('wishlist page lists the saved product', async () => {
  await page.goto(`${BASE}/wishlist`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 6000 });
  const count = await page.locator('.products-card').count();
  if (count !== 1) throw new Error(`expected 1 saved product, got ${count}`);
});

await check('wishlist survives a reload', async () => {
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 6000 });
});

// ---------- cart drawer ----------

await check('cart drawer opens from the nav', async () => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: /Open cart/i }).click();
  await page.waitForSelector('.drawer', { timeout: 4000 });
  await page.waitForSelector('.drawer-item');
});

await check('drawer shows free-shipping progress', async () => {
  await page.waitForSelector('.drawer__shipping .progress');
  const text = await page.locator('.drawer__shipping p').innerText();
  if (!/free shipping/i.test(text)) throw new Error(`shipping note reads "${text}"`);
});

await check('escape closes the drawer', async () => {
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);
  if (await page.locator('.drawer').count()) throw new Error('drawer still open');
});

// ---------- cart page ----------

await check('cart page totals line up with quantities', async () => {
  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.product-row');
  const qty = await page.locator('.quantity-count span').first().innerText();
  const price = await page.locator('.product-row__price').first().innerText();
  const total = await page.locator('.product-row__total').first().innerText();
  const n = (v) => Number(v.replace(/[^0-9.]/g, ''));
  if (n(total) !== n(price) * Number(qty)) {
    throw new Error(`${price} × ${qty} should be ${n(price) * Number(qty)}, shows ${total}`);
  }
});

await check('removing an item offers an undo that restores it', async () => {
  const before = await page.locator('.product-row').count();
  await page.locator('.product-row .link-button.danger').first().click();
  await page.waitForSelector('.toast__action', { timeout: 4000 });
  await page.locator('.toast__action').click();
  await page.waitForTimeout(500);
  const after = await page.locator('.product-row').count();
  if (after !== before) throw new Error(`rows went ${before} -> ${after} after undo`);
});

// ---------- checkout ----------

await check('checkout blocks an empty address form', async () => {
  await page.goto(`${BASE}/checkout`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.steps');
  await page.getByRole('button', { name: 'Continue to delivery' }).click();
  await page.waitForSelector('.field__error', { timeout: 4000 });
  const heading = await page.locator('.panel h2').innerText();
  if (heading !== 'Delivery address') throw new Error(`advanced to "${heading}"`);
});

await check('address step accepts valid input and advances', async () => {
  await page.fill('#fullName', 'Abigail Theuri');
  await page.fill('#email', 'abby@example.com');
  await page.fill('#line1', '14 Riverside Drive');
  await page.fill('#city', 'Nairobi');
  await page.fill('#postcode', '00100');
  await page.getByRole('button', { name: 'Continue to delivery' }).click();
  await page.waitForSelector('.methods', { timeout: 5000 });
});

await check('choosing express shipping updates the order total', async () => {
  const before = await page.locator('.totals__grand dd').innerText();
  await page.locator('.method', { hasText: 'Express' }).locator('input').check();
  await page.waitForTimeout(400);
  const after = await page.locator('.totals__grand dd').innerText();
  if (before === after) throw new Error(`total unchanged at ${after}`);
});

await check('an invalid promo code is rejected', async () => {
  await page.fill('#promo', 'NOTAREALCODE');
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.waitForSelector('.field__error', { timeout: 4000 });
});

await check('a valid promo code discounts the total', async () => {
  const before = Number((await page.locator('.totals__grand dd').innerText()).replace(/[^0-9.]/g, ''));
  await page.fill('#promo', 'SPACEJOY10');
  await page.getByRole('button', { name: 'Apply' }).click();
  await page.waitForSelector('.promo__applied', { timeout: 5000 });
  const after = Number((await page.locator('.totals__grand dd').innerText()).replace(/[^0-9.]/g, ''));
  if (after >= before) throw new Error(`total went ${before} -> ${after}`);
});

await check('payment step rejects a malformed card', async () => {
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  await page.waitForSelector('#cardNumber', { timeout: 5000 });
  await page.fill('#cardName', 'A Theuri');
  await page.fill('#cardNumber', '123');
  await page.fill('#expiry', '13');
  await page.fill('#cvc', '1');
  await page.getByRole('button', { name: /^Pay / }).click();
  await page.waitForSelector('.field__error', { timeout: 4000 });
  if (page.url().includes('/order/')) throw new Error('order placed with a bad card');
});

await check('a valid card places the order and shows a confirmation', async () => {
  await page.fill('#cardNumber', '4242 4242 4242 4242');
  await page.fill('#expiry', '12/28');
  await page.fill('#cvc', '123');
  await page.getByRole('button', { name: /^Pay / }).click();
  await page.waitForSelector('.order-hero', { timeout: 10000 });
  if (!/\/order\/SJ-\d+/.test(page.url())) throw new Error(`landed on ${page.url()}`);
  const body = await page.locator('.order-hero').innerText();
  if (!body.includes('SJ-')) throw new Error('no order number shown');
});

await check('the cart is empty after checkout', async () => {
  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.cart-empty', { timeout: 5000 });
});

await check('placing an order draws stock down', async () => {
  // The order was 3 units of product 2, which started with 5 in stock.
  await page.goto(`${BASE}/product/2`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.stock-line');
  const line = await page.locator('.stock-line').innerText();
  if (!line.includes('2')) throw new Error(`stock line reads "${line}"`);
});

// ---------- account ----------

await check('/account redirects an anonymous visitor to sign in', async () => {
  await page.goto(`${BASE}/account`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  if (!page.url().includes('/login')) throw new Error(`landed on ${page.url()}`);
});

await check('a shopper can sign in and see seeded order history', async () => {
  await page.fill('#email', 'shopper@spacejoy.demo');
  await page.fill('#password', 'demo1234');
  await page.getByRole('button', { name: 'Login' }).click();
  // Wait for the redirect the login itself performs before navigating again —
  // a goto here would race the async sign-in and drop the session.
  await page.waitForSelector('.account__header', { timeout: 8000 });
  await page.waitForSelector('.order-row', { timeout: 6000 });
  const orders = await page.locator('.order-row').count();
  if (orders !== 2) throw new Error(`expected 2 seeded orders, got ${orders}`);
});

await check('an order row opens its detail page', async () => {
  await page.locator('.order-row__id').first().click();
  await page.waitForSelector('.order-items', { timeout: 6000 });
  await page.waitForSelector('.order-address');
});

await check('a signed-in shopper can post a review', async () => {
  await page.goto(`${BASE}/product/16`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.reviews');
  const before = await page.locator('.review').count();
  await page.getByRole('button', { name: 'Write a review' }).click();
  await page.fill('#review-body', 'Held up well after a month of daily use in a busy kitchen.');
  await page.getByRole('button', { name: 'Post review' }).click();
  await page.waitForTimeout(900);
  const after = await page.locator('.review').count();
  if (after !== before + 1) throw new Error(`reviews went ${before} -> ${after}`);
});

// ---------- admin ----------

await check('/admin redirects a non-admin shopper away', async () => {
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  if (page.url().includes('/admin/dashboard') || (await page.locator('.dashboard').count())) {
    throw new Error('a shopper reached the admin dashboard');
  }
});

await check('wrong admin password shows an error', async () => {
  await page.goto(`${BASE}/adminLogin`, { waitUntil: 'networkidle' });
  await page.fill('#admin-email', 'admin@spacejoy.demo');
  await page.fill('#admin-password', 'wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('.form-error', { timeout: 5000 });
});

await check('admin dashboard shows real figures and recent orders', async () => {
  await page.fill('#admin-password', 'demo1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('.dashboard .flashcard', { timeout: 6000 });
  const products = await page.locator('.flashcard3 .number').innerText();
  if (products !== '30') throw new Error(`product count reads "${products}", expected 30`);
  const orders = await page.locator('.admin-panel .admin-table tbody tr').count();
  if (orders < 1) throw new Error('no recent orders listed');
});

await check('admin can add a product', async () => {
  await page.goto(`${BASE}/admin/addProduct`, { waitUntil: 'networkidle' });
  await page.fill('#productName', 'Smoke Test Lamp');
  await page.fill('#productDesc', 'Added by the automated smoke test.');
  await page.fill('#productImg', 'https://example.com/lamp.jpg');
  await page.fill('#productPrice', '199');
  await page.fill('#quantity', '5');
  await page.getByRole('button', { name: 'Add Product' }).click();
  await page.waitForSelector('.admin-table', { timeout: 6000 });
  const body = await page.locator('.admin-table').innerText();
  if (!body.includes('Smoke Test Lamp')) throw new Error('new product not in the table');
});

await check('admin can edit that product', async () => {
  const row = page.locator('tr', { hasText: 'Smoke Test Lamp' });
  await row.getByRole('link').click();
  await page.waitForSelector('#name', { timeout: 6000 });
  await page.fill('#name', 'Smoke Test Lamp v2');
  await page.getByRole('button', { name: 'Update Product' }).click();
  await page.waitForSelector('.admin-table', { timeout: 6000 });
  const body = await page.locator('.admin-table').innerText();
  if (!body.includes('Smoke Test Lamp v2')) throw new Error('edit did not persist');
});

await check('delete removes the right row (needs confirm)', async () => {
  await page.goto(`${BASE}/admin/deleteProduct`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.admin-table', { timeout: 6000 });
  const before = await page.locator('.admin-table tbody tr').count();
  const row = page.locator('tr', { hasText: 'Smoke Test Lamp v2' });
  await row.getByRole('button', { name: /Delete Smoke Test Lamp v2/i }).click();
  await row.getByRole('button', { name: 'Confirm' }).click();
  await page.waitForTimeout(900);
  const after = await page.locator('.admin-table tbody tr').count();
  if (after !== before - 1) throw new Error(`rows went ${before} -> ${after}`);
  const body = await page.locator('.admin-table').innerText();
  if (body.includes('Smoke Test Lamp v2')) throw new Error('deleted the wrong row');
});

await check('set admin lists users and changes a role', async () => {
  await page.goto(`${BASE}/admin/setAdmin`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.admin-table', { timeout: 6000 });
  const rows = await page.locator('.admin-table tbody tr').count();
  if (rows !== 4) throw new Error(`expected 4 users, got ${rows}`);
  await page.locator('#role-3').selectOption('Admin');
  await page.waitForTimeout(900);
  const value = await page.locator('#role-3').inputValue();
  if (value !== 'Admin') throw new Error(`role reads "${value}"`);
});

await check('sign out drops the admin session', async () => {
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForTimeout(500);
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  if (!page.url().includes('/adminLogin')) throw new Error(`still at ${page.url()}`);
});

// ---------- misc ----------

await check('unknown route renders the 404 page', async () => {
  await page.goto(`${BASE}/no-such-page`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.notAdmin__code', { timeout: 5000 });
});

await check('mobile viewport has no horizontal overflow', async () => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of ['/', '/shop', '/product/2', '/cart', '/checkout']) {
    await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    if (overflow > 1) throw new Error(`${overflow}px overflow on ${path}`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
});

await check('mobile filter sheet opens on a narrow viewport', async () => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(`${BASE}/shop`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card');
  await page.getByRole('button', { name: /Filters/i }).click();
  await page.waitForSelector('.filters-sheet__panel', { timeout: 4000 });
  await page.setViewportSize({ width: 1280, height: 900 });
});

await browser.close();
server?.kill();

const passed = results.filter((r) => r.startsWith('PASS')).length;
console.log(results.join('\n'));
console.log(`\n${passed}/${results.length} passed`);

if (errors.length) {
  console.log('\nBrowser errors:');
  console.log([...new Set(errors)].join('\n'));
}

process.exit(passed === results.length && errors.length === 0 ? 0 : 1);
