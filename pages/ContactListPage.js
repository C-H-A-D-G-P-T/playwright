import { expect } from "@playwright/test";
import fs from "fs";

export class ContactListPage {
	constructor(page) {
		this.page = page;
		this.title = "My Contacts";
		this.header = page.getByRole("heading", { name: "Contact List" });
		this.addNewContactBtn = page.locator("#add-contact");

		this.tableHeaders = page.locator("th");
		this.columnList = [
			"Name",
			"Birthdate",
			"Email",
			"Phone",
			"Address",
			"City, State/Province, Postal Code",
			"Country",
		];

		this.logoutBtn = page.locator("#logout");
	}

	async goto() {
		await expect(this.page).toHaveTitle(this.title);
		await expect(this.header).toBeVisible();
	}

	async clickAddNewContactBtn() {
		await this.goto();
		await this.addNewContactBtn.click();
	}

	async validateAddedContact() {
		await this.goto();
		await expect(this.tableHeaders).toHaveText(this.columnList);

		const addedUser = JSON.parse(
			fs.readFileSync("temp/AddedUser.json", "utf8"),
		);
		// const row = this.page.locator(`//tr[./td[text()="${addedUser[0]}"]]/td:not(:first-child)`)
		const row = this.page.locator("tr").filter({ hasText: addedUser[0] });
		const cells = row.locator("td");
		// await expect(cells).toHaveText(addedUser)
		await expect(cells).toContainText(addedUser);
	}

	async logout() {
		await this.logoutBtn.click();
	}
}
