# Sample user stories and scenarios (web)

Use this document as a **starting checklist** when you create plans in the TestChimp platform. These examples are adapted from the original Milliways web demo plans (the `plans/` folder is intentionally empty in this starter repo until you sync from TestChimp).

**How to use this file**

1. In TestChimp → **Plans**, create the user stories and scenarios below (or let TestChimp AI help flesh them out).
2. Connect this Git repo and map the **`plans/`** folder in **Project Settings → Integrations → GitHub**.
3. Trigger **Sync to Git Repo** to open a PR that brings the markdown plans into the codebase.
4. Review and merge the PR so agents and teammates can read plans from the repo during `/testchimp test`.

Plan format reference: [TestChimp test planning intro](https://docs.testchimp.io/test-planning/intro)

When authoring SmartTests, use Playwright **web** projects in `tests/` and link specs with:

```javascript
// @Scenario: #TS-100 Add menu item and change quantity before checkout
```

---

## Suggested folder layout (after sync)

```
plans/
  stories/
    menu/
    orders/
    navigation/
    account/
  scenarios/
    menu/
    orders/
    navigation/
    account/
  knowledge/
  events/            # TrueCoverage event definitions (added during init / test workflows)
```

---

## User stories to create

### US-100 — Place and track food orders

**Priority:** medium  
**Folder suggestion:** `plans/stories/orders/order-food.md`

**Summary:** Guests browse the menu, add items to the cart with correct pricing, place an order, and see delivery confirmation and tracking-style messaging in the web app.

**Acceptance criteria**

- User can add items from the menu and adjust quantities before checkout.
- Cart reflects line items and totals for single- and multi-item orders.
- User can submit an order and reach a delivery confirmation screen with tracking-style messaging.

---

### US-101 — Browse restaurant menu

**Priority:** high  
**Folder suggestion:** `plans/stories/menu/menu-discovery.md`

**Summary:** Guests can view main dishes and other catalog content, including legal or operational disclaimers shown on the menu screen.

**Acceptance criteria**

- Main dish items from the catalog are visible when browsing the menu.
- Shipping-related disclaimer text is visible when scrolled into view.

---

### US-103 — View account and order history

**Priority:** high  
**Folder suggestion:** `plans/stories/account/my-account.md`

**Summary:** Signed-in guests can open the account area to see profile information, loyalty tier, and past order amounts.

**Acceptance criteria**

- Profile shows identifiable user context (e.g. email) and loyalty messaging.
- Past orders are listed with amounts; aggregate spend is shown when order history exists.

---

### US-104 — Navigate app after ordering

**Priority:** high  
**Folder suggestion:** `plans/stories/navigation/app-flow.md`

**Summary:** After placing an order, the guest can dismiss the delivery flow and start a new order with a clean cart state.

**Acceptance criteria**

- Closing the delivery screen returns to the welcome experience with a clear path to order again.
- After completing an order and returning to browse, the cart is empty for a new session.

---

## Test scenarios to create and link to stories

### TS-100 — Add menu item and change quantity before checkout

**Story:** US-100  
**Folder suggestion:** `plans/scenarios/orders/add-menu-item-change-quantity.md`

**Steps**

1. Open **New Order** (or equivalent) and reach the main menu.
2. Open an item detail, increase and decrease quantity, then add to order.
3. Open cart and verify line totals match quantity and unit price.

**Expected:** Quantities and cart prices stay consistent through detail and cart views.

---

### TS-101 — Submit order with valid delivery details

**Story:** US-100  
**Folder suggestion:** `plans/scenarios/orders/submit-order-delivery.md`

**Prerequisites:** Cart contains at least one line item.

**Steps**

1. From menu, add an item and open the cart.
2. Click **Place Order**.

**Expected:** Delivery confirmation appears with on-the-way messaging and delivery timing text.

---

### TS-102 — Multi-item cart totals are accurate

**Story:** US-100  
**Folder suggestion:** `plans/scenarios/orders/multi-item-cart-totals.md`

**Steps**

1. Add several different menu items.
2. Verify footer or cart summary item count and total.
3. Open cart and verify the grand total matches the sum of line items.

**Expected:** Totals match the combination of item prices shown in the cart.

---

### TS-104 — View active order delivery tracking after placing order

**Story:** US-100  
**Folder suggestion:** `plans/scenarios/orders/view-delivery-tracking.md`

**Prerequisites:** Order just placed; delivery screen visible.

**Steps**

1. After **Place Order**, remain on delivery confirmation.
2. Read status text for in-transit and ETA-style messaging.

**Expected:** User sees clear confirmation that the order is on the way and timing guidance.

---

### TS-105 — Main dishes are listed on the menu

**Story:** US-101  
**Folder suggestion:** `plans/scenarios/menu/main-dishes-listed.md`

**Steps**

1. Navigate to the main dishes section.
2. Verify each expected main dish name appears.

**Expected:** Catalog main dishes from the backend seed are all visible.

---

### TS-110 — Past orders sum matches displayed total spent

**Story:** US-103  
**Folder suggestion:** `plans/scenarios/account/order-history-totals.md`

**Steps**

1. Open account.
2. Sum displayed past order amounts and compare to the **Total Spent** figure.

**Expected:** Sum of history lines equals the aggregate total shown (note: intentional bugs may exist—document what you observe).

---

### TS-112 — Cart is empty after completing an order

**Story:** US-104  
**Folder suggestion:** `plans/scenarios/navigation/cart-cleared-after-order.md`

**Steps**

1. Complete an order through delivery and return to welcome.
2. Start a new order and open cart without adding items.

**Expected:** Cart shows empty state before new items are added.

---

## Coupon stories (for the PR exercise only)

Do **not** add these during the initial baseline workflow—the starter app has no coupon feature yet. Create them in TestChimp when you begin the [PR testing exercise](./TESTING_GUIDE.md#pr-testing-add-coupon-codes) and sync via PR before implementation.

### US-102 — Apply promotional coupons

**Summary:** Guests can enter coupon codes on the cart screen; valid codes adjust totals and invalid codes show a clear error in the web app.

**Suggested scenarios**

| ID (example) | Title | Brief expectation |
|--------------|-------|-------------------|
| TS-107 | Valid coupon applies configured discount | Known valid code reduces total; discount line visible |
| TS-108 | Invalid coupon code shows error message | Bad code shows error; totals unchanged |

See the PR testing chapter in [TESTING_GUIDE.md](./TESTING_GUIDE.md) for the full coupon functionality requirements.
