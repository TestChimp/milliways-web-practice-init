import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ path: `.env-${process.env.TESTCHIMP_ENV || 'QA'}` });

export default defineConfig({
  testDir: '.',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['list'],
    ['@testchimp/playwright/reporter', { verbose: false }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:4200',
    actionTimeout: 15_000,
    trace: 'retain-on-failure',
    screenshot: 'on',
  },
  projects: [{
    name: 'chromium',
    testMatch: '**/*.spec.{js,ts}',
    testIgnore: ['**/setup/**'],
    use: { ...devices['Desktop Chrome'] },
  }],
});
