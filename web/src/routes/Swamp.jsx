import { findProject } from '../projects.js';
import placeholder from '../assets/swamp/placeholder.jpg';

// Swamp — placeholder page: title + "Coming soon" + tag + a concept image.
export default function Swamp() {
  const project = findProject('swamp');

  return (
    <article className="project">
      <h1 className="project-title">{project.title}</h1>
      <p className="project-coming-soon">Coming soon</p>
      <p className="project-coming-tag">{project.summary}</p>
      <img
        className="project-coming-image"
        src={placeholder}
        alt="Swamp — exploded concept drawing of a deployable architecture"
      />
    </article>
  );
}
