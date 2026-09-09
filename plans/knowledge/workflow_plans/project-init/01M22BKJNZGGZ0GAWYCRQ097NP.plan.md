---
workflow_id: project-init
workflow_execution_id: 01M22BKJNZGGZ0GAWYCRQ097NP
plan_approved: yes
approved_by: user
---

# TestChimp project init plan

## Discovery

- Project API access: verified; `get-eaas-config` succeeded.
- Project init status: all required items are incomplete.
- Repository: `TestChimp/milliways-web-practice-init`.
- Application: web Angular app in `web/`, Node/Postgres API in `backend/`.
- Local environment entry point: `./scripts/qa/local-up.sh`; API health is `http://localhost:3001/health`.
- No mapped plans/tests folders or marker files are currently present.
- No GitHub Actions workflow is currently present.
- CLI registry latest: `@testchimp/cli` `0.1.78` (required by skill: `>=0.1.65`).

## Init action items

1. **Platform comms** — status: done
   - `get-eaas-config` succeeded and platform status is DONE.

2. **Folder mapping** — status: done
   - Scaffold mapped `plans/` and `tests/` roots for this web project, including marker files and the Playwright/TestChimp harness.
   - Install/verify required SmartTests dependencies at the SmartTests root: Playwright `>=1.59.0`, matching `playwright`, `@testchimp/playwright`, and `@testchimp/cli@latest`.
   - Update platform folder mapping for `plans/` and `tests/` after local scaffolding is ready.

3. **Connect to test environment** — status: done
   - Add `plans/knowledge/policies/connect-to-test-env.policy.md` documenting `./scripts/qa/local-up.sh`, health criteria, `BASE_URL=http://localhost:4200`, and API proxy/health details.
   - Document the CI/cloud environment contract or explicitly defer it until CI wiring is configured.

4. **CI setup** — status: done
   - Add a pull-request Playwright workflow that runs from `tests/`, supplies `TESTCHIMP_API_KEY` from GitHub secrets, uses the documented `BASE_URL`, and does not run for TestChimp plan-sync PRs.
   - Do not install ChimpHands workflows for this local Studio run.

5. **Import plans** — status: skipped
   - No external plans directory was identified; defer standalone import if needed.

6. **Import tests** — status: skipped
   - No existing E2E suite outside the not-yet-created mapped root was identified.

7. **Smoke validation** — status: skipped
   - No domain SmartTests were authored during project init; optional smoke authoring is deferred to `/testchimp create tests`.

## Approval

- PlanApproved: yes
- ApprovedBy: user
