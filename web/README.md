# Milliways Web (Angular)

Angular SPA for the Milliways food-ordering demo. Shares the repo **Node backend** on port **3001**.

## Prerequisites

- Node.js 18+
- Backend running: from repo root, `docker compose up --build -d`

## Run locally

```bash
cd web
npm install
npm start
```

Open [http://localhost:4200](http://localhost:4200). API calls are proxied to `http://localhost:3001` (see `proxy.conf.json`).

## Build

```bash
npm run build
```

Output: `dist/web/`.
