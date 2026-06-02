import { findProject } from '../projects.js';

// Rollette — a live tool. Focused page: title, a primary CTA to the live
// app (no placeholder cover), and a one-line description beneath it.
export default function Rollette() {
  const project = findProject('rollette');

  return (
    <article className="project project-cta-page">
      <h1 className="project-title">{project.title}</h1>

      <a
        className="project-cta-btn"
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Try Rollette <span aria-hidden="true">→</span>
      </a>

      <p className="project-cta-copy">{project.summary}</p>
    </article>
  );
}
