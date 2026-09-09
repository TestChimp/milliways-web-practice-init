---
workflow-id: connect-to-test-env
version: 1.0.1
---

### Summary

Local and CI TestChimp runs use the Milliways Angular web app with its Dockerized API.

## Local Agent

### When on a feature branch

- From the repository root, run `./scripts/qa/local-up.sh`.
- The script runs `docker compose up --build -d` and waits for `http://localhost:3001/health` to return success.
- Start the web app from `web/` with `npm install` (if needed) and `npm start`.
- Set `BASE_URL=http://localhost:4200` for Playwright. Angular proxies `/api` requests to the API at `http://localhost:3001`.
- To stop the backend, run `docker compose down`; the named Postgres volume may be retained for local development.

### When on default branch

Use the same local contract unless a shared preview environment is explicitly supplied. The runner must still receive `BASE_URL` and execute from the mapped `tests/` root.

## CI / Cloud

- Start the backend with `docker compose up --build -d` and wait for `curl -fsS http://localhost:3001/health`.
- Start the Angular dev server from `web/` and wait for `http://localhost:4200` before Playwright execution.
- Run Playwright from `tests/` with `BASE_URL=http://localhost:4200`.
- Provide `TESTCHIMP_API_KEY` from the repository secret; never commit it.
- Tear down with `docker compose down` after the job.

## Performance testing (when enabled)

Performance testing is not configured by project init. It requires a separately approved load-safe environment and policy.
