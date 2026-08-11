/**
 * Image utility helpers for Next.js Image component.
 * Provides a shimmer blur placeholder for lazy-loaded images.
 */

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#e8edf2" offset="20%" />
      <stop stop-color="#d4dde8" offset="50%" />
      <stop stop-color="#e8edf2" offset="70%" />
    </linearGradient>
    <filter id="blur">
      <feGaussianBlur stdDeviation="8" />
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="#e8edf2" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" filter="url(#blur)">
    <animate attributeName="x" values="-${w};${w}" dur="1.2s" repeatCount="indefinite" />
  </rect>
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(unescape(encodeURIComponent(str)));

/**
 * Returns a base64-encoded shimmer SVG to use as blurDataURL.
 * Usage:
 *   <Image placeholder="blur" blurDataURL={blurDataURL(800, 600)} ... />
 */
export const blurDataURL = (w = 800, h = 600) =>
  `data:image/svg+xml;base64,${toBase64(shimmer(w, h))}`;
