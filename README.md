# TaskPlanet — Social App

Full-stack source for **TaskPlanet** lives in this folder. For complete documentation (setup, API, deployment, and troubleshooting), see the **[repository root README](../README.md)**.

## Quick links

| Path | Description |
| ---- | ----------- |
| [`backend/`](./backend) | Express API, MongoDB, JWT, uploads |
| [`frontend/`](./frontend) | React + Vite + MUI client |

## Local development (summary)

```bash
# Terminal 1 — API
cd backend && cp .env.example .env && npm install && npm run dev

# Terminal 2 — UI
cd frontend && cp .env.example .env && npm install && npm run dev
```

- API: http://localhost:5000  
- App: http://localhost:5173  

Add your logo at `frontend/public/company-logo.png`.
