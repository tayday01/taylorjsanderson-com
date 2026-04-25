# taylorjsanderson.com

Personal site. FastAPI backend + React (Vite) SPA, served behind a shared
Caddy edge proxy on a DigitalOcean droplet alongside other unrelated
projects.

## Layout

```
.
├── api/                FastAPI service (Python 3.13)
│   ├── main.py
│   ├── requirements.txt
│   └── Dockerfile
├── web/                React SPA built with Vite, served by nginx
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml  Two services: api + web, joined to the external
                        `edge` Docker network
```

## Routing (in production, via the edge Caddy)

| Path           | Goes to                              |
|----------------|--------------------------------------|
| `/v1/*`        | `taylorjsanderson-api:8000` (FastAPI) |
| everything else | `taylorjsanderson-web:8080` (nginx serving the built SPA) |

## Local development

Two terminals:

```sh
# Terminal 1 — API
cd api
python -m venv .venv
.venv/Scripts/activate         # Windows
# source .venv/bin/activate    # macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

```sh
# Terminal 2 — Web
cd web
npm install
npm run dev                    # serves http://localhost:5173
```

Vite proxies `/v1/*` to `localhost:8000` (see `vite.config.js`), so the
SPA hits the local API in dev exactly the way it hits the production API
through Caddy.

Or run the production-shaped stack locally with Docker:

```sh
docker compose up --build
```

## Production deploy

The droplet pulls from this repo into `/opt/taylorjsanderson-com/` and
runs `docker compose up -d --build`. The edge Caddy at `/opt/edge/` does
TLS termination and routes by hostname.
