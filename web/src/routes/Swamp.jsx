import { findProject } from '../projects.js';

// Swamp — placeholder page: title + "Coming soon" (no cover graphic yet).
export default function Swamp() {
  const project = findProject('swamp');

  return (
    <article className="project">
      <h1 className="project-title">{project.title}</h1>
      <p className="project-coming-soon">Coming soon</p>
      <p className="project-coming-tag">{project.summary}</p>
    </article>
  );
}
