import { Link, Navigate, useParams } from 'react-router-dom';
import { findProject, projects } from '../projects.js';
import Crystal from './Crystal.jsx';

// Custom case-study components by slug. Slugs not listed here fall through
// to the default project template below.
const CASE_STUDIES = {
  crystal: Crystal,
};

const pad2 = (n) => String(n).padStart(2, '0');

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

  const index = projects.findIndex((p) => p.slug === slug);

  return (
    <article className="project">
      <Link to="/" className="project-back">
        <span className="project-back-arrow" aria-hidden="true">←</span>
        <span>Back to index</span>
      </Link>

      <div className="project-meta">
        <span><span className="project-meta-key">Entry</span> <span className="project-meta-accent">{pad2(index + 1)}</span></span>
        <span><span className="project-meta-key">Slug</span> <span className="project-meta-val">/{project.slug}</span></span>
        {project.year && <span><span className="project-meta-key">Year</span> <span className="project-meta-val">{project.year}</span></span>}
        {project.role && <span><span className="project-meta-key">Role</span> <span className="project-meta-val">{project.role}</span></span>}
        {project.tags?.length > 0 && (
          <span><span className="project-meta-key">Tags</span> <span className="project-meta-val">{project.tags.join(' · ')}</span></span>
        )}
      </div>

      <h1 className="project-title">{project.title}</h1>

      {project.summary && <p className="project-summary">{project.summary}</p>}

      <div className="project-cover-wrap">
        <div className="project-cover" style={{ background: project.accent }} aria-hidden="true" />
      </div>

      {project.body.length === 0 ? (
        <div className="project-empty">
          <span className="project-empty-key">Status</span>
          Case study forthcoming — fill in <code>projects.js → body[]</code> to populate.
        </div>
      ) : (
        project.body.map(renderBlock)
      )}
    </article>
  );
}
