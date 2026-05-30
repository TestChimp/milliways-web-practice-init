# Milliways TestChimp training guide (web)

This guide is for **QA engineers training to become TestChimp platform experts (FDEs)**. You will fork a clean **web** starter repo, stand up local testing infrastructure with TestChimp, author Playwright SmartTests against the Angular demo app, and complete a feature PR exercise end-to-end.

**Video tutorials:** [TestChimp YouTube playlist](https://www.youtube.com/watch?v=dTEMjBYy3FI&list=PLJHExFb87jB35CRW_t22rMGyCdR5lFYav)

**Sample plans to create in TestChimp:** [SAMPLE_PLANS.md](./SAMPLE_PLANS.md)

---

## Getting Started

### 1. Fork this repository

Fork **[milliways-web-practice](https://github.com/testchimphq/milliways-web-practice)** into **your own GitHub account or team**. Work only in your fork so you get a fresh copy without pre-built TestChimp integrations, SmartTests, or test plans.

```bash
git clone https://github.com/<your-org>/milliways-web-practice.git
cd milliways-web-practice
```

### 2. About the demo app

**Milliways** is a space-themed restaurant ordering demo with a **web** client (Angular) and a shared **Node + Postgres** backend.

| Area | What you can test |
|------|-------------------|
| **Auth** | Sign up / sign in with any email and password (demo tokens) |
| **Menu** | Sectioned catalog, item detail, quantity picker |
| **Cart & checkout** | Add/remove lines, totals, place order |
| **Delivery** | Post-order tracking screen with countdown-style messaging |
| **Account** | Profile, order history |
| **Accessibility** | Key controls expose `aria-label` and semantic roles for automation |

The backend runs in Docker (`docker compose up`). The Angular dev server at `http://localhost:4200` proxies API calls to `http://localhost:3001` via `web/proxy.conf.json`.

**Important:** This starter repo intentionally contains **no** `tests/`, `plans/`, TrueCoverage SDK, or QA seed endpoints. You add those through TestChimp workflows. The app may also include **intentional bugs**—treat discrepancies as learning opportunities for reporting and regression coverage.

Quick run (before TestChimp):

```bash
docker compose up --build -d
cd web && npm install && npm start          # http://localhost:4200
# Optional: ./scripts/qa/local-up.sh
```

### 3. Create baseline user stories and scenarios in TestChimp

Before writing code or tests, establish **requirement traceability** in the TestChimp platform:

1. Log in to **TestChimp** and open (or create) your training project.
2. Connect your **forked Git repo** under **Project Settings → Integrations → GitHub**.
3. Map two folders:
   - **`tests/`** → SmartTests (Playwright)
   - **`plans/`** → test plans (stories, scenarios, knowledge, events)
4. In **Plans**, create the user stories and scenarios listed in **[SAMPLE_PLANS.md](./SAMPLE_PLANS.md)** (menu, orders, navigation, account). Use TestChimp AI to expand steps if helpful.
5. Trigger **Sync to Git Repo** in TestChimp to open a **pull request** that adds the markdown plans under `plans/` in your fork.
6. **Review and merge** that PR so plans live in the codebase alongside the app.

Documentation: [Test planning intro](https://docs.testchimp.io/test-planning/intro)

---

## Initial workflow

### Goals

- Set up your **local environment** for web SmartTests.
- Run **`/testchimp init`** to scaffold QA infrastructure and TrueCoverage.
- **Manually exercise** the Angular app in the browser after instrumentation.

### Local environment checklist

| Step | Action |
|------|--------|
| Backend | `docker compose up --build -d` — verify `curl http://localhost:3001/health` |
| MCP | Configure `.cursor/mcp.json` (or host equivalent) with `TESTCHIMP_API_KEY` and `TESTCHIMP_PROJECT_ID` — see TestChimp **Key management** |
| Web | Node 18+; `cd web && npm install && npm start` |
| Node | Install deps when `tests/` appears after init |

Ensure **`TESTCHIMP_API_KEY` is exported in the shell** that runs Playwright—not only in IDE MCP config.

### Run `/testchimp init`

In Cursor (or your TestChimp-enabled agent environment), run:

```
/testchimp init
```

During init, work with the agent to:

1. **Scaffold SmartTests** under `tests/` (Playwright config, fixtures, marker `.testchimp-tests`).
2. **Enable TrueCoverage** — follow agent guidance and read [TrueCoverage intro](https://docs.testchimp.io/truecoverage/intro):
   - Web: `@testchimp/rum-js` in Angular bootstrap
   - Add `plans/events/*.event.md` definitions when the agent proposes them
3. **Persist project decisions** in `plans/knowledge/ai-test-instructions.md` (created/updated by init).
4. **Merge the init PR** when the agent opens one (tests scaffold, plans markers, instrumentation).

### Manual exploration (required)

After TrueCoverage instrumentation and a successful app build:

1. **Browser** — sign up, browse menu, add items, place an order, open account at `localhost:4200`.
2. Confirm the app still behaves correctly and that you understand the flows you will automate.

These manual sessions seed TrueCoverage session data and validate instrumentation before SmartTests.

---

## Test workflow

### Goals

- Author **SmartTests** with `/testchimp test`.
- **Run tests** locally and confirm results in TestChimp.
- Verify **Plans → Insights** coverage and **TrueCoverage** population.
- Run **ExploreChimp** for UX analytics on UI pathways.

### 1. Run `/testchimp test`

```
/testchimp test
```

Collaborate with the agent through its phases (plan → your approval → execute):

- Propose SmartTests linked to scenarios from [SAMPLE_PLANS.md](./SAMPLE_PLANS.md) via `// @Scenario: #TS-…` comments.
- Add **fixtures** and **seed helpers** if the agent recommends them (e.g. `POST /qa/users` for stable test users).
- Instrument **RUM emits** for key events (`menu_loaded`, `order_submitted_success`, etc.) if not already present.
- Enable **ExploreChimp** (`markScreenState`, `EXPLORECHIMP_ENABLED`) for UI specs when prompted.

**Review the branch plan** the agent produces. Approve or request corrections before test authoring proceeds.

### 2. Run the tests

From the SmartTests root (directory containing `.testchimp-tests`):

```bash
cd tests
npm install
npm run test:web       # Playwright — Angular app (agent may start ng serve)
```

Use headed/debug runs while stabilizing specs; switch to CI-style headless once stable.

### 3. Verify results in TestChimp

| Check | Where to look |
|-------|----------------|
| Run history & failures | TestChimp **SmartTests** / executions for your project |
| Requirement coverage | **Plans → Insights** — scenarios should show execution linkage |
| Traceability | Spec files contain `// @Scenario: #TS-…` matching real platform IDs |

Fix flaky tests or missing links before moving on.

### 4. TrueCoverage (wait and verify)

TrueCoverage aggregates RUM events over time (test + manual sessions):

1. Wait **a couple of hours** after test and manual runs.
2. Open **TrueCoverage** in TestChimp and confirm events from your instrumented web app appear.
3. Cross-check against `plans/events/` definitions in the repo.

If events are missing, ask the agent to verify SDK setup and emit calls—then re-run manual + automated sessions.

### 5. ExploreChimp

Trigger exploratory UX analytics on UI test pathways:

```
/testchimp explore
```

Or ensure ExploreChimp ran as part of `/testchimp test` Phase 6. Confirm explorations appear in TestChimp for your branch (set `TESTCHIMP_BRANCH_NAME` to your current git branch for local runs).

---

## PR testing: add coupon codes

This exercise simulates **real FDE work**: plan in TestChimp → implement on a branch → test with TestChimp → open a PR with tests.

### Functionality requirement

Add **coupon code support during ordering**:

| Requirement | Detail |
|-------------|--------|
| **UI** | Cart / order screen: text field to enter a coupon code and an **Apply** action |
| **Valid coupon** | Applies a fixed discount to the cart subtotal; show discount line and updated total |
| **Invalid coupon** | Show a clear error; do not change totals |
| **Data source** | Valid coupon codes are stored in the **system database** (not hard-coded only in the client) |
| **Seed endpoint** | Add a **test-only seed endpoint** (e.g. `POST /qa/coupons` or extend existing QA routes) so SmartTests can create known coupons before UI assertions |
| **Platform** | Implement on **web** with backend support |

Example acceptance idea: seed coupon `MARVIN` with a ₭20 discount via QA API, apply in UI, verify total; apply `ZAPHOD`, verify error.

### Step 1 — Plan in TestChimp (before coding)

1. In TestChimp **Plans**, create **US-102 Apply promotional coupons** and scenarios **TS-107** (valid discount) and **TS-108** (invalid code)—see [SAMPLE_PLANS.md](./SAMPLE_PLANS.md#coupon-stories-for-the-pr-exercise-only).
2. **Sync to Git** and **merge the PR** so coupon stories/scenarios exist under `plans/` before implementation.

### Step 2 — Implement on a feature branch

```bash
git checkout main
git pull
git checkout -b feature/coupon-codes
```

Implement backend (schema/migration for coupons, apply logic on order total, QA seed route), then web UI. Open a **draft PR** for the feature when ready.

### Step 3 — Run `/testchimp test` on the feature branch

```
/testchimp test
```

**Review the agent's plan** carefully. Before approving execution, confirm it covers:

- [ ] New/updated **scenarios** for coupon flows (create in platform if missing—never invent fake `#TS-` IDs)
- [ ] **Seed endpoint(s)** for coupons and **fixtures** that call them
- [ ] **SmartTests** with accurate steps and `// @Scenario:` links
- [ ] **TrueCoverage** emits for coupon attempts (e.g. `coupon_apply_attempted`) if not already instrumented—ask the agent to add instrumentation and `plans/events/` entries

Proceed with test authoring only after you approve the plan.

### Step 4 — Quality checklist before final PR

| Item | Pass? |
|------|-------|
| Seed endpoints added and documented for test use only | |
| Fixtures defined and used consistently in specs | |
| Tests match actual UI labels / accessibility hooks | |
| Each spec links to the scenario(s) it validates | |
| Missing scenarios were created in TestChimp (real IDs) | |
| TrueCoverage instrumentation added for new user events | |
| Tests pass locally in Playwright | |
| Results visible in TestChimp; Plans Insights updated | |

### Step 5 — Raise PR with tests included

Push your branch and update the PR to include:

- Feature code (backend + web)
- SmartTests and any new fixtures under `tests/`
- Updated `plans/` if scenarios/events changed
- TrueCoverage instrumentation and event definitions

Request review from your training lead. Be prepared to demo: TestChimp run history, Insights coverage, TrueCoverage events, and ExploreChimp findings for the coupon journey.

---

## Reference links

| Topic | Link |
|-------|------|
| Video tutorials | [YouTube playlist](https://www.youtube.com/watch?v=dTEMjBYy3FI&list=PLJHExFb87jB35CRW_t22rMGyCdR5lFYav) |
| TrueCoverage | [docs.testchimp.io/truecoverage/intro](https://docs.testchimp.io/truecoverage/intro) |
| Test planning | [docs.testchimp.io/test-planning/intro](https://docs.testchimp.io/test-planning/intro) |
| Sample stories/scenarios | [SAMPLE_PLANS.md](./SAMPLE_PLANS.md) |
| Web setup | [web/README.md](../web/README.md) |
| Root README | [README.md](../README.md) |
