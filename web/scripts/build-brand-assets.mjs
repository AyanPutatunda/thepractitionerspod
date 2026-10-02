// Generates every brand asset from code so the logo stays consistent everywhere.
// Run with `npm run brand`; outputs are committed so normal builds don't need this.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import opentype from 'opentype.js';
import sharp from 'sharp';

const require = createRequire(import.meta.url);
const fontFile = (pkg, file) => {
  const buf = readFileSync(require.resolve(`${pkg}/files/${file}`));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};

const display = fontFile('@fontsource/space-grotesk', 'space-grotesk-latin-600-normal.woff');
const displayBold = fontFile('@fontsource/space-grotesk', 'space-grotesk-latin-700-normal.woff');
const mono = fontFile('@fontsource/jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff');

export const COLORS = {
  ink: '#0B0E14',
  paper: '#F5F1E8',
  signal: '#FF5B2E',
  muted: '#9AA1AD',
};

// The mark: a "P" whose bowl is a microphone pop-filter ring holding a waveform.
// Drawn on a 64x64 grid; `tile` controls the rounded-square background.
function markShapes({ tile = true, stem = COLORS.paper, ring = COLORS.signal, wave = COLORS.paper } = {}) {
  return [
    tile ? `<rect width="64" height="64" rx="14" fill="${COLORS.ink}"/>` : '',
    `<rect x="13" y="12" width="8" height="40" rx="4" fill="${stem}"/>`,
    `<circle cx="33" cy="26" r="11" fill="none" stroke="${ring}" stroke-width="8"/>`,
    `<rect x="28.5" y="23" width="2.6" height="6" rx="1.3" fill="${wave}"/>`,
    `<rect x="31.7" y="20" width="2.6" height="12" rx="1.3" fill="${wave}"/>`,
    `<rect x="34.9" y="23" width="2.6" height="6" rx="1.3" fill="${wave}"/>`,
  ].join('');
}

const markGroup = (x, y, size, opts) =>
  `<g transform="translate(${x} ${y}) scale(${size / 64})">${markShapes(opts)}</g>`;

function text(font, str, x, y, size, fill, tracking = 0) {
  // opentype has no tracking option, so lay glyphs out one at a time.
  let cursor = x;
  const scale = size / font.unitsPerEm;
  const glyphs = [...str].map((c) => font.charToGlyph(c));
  const n = (v) => +v.toFixed(2);
  let d = '';
  glyphs.forEach((g, i) => {
    // Transform raw outlines ourselves: opentype.js 2.0's glyph.getPath()
    // intermittently emits NaN coordinates for offset glyphs.
    const px = (v) => n(cursor + v * scale);
    const py = (v) => n(y - v * scale);
    for (const c of g.path.commands) {
      if (c.type === 'M' || c.type === 'L') d += `${c.type}${px(c.x)} ${py(c.y)}`;
      else if (c.type === 'Q') d += `Q${px(c.x1)} ${py(c.y1)} ${px(c.x)} ${py(c.y)}`;
      else if (c.type === 'C') d += `C${px(c.x1)} ${py(c.y1)} ${px(c.x2)} ${py(c.y2)} ${px(c.x)} ${py(c.y)}`;
      else if (c.type === 'Z') d += 'Z';
    }
    const kern = i < glyphs.length - 1 ? font.getKerningValue(g, glyphs[i + 1]) || 0 : 0;
    cursor += (g.advanceWidth + kern) * scale + tracking * size;
  });
  return { svg: `<path fill="${fill}" d="${d}"/>`, width: cursor - x };
}

const svgDoc = (w, h, body, bg) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">` +
  (bg ? `<rect width="${w}" height="${h}" fill="${bg}"/>` : '') +
  body +
  `</svg>\n`;

function horizontalLogo(onDark) {
  const h = 64;
  const fg = onDark ? COLORS.paper : COLORS.ink;
  const word = text(display, 'The Practitioners Pod', 80, 43, 30, fg, -0.02);
  const w = Math.ceil(80 + word.width + 4);
  return svgDoc(w, h, markGroup(0, 0, 64) + word.svg);
}

function stackedLogo(onDark) {
  const fg = onDark ? COLORS.paper : COLORS.ink;
  const l1 = text(mono, 'THE PRACTITIONERS', 0, 0, 14, COLORS.signal, 0.12);
  const l2 = text(displayBold, 'Pod', 0, 0, 52, fg, -0.03);
  const w = Math.ceil(Math.max(l1.width, l2.width, 120));
  const mark = markGroup((w - 96) / 2, 0, 96);
  const a = text(mono, 'THE PRACTITIONERS', (w - l1.width) / 2, 128, 14, COLORS.signal, 0.12);
  const b = text(displayBold, 'Pod', (w - l2.width) / 2, 176, 52, fg, -0.03);
  return svgDoc(w, 190, mark + a.svg + b.svg);
}

function coverArt(size) {
  // Square podcast cover (Apple/Spotify want 3000x3000).
  const u = size / 1000;
  const parts = [];
  parts.push(`<rect width="${size}" height="${size}" fill="${COLORS.ink}"/>`);
  // faint grid for texture
  for (let i = 1; i < 10; i++) {
    parts.push(`<line x1="${i * 100 * u}" y1="0" x2="${i * 100 * u}" y2="${size}" stroke="#ffffff" stroke-opacity="0.04" stroke-width="${u}"/>`);
    parts.push(`<line x1="0" y1="${i * 100 * u}" x2="${size}" y2="${i * 100 * u}" stroke="#ffffff" stroke-opacity="0.04" stroke-width="${u}"/>`);
  }
  parts.push(markGroup(90 * u, 90 * u, 300 * u, { tile: false }));
  parts.push(text(mono, 'THE PRACTITIONERS', 96 * u, 600 * u, 54 * u, COLORS.signal, 0.1).svg);
  parts.push(text(displayBold, 'Pod', 82 * u, 800 * u, 230 * u, COLORS.paper, -0.04).svg);
  parts.push(text(mono, 'DATA · AI · ENGINEERING — FROM THE PEOPLE WHO SHIP IT', 96 * u, 900 * u, 24 * u, COLORS.muted, 0.02).svg);
  return svgDoc(size, size, parts.join(''));
}

function ogImage() {
  const w = 1200, h = 630;
  const parts = [`<rect width="${w}" height="${h}" fill="${COLORS.ink}"/>`];
  for (let i = 1; i < 12; i++) {
    parts.push(`<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${h}" stroke="#ffffff" stroke-opacity="0.04"/>`);
  }
  parts.push(markGroup(80, 80, 120, { tile: false }));
  parts.push(text(mono, 'THE PRACTITIONERS POD', 86, 300, 26, COLORS.signal, 0.1).svg);
  parts.push(text(displayBold, 'Real talk from people', 80, 400, 74, COLORS.paper, -0.03).svg);
  parts.push(text(displayBold, 'who build in production.', 80, 480, 74, COLORS.paper, -0.03).svg);
  parts.push(text(mono, 'thepractitionerspod.com', 86, 560, 24, COLORS.muted).svg);
  return svgDoc(w, h, parts.join(''));
}

const out = (p, data) => {
  writeFileSync(new URL(`../${p}`, import.meta.url), data);
  console.log('wrote', p);
};
const png = async (svg, file, width) =>
  out(file, await sharp(Buffer.from(svg), { density: 300 }).resize(width).png().toBuffer());

mkdirSync(new URL('../public/brand', import.meta.url), { recursive: true });

const mark = svgDoc(64, 64, markShapes());
out('src/assets/mark.svg', mark);
out('public/favicon.svg', mark);
out('public/brand/logo-mark.svg', mark);
out('public/brand/logo-mark-transparent.svg', svgDoc(64, 64, markShapes({ tile: false, stem: COLORS.ink, wave: COLORS.ink })));
out('public/brand/logo-horizontal-dark.svg', horizontalLogo(false));
out('public/brand/logo-horizontal-light.svg', horizontalLogo(true));
out('public/brand/logo-stacked-light.svg', stackedLogo(true));
out('public/brand/cover-art.svg', coverArt(1000));

await png(mark, 'public/favicon-32.png', 32);
await png(mark, 'public/apple-touch-icon.png', 180);
await png(mark, 'public/icon-192.png', 192);
await png(mark, 'public/icon-512.png', 512);
await png(mark, 'public/brand/logo-mark-1024.png', 1024);
await png(horizontalLogo(true), 'public/brand/logo-horizontal-light.png', 1200);
await png(horizontalLogo(false), 'public/brand/logo-horizontal-dark.png', 1200);
await png(coverArt(3000), 'public/brand/podcast-cover-3000.png', 3000);
await png(ogImage(), 'public/og-default.png', 1200);
