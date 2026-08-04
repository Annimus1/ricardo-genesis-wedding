// Genera public/og-image.png (1200x630) rasterizando un SVG con la paleta del sitio.
// Placeholder hasta que haya una foto real: en ese momento basta con reemplazar
// public/og-image.png por una versión con foto (mismas dimensiones) y no hace
// falta tocar este script ni Base.astro.
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const outPath = fileURLToPath(new URL('../public/og-image.png', import.meta.url));

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#faf7f2" />
      <stop offset="55%" stop-color="#dce3ef" />
      <stop offset="100%" stop-color="#b7c2da" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)" />
  <rect x="40" y="40" width="${width - 80}" height="${height - 80}" fill="none" stroke="#c0a57e" stroke-opacity="0.55" stroke-width="2" />
  <text x="50%" y="46%" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="120" fill="#7c8caf">R&amp;G</text>
  <text x="50%" y="58%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="6" fill="#4a5a7d">RICARDO &amp; GENESIS</text>
  <text x="50%" y="66%" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="20" letter-spacing="4" fill="#4a5a7d">28 · 11 · 2026</text>
</svg>
`.trim();

await sharp(Buffer.from(svg)).png().toFile(outPath);

console.log(`OG image generada en ${path.relative(process.cwd(), outPath)}`);
