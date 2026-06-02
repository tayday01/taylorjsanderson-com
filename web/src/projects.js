// Single source of truth for the work list AND each project page.
//
// Required fields:
//   slug    — URL path segment (/<slug>) and card key
//   title   — display name
//   accent  — placeholder color for image blocks (swap with real <img> later)
//
// Optional fields (rendered when present):
//   year    — short year string, e.g. "2024" or "2024–25"
//   role    — short role descriptor, e.g. "Lead designer"
//   tags    — array of short labels, e.g. ["Product", "SaaS"]
//   summary — one-line description for cards + intro on the project page
//   card    — icon src centered in the work-card image block (falls back to
//             the accent color block when absent); inverts on hover
//   cover   — image src for the project page hero (overrides accent placeholder)
//   body    — content blocks for the project page:
//             { type: 'p',   text: '...' }
//             { type: 'img', src: '/path.jpg', alt: '...' }
//             { type: 'video', src: '/clip.mp4' }
//
// Add a project: append a record below. The slug becomes the URL.

// Card icons are imported (not referenced from /public) so Vite content-hashes
// the filenames at build time — editing an icon changes its hash, which busts
// the browser/CDN immutable cache automatically. Drop a replacement PNG in
// src/assets/cards/ and rebuild; no cache-purge needed.
import critCard from './assets/cards/crit.png';
import crystalCard from './assets/cards/crystal.png';
import rolletteCard from './assets/cards/rollette.png';
import swampCard from './assets/cards/swamp.png';

export const projects = [
  {
    slug: 'crit',
    title: 'Crit',
    accent: '#dc2826',
    card: critCard,
    year: '2025–2026',
    role: 'Design, prompt design, frontend',
    tags: ['Product', 'AI', 'Tooling'],
    summary: 'An AI critique tool for visual design work. One screen in, five disciplines out, a tone that doesn\'t flinch.',
    cover: '/images/crit/hero-poster.jpg',
    body: [],
  },
  {
    slug: 'crystal',
    title: 'Crystal',
    accent: '#2a9d8f',
    card: crystalCard,
    year: '2014–2016',
    role: 'Designer · SD / DD / CD',
    tags: ['Architecture', 'Parametric fabrication'],
    summary: 'Christ Cathedral — renovating Philip Johnson\'s 1980 all-glass cathedral for the Diocese of Orange.',
    cover: '/images/crystal/hero-exterior.jpg',
    body: [],
  },
  {
    slug: 'rollette',
    title: 'Rollette',
    accent: '#e9c46a',
    card: rolletteCard,
    year: '2025',
    role: 'Product designer',
    tags: ['Mobile', 'Consumer'],
    summary: 'A daily ritual app — small habits, scheduled with intention.',
    liveUrl: 'https://rollette.taylorjsanderson.com/',
    body: [],
  },
  {
    slug: 'swamp',
    title: 'Swamp',
    accent: '#264653',
    card: swampCard,
    year: '2025',
    role: 'Designer & developer',
    tags: ['Web', 'Experimental'],
    summary: 'An ambient web experience built from field recordings and slow type.',
    body: [],
  },
];

export function findProject(slug) {
  return projects.find((p) => p.slug === slug);
}
