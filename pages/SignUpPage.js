import { expect } from "@playwright/test";
import { prepareContactData } from "../utils/DataPrep.js";
import { writeFile } from "fs/promises";

export class SignUpPage {
	constructor(page) {
		this.page = page;
		this.title = "Add User";
		this.header = page.getByRole("heading", { name: "Add User" });
		this.firstNameInput = page.locator("#firstName");
		this.lastNameInput = page.locator("#lastName");
		this.emailInput = page.locator("#email");
		this.passwordInput = page.locator("#password");
		this.submitButton = page.locator("#submit");
	}

	async signup() {
		const data = prepareContactData();

		await expect(this.page).toHaveTitle(this.title);
		await expect(this.header).toBeVisible();

		await this.firstNameInput.fill(data.firstName);
		await this.lastNameInput.fill(data.lastName);
		await this.emailInput.fill(data.email);
		await this.passwordInput.fill(data.password);
		await this.submitButton.click();

		const regUserData = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
		};

		console.log(`New user register successfully: ${regUserData}`)

		// await writeFile(
		// 	"temp/RegUserData.json",
		// 	JSON.stringify(regUserData, null, 4),
		// );
	}
}
