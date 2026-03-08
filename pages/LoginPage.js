import { expect } from "@playwright/test";

export class LoginPage {
	constructor(page) {
		this.page = page;
		this.title = "Contact List App";
		this.header = page.getByRole("heading", { name: "Contact List App" });
		this.emailInput = page.locator("#email");
		this.passwordInput = page.locator("#password");
		this.loginBtn = page.locator("#submit");
		this.signupBtn = page.locator("#signup");
	}

	async goto() {
		await this.page.goto("/");
		// await page.waitForFunction(() => document.readyState === 'complete');
		await expect(this.page).toHaveTitle(this.title);
		await expect(this.header).toBeVisible();
	}

	async login(email, password) {
		await this.emailInput.fill(email);
		await this.passwordInput.fill(password);
		await this.loginBtn.click();
	}

	async clickSignUp() {
		await this.signupBtn.click();
	}
}
