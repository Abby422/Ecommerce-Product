// A neutral inline placeholder. Product imagery is hotlinked, so a URL that
// rots should degrade to this rather than a broken-image icon.
export const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
       <rect width="400" height="300" fill="#efeae1"/>
       <path d="M150 190l35-45 28 34 22-26 35 37z" fill="#d6cec0"/>
       <circle cx="160" cy="120" r="16" fill="#d6cec0"/>
     </svg>`.replace(/\s+/g, ' '),
  );

// Swaps in the placeholder once, without looping if the placeholder itself
// were ever to fail.
export function onImageError(event) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = 'true';
  img.src = PLACEHOLDER_IMAGE;
}
