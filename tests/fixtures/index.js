import { test as base, expect } from '@playwright/test';
import { installTestChimp } from '@testchimp/playwright/runtime';

export const test = installTestChimp(base);
export { expect };
