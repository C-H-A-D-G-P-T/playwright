// @ts-check
import { defineConfig, devices } from "@playwright/test";
import "dotenv/config";

export default defineConfig({
	testDir: "./tests",

	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	workers: process.env.CI ? 1 : undefined,
	reporter: "html",

	use: {
		baseURL: "https://thinking-tester-contact-list.herokuapp.com",
		trace: "on-first-retry",
	},

	projects: [
		// ======================
		// UI PROJECTS (Browsers)
		// ======================
		{
			name: "chromium",
			testDir: "./tests/ui",
			use: {
				...devices["Desktop Chrome"],
			},
		},
		// {
		//   name: 'firefox',
		//   testDir: './tests/ui',
		//   use: {
		//     ...devices['Desktop Firefox'],
		//   },
		// },
		// {
		//   name: 'webkit',
		//   testDir: './tests/ui',
		//   use: {
		//     ...devices['Desktop Safari'],
		//   },
		// },

		// ======================
		// API PROJECT
		// ======================
		{
			name: "api",
			testDir: "./tests/api",
			use: {
				baseURL: "https://thinking-tester-contact-list.herokuapp.com",
			},
		},
	],
});
