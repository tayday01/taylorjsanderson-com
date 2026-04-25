import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/v1/hello')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(r.statusText))))
      .then(setData)
      .catch((e) => setError(e.message ?? String(e)));
  }, []);

  return (
    <main>
      <h1>Hello, world.</h1>
      <p className="subtitle">taylorjsanderson.com</p>

      {error && <p className="status status-error">api error: {error}</p>}
      {!data && !error && <p className="status">loading…</p>}

      {data && (
        <dl className="meta">
          <dt>message from api</dt>
          <dd>{data.message}</dd>
          <dt>server time (utc)</dt>
          <dd><code>{data.server_time_utc}</code></dd>
          <dt>python version</dt>
          <dd><code>{data.python_version}</code></dd>
        </dl>
      )}
    </main>
  );
}
