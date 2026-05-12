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
//   cover   — image src for the project page hero (overrides accent placeholder)
//   body    — content blocks for the project page:
//             { type: 'p',   text: '...' }
//             { type: 'img', src: '/path.jpg', alt: '...' }
//             { type: 'video', src: '/clip.mp4' }
//
// Add a project: append a record below. The slug becomes the URL.

export const projects = [
  {
    slug: 'crit',
    title: 'Crit',
    accent: '#e76f51',
    year: '2024',
    role: 'Lead designer',
    tags: ['Product', 'Tooling'],
    summary: 'A workspace for design teams to give and receive sharper critique.',
    body: [],
  },
  {
    slug: 'crystal',
    title: 'Crystal',
    accent: '#2a9d8f',
    year: '2014–2016',
    role: 'Designer · SD / DD / CD',
    tags: ['Architecture', 'Parametric fabrication'],
    summary: 'Christ Cathedral — renovating Philip Johnson\'s 1980 all-glass cathedral for the Diocese of Orange.',
    cover: '/images/crystal/hero-exterior.jpg',
    body: [],
  },
  {
    slug: 'r20',
    title: 'R20',
    accent: '#e9c46a',
    year: '2025',
    role: 'Product designer',
    tags: ['Mobile', 'Consumer'],
    summary: 'A daily ritual app — small habits, scheduled with intention.',
    body: [],
  },
  {
    slug: 'swamp',
    title: 'Swamp',
    accent: '#264653',
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
