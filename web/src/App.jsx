const projects = [
  { title: 'Project One', href: '#', accent: '#e76f51' },
  { title: 'Project Two', href: '#', accent: '#2a9d8f' },
  { title: 'Project Three', href: '#', accent: '#e9c46a' },
  { title: 'Project Four', href: '#', accent: '#264653' },
];

export default function App() {
  return (
    <main className="portfolio">
      <div className="portfolio-inner">
        <header className="portfolio-header">
          <h1 className="portfolio-name">Taylor Sanderson</h1>
          <a className="portfolio-contact" href="mailto:tsandersin@gmail.com">contact</a>
        </header>
        <div className="card-grid">
          {projects.map((p) => (
            <a key={p.title} href={p.href} className="card">
              <div className="card-image" style={{ background: p.accent }} aria-hidden="true" />
              <div className="card-title">{p.title}</div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
