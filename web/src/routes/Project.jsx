import { Navigate, useParams } from 'react-router-dom';
import { findProject } from '../projects.js';
import Crystal from './Crystal.jsx';

// Custom case-study components by slug. Slugs not listed here fall through
// to the default project template below.
const CASE_STUDIES = {
  crystal: Crystal,
};

function renderBlock(block, i) {
  switch (block.type) {
    case 'p':
      return <p key={i} className="project-paragraph">{block.text}</p>;
    case 'img':
      return <img key={i} className="project-image" src={block.src} alt={block.alt ?? ''} />;
    case 'video':
      return <video key={i} className="project-video" src={block.src} controls playsInline />;
    default:
      return null;
  }
}

export default function Project() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project) return <Navigate to="/" replace />;

  const CaseStudy = CASE_STUDIES[slug];
  if (CaseStudy) return <CaseStudy />;

  // Default project template — title + accent cover card.
  // Back-to-index arrow is provided by the sticky topbar in App.jsx.
  // To turn a project into a full case study, add a custom component
  // (see Crystal.jsx) and register it in CASE_STUDIES above.
  return (
    <article className="project">
      <h1 className="project-title">{project.title}</h1>
      <div className="project-cover-wrap">
        <div className="project-cover" style={{ background: project.accent }} aria-hidden="true" />
      </div>
      {project.body.length > 0 && project.body.map(renderBlock)}
    </article>
  );
}
