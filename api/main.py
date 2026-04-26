from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="taylorjsanderson.com api")

# CORS only matters in local dev (vite on :5173, api on :8000).
# In production the React SPA is served same-origin so CORS is a no-op.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/v1/health/live")
def health_live():
    return {"status": "ok"}


@app.get("/v1/hello")
def hello():
    return {"message": "Hello, world."}
