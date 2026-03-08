import { expect } from "@playwright/test";
import { prepareContactData } from "../utils/DataPrep.js";
import { writeFile } from "fs/promises";

export class AddContactPage {
	constructor(page) {
		this.page = page;
		this.title = "Add Contact";
		this.header = page.getByRole("heading", { name: "Add Contact" });
		this.firstNameInput = page.locator("#firstName");
		this.lastNameInput = page.locator("#lastName");
		this.birthdateInput = page.locator("#birthdate");
		this.emailInput = page.locator("#email");
		this.phoneInput = page.locator("#phone");
		this.street1Input = page.locator("#street1");
		this.street2Input = page.locator("#street2");
		this.cityInput = page.locator("#city");
		this.stateProvinceInput = page.locator("#stateProvince");
		this.postalCodeInput = page.locator("#postalCode");
		this.countryInput = page.locator("#country");
		this.submitBtn = page.locator("#submit");
		this.cancelBtn = page.locator("#cancel");
		this.logoutBtn = page.locator("#logout");
	}

	async addNewContacts() {
		await expect(this.page).toHaveTitle(this.title);
		await expect(this.page).toHaveTitle(this.title);
		await expect(this.header).toBeVisible();

		const data = prepareContactData();
		await this.firstNameInput.fill(data.firstName);
		await this.lastNameInput.fill(data.lastName);
		await this.birthdateInput.fill(data.dateOfBirth);
		await this.emailInput.fill(data.email);
		await this.phoneInput.fill(data.phone);
		await this.street1Input.fill(data.streetAddr1);
		await this.street2Input.fill(data.streetAddr2);
		await this.cityInput.fill(data.city);
		await this.stateProvinceInput.fill(data.state);
		await this.postalCodeInput.fill(data.postalCode);
		await this.countryInput.fill(data.country);

		await this.submitBtn.click();

		const addedUserDetail = [
			`${data.firstName} ${data.lastName}`,
			`${data.dateOfBirth}`,
			`${data.email}`,
			`${data.phone}`,
			`${data.streetAddr1} ${data.streetAddr2}`,
			`${data.city} ${data.state} ${data.postalCode}`,
			`${data.country}`,
		];

		await writeFile(
			"temp/AddedUser.json",
			JSON.stringify(addedUserDetail, null, 4),
		);
	}
}
