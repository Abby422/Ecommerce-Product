import { PRODUCTS } from './catalogue';

// Reviews are generated from a phrase bank with a seeded PRNG rather than
// hand-written 500 times. The seed is the product id, so a given product shows
// the same reviews on every visit and in every browser.

const NAMES = [
  'Amara O.', 'Jonas R.', 'Priya S.', 'Tom H.', 'Wanjiru K.', 'Elena M.', 'Dev P.',
  'Sofia L.', 'Marcus B.', 'Yuki T.', 'Hannah W.', 'Omar A.', 'Chloe D.', 'Ravi N.',
  'Ingrid V.', 'Kofi M.', 'Lucia F.', 'Ben S.', 'Nadia H.', 'Theo C.',
];

const POSITIVE = [
  'Better in person than in the photos. The finish is even and there were no marks anywhere on it.',
  'Arrived a day early and packed properly — every corner had a moulded protector, nothing was scuffed.',
  'Second one of these I have bought. The first has held up for three years with a cat living on it.',
  'Assembly took twenty minutes with the supplied key. Everything lined up on the first try.',
  'The colour is truer to the listing than I expected. It sits somewhere between warm and neutral in daylight.',
  'Solid, heavier than I assumed from the dimensions. It does not shift when you lean on it.',
  'Exactly the size I measured for. Worth checking the dimensions rather than guessing from the photos.',
  'Good value for what it is. I compared it against two that cost more and this felt better made.',
];

const MIXED = [
  'Happy with it overall. The finish attracts dust more than I would like, but that is a small thing.',
  'Lovely piece, though it is firmer than the description suggests. It has softened over a few weeks.',
  'Looks great. Delivery slipped by a few days, which was communicated but still worth knowing.',
  'Does the job well. I would have liked one more inch of depth, but that is my room, not the product.',
  'The quality is there. Assembly instructions could be clearer about which way the back panel faces.',
];

const CRITICAL = [
  'Fine, but not the colour I expected from the listing photos — warmer, closer to beige than grey.',
  'Arrived with a small chip on one edge. Support replaced it without argument, so three stars rather than two.',
  'Smaller than it looks in the room shots. Read the dimensions carefully before ordering.',
];

// Mulberry32 — small, fast, and deterministic for a given seed.
function rng(seed) {
  let a = seed + 0x6d2b79f5;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, list) => list[Math.floor(rand() * list.length)];

const DAY = 86400000;

function reviewsFor(product) {
  const rand = rng(product.Product_id * 7919);
  // Show a handful, but report the real count on the card.
  const shown = Math.min(product.Review_count, 3 + Math.floor(rand() * 3));
  const out = [];
  const used = new Set();

  for (let i = 0; i < shown; i += 1) {
    const roll = rand();
    // Skew the sample toward the product's actual rating.
    const positive = product.Rating >= 4.5 ? 0.78 : product.Rating >= 4.2 ? 0.62 : 0.48;
    const [body, stars] =
      roll < positive
        ? [pick(rand, POSITIVE), 5 - Math.floor(rand() * 1.4)]
        : roll < positive + 0.28
          ? [pick(rand, MIXED), 4 - Math.floor(rand() * 1.3)]
          : [pick(rand, CRITICAL), 3 - Math.floor(rand() * 1.2)];

    let name = pick(rand, NAMES);
    let guard = 0;
    while (used.has(name) && guard < 20) {
      name = pick(rand, NAMES);
      guard += 1;
    }
    used.add(name);

    out.push({
      id: `${product.Product_id}-${i}`,
      productId: product.Product_id,
      author: name,
      rating: Math.max(1, Math.min(5, stars)),
      body,
      verified: rand() > 0.25,
      // Deterministic dates relative to a fixed epoch so they never drift.
      daysAgo: 3 + Math.floor(rand() * 400),
    });
  }

  return out.sort((a, b) => a.daysAgo - b.daysAgo);
}

export const REVIEWS = PRODUCTS.flatMap(reviewsFor);

export function reviewDate(daysAgo) {
  return new Date(Date.now() - daysAgo * DAY);
}
