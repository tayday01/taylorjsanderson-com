import { Link } from 'react-router-dom';
import { projects } from '../projects.js';

export default function Landing() {
  return (
    <>
      <div className="card-grid">
        {projects.map((p) => (
          <Link key={p.slug} to={`/${p.slug}`} className="card" aria-label={`${p.title} — ${p.summary ?? 'View project'}`}>
            <div className="card-image-wrap">
              {p.card ? (
                <div className="card-graphic" aria-hidden="true">
                  <img className="card-base" src={p.card} alt="" />
                </div>
              ) : (
                <div className="card-image" style={{ background: p.accent }} aria-hidden="true" />
              )}
            </div>
            <div className="card-info">
              <h2 className="card-title">
                {p.title}
                <span className="card-title-arrow" aria-hidden="true">→</span>
              </h2>
            </div>
          </Link>
        ))}
      </div>

      <section className="contact" aria-label="Contact">
        <ul className="contact-links">
          <li>
            <a className="contact-link" href="mailto:taylor.j.sanderson@gmail.com">
              <span className="contact-link-key">Mail</span>
              <span>taylor.j.sanderson@gmail.com</span>
              <span className="contact-link-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
          <li>
            <a className="contact-link" href="/Taylor_Sanderson_Resume_2026.pdf" download rel="noopener noreferrer">
              <span className="contact-link-key">CV</span>
              <span>Download resume (PDF)</span>
              <span className="contact-link-arrow" aria-hidden="true">↓</span>
            </a>
          </li>
          <li>
            <a className="contact-link" href="https://www.linkedin.com/in/taylorsande/" target="_blank" rel="noopener noreferrer">
              <span className="contact-link-key">LinkedIn</span>
              <span>linkedin.com/in/taylorsande</span>
              <span className="contact-link-arrow" aria-hidden="true">↗</span>
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
