import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Link, Navigate, useLocation } from 'react-router-dom';
import Landing from './routes/Landing.jsx';
import Project from './routes/Project.jsx';

function TopBar() {
  const { pathname } = useLocation();
  const isProject = pathname !== '/';

  return (
    <header className="topbar" role="banner">
      <div className="topbar-inner">
        <div className="topbar-brand">
          <p className="topbar-name">
            <Link to="/">Taylor Sanderson</Link>
          </p>
          <span className="topbar-label">Designer · Portfolio 2026</span>
        </div>
        {isProject && (
          <Link to="/" className="topbar-back" aria-label="Back to index">
            <span aria-hidden="true">←</span>
          </Link>
        )}
      </div>
    </header>
  );
}

function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="portfolio">
        <TopBar />
        <div className="portfolio-inner">
          <div id="main" tabIndex={-1}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/:slug" element={<Project />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
