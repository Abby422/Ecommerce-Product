// Product imagery is hotlinked, so a URL can rot without anything failing to
// build — the page just falls back to the inline placeholder. This checks every
// id in the catalogue at the size the app actually requests.
//
//   pnpm check:images
//
// Kept out of the smoke suite deliberately: it needs the network, and a flaky
// CDN should not fail a test run about application behaviour.

import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/lib/demo/images.js', import.meta.url), 'utf8');
const entries = [...source.matchAll(/^\s*(\w+):\s*UNSPLASH\('([^']+)'\)/gm)].map(
  ([, name, id]) => ({ name, id }),
);

if (entries.length === 0) {
  console.error('No image ids found — has images.js changed shape?');
  process.exit(1);
}

const WIDTH = 900;
const url = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${WIDTH}&q=70`;

const results = await Promise.all(
  entries.map(async ({ name, id }) => {
    try {
      const res = await fetch(url(id), { method: 'HEAD', signal: AbortSignal.timeout(15000) });
      return { name, id, status: res.status };
    } catch (error) {
      return { name, id, status: `error: ${error.message}` };
    }
  }),
);

const dead = results.filter((r) => r.status !== 200);

console.log(`${results.length - dead.length}/${results.length} images resolve at ${WIDTH}px`);

if (dead.length) {
  console.log('\nDead:');
  dead.forEach((r) => console.log(`  ${r.name}  ${r.id}  ${r.status}`));
  process.exit(1);
}
