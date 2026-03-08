import { test } from "@playwright/test";
import { SignUpPage } from "../../pages/SignUpPage.js";
import { LoginPage } from "../../pages/LoginPage.js";
import { getUserData } from "../../utils/DataPrep.js";
import { ContactListPage } from "../../pages/ContactListPage.js";
import { AddContactPage } from "../../pages/AddContactPage.js";

test("Sign up successfully", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const signupPage = new SignUpPage(page);

	await loginPage.goto();
	await loginPage.clickSignUp();
	await signupPage.signup();
});

test("Log in successfully", async ({ page }) => {
	const loginPage = new LoginPage(page);

	await loginPage.goto();
	await loginPage.login(getUserData().email, getUserData().password);
});

test("Add contacts successfully", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const contactListPage = new ContactListPage(page);
	const addContactPage = new AddContactPage(page);

	await loginPage.goto();
	await loginPage.login(getUserData().email, getUserData().password);

	await contactListPage.clickAddNewContactBtn();
	await addContactPage.addNewContacts();
	await contactListPage.validateAddedContact();
});

test("Add multiple contacts successfully", async ({ page }) => {
	const loginPage = new LoginPage(page);
	const contactListPage = new ContactListPage(page);
	const addContactPage = new AddContactPage(page);

	await loginPage.goto();
	await loginPage.login(getUserData().email, getUserData().password);

	for (let i = 0; i < 3; i++) {
		await contactListPage.clickAddNewContactBtn();
		await addContactPage.addNewContacts();
		await contactListPage.validateAddedContact();
	}
});
