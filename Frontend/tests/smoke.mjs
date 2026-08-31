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

await check('landing page renders products', async () => {
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 8000 });
  const count = await page.locator('.products-card').count();
  if (count !== 8) throw new Error(`expected 8 cards, got ${count}`);
});

await check('demo banner is shown', async () => {
  await page.waitForSelector('.demo-banner', { timeout: 4000 });
});

await check('pagination advances to page 2', async () => {
  await page.getByRole('button', { name: 'Next' }).click();
  await page.waitForTimeout(600);
  const text = await page.locator('.pagination span').innerText();
  if (!text.includes('Page 2')) throw new Error(`pagination reads "${text}"`);
  const count = await page.locator('.products-card').count();
  if (count !== 4) throw new Error(`expected 4 cards on page 2, got ${count}`);
});

await check('add to cart updates the nav badge', async () => {
  await page.getByRole('button', { name: 'Previous' }).click();
  await page.waitForTimeout(600);
  await page.locator('.products-card').first().getByRole('button', { name: /Add to cart/i }).click();
  await page.waitForSelector('.cart-count', { timeout: 4000 });
  const badge = await page.locator('.cart-count').innerText();
  if (badge !== '1') throw new Error(`badge reads "${badge}"`);
});

await check('cart page shows the item and a total', async () => {
  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.product-row', { timeout: 5000 });
  const total = await page.locator('.cart-total').innerText();
  if (!/\$\d/.test(total)) throw new Error(`total reads "${total}"`);
});

await check('cart survives a reload (persistence)', async () => {
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.product-row', { timeout: 5000 });
});

await check('product detail page loads', async () => {
  await page.goto(`${BASE}/product/3`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.detail-content h2', { timeout: 5000 });
  const title = await page.locator('.detail-content h2').innerText();
  if (!title.includes('Walnut')) throw new Error(`title reads "${title}"`);
});

await check('search returns matching products', async () => {
  await page.goto(`${BASE}/search?q=lamp`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 5000 });
  const count = await page.locator('.products-card').count();
  if (count !== 1) throw new Error(`expected 1 result for "lamp", got ${count}`);
});

await check('search with no match shows an empty state', async () => {
  await page.goto(`${BASE}/search?q=zzzzz`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.status--empty', { timeout: 5000 });
});

await check('/admin redirects an anonymous visitor to admin login', async () => {
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  if (!page.url().includes('/adminLogin')) throw new Error(`landed on ${page.url()}`);
});

await check('wrong admin password shows an error', async () => {
  await page.fill('#admin-email', 'admin@spacejoy.demo');
  await page.fill('#admin-password', 'wrongpassword');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('.form-error', { timeout: 5000 });
});

await check('admin login reaches the dashboard with live figures', async () => {
  await page.fill('#admin-password', 'demo1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForSelector('.dashboard .flashcard', { timeout: 6000 });
  const cards = await page.locator('.dashboard .flashcard').count();
  if (cards !== 4) throw new Error(`expected 4 stat cards, got ${cards}`);
  const products = await page.locator('.flashcard3 .number').innerText();
  if (products !== '12') throw new Error(`product count reads "${products}", expected 12`);
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
  await page.locator('#role-2').selectOption('Admin');
  await page.waitForTimeout(900);
  const value = await page.locator('#role-2').inputValue();
  if (value !== 'Admin') throw new Error(`role reads "${value}"`);
});

await check('sign out drops the admin session', async () => {
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForTimeout(500);
  await page.goto(`${BASE}/admin`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  if (!page.url().includes('/adminLogin')) throw new Error(`still at ${page.url()}`);
});

await check('shopper can register and land signed in', async () => {
  await page.goto(`${BASE}/register`, { waitUntil: 'networkidle' });
  await page.fill('#email', `smoke${Date.now()}@example.com`);
  await page.fill('#userName', `smoke${Date.now()}`);
  await page.fill('#Name', 'Smoke Tester');
  await page.fill('#password', 'password123');
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForSelector('.products-card', { timeout: 8000 });
  await page.waitForSelector('button:has-text("Sign out")', { timeout: 5000 });
});

await check('checkout empties the cart', async () => {
  // Earlier steps may already have left something in the cart; only add when
  // the first card still offers an add button.
  const addButton = page
    .locator('.products-card')
    .first()
    .getByRole('button', { name: /Add to cart/i });
  if (await addButton.count()) await addButton.click();

  await page.goto(`${BASE}/cart`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.product-row', { timeout: 5000 });
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.waitForSelector('text=Thanks — your order is in.', { timeout: 6000 });

  // And the cart really is empty afterwards, not just showing a receipt.
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForSelector('.cart-empty', { timeout: 5000 });
});

await check('unknown route renders the 404 page', async () => {
  await page.goto(`${BASE}/no-such-page`, { waitUntil: 'networkidle' });
  await page.waitForSelector('.notAdmin__code', { timeout: 5000 });
});

await check('mobile viewport has no horizontal overflow', async () => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForSelector('.products-card', { timeout: 6000 });
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  if (overflow > 1) throw new Error(`${overflow}px of horizontal overflow`);
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
