import { test } from '@playwright/test';
import { signup } from '../../pages/SignUpPage.js'
import { logout, exportContactsAsJson } from '../../pages/ContactListPage.js'
import { login } from '../../pages/LoginPage.js'
import { addNewContacts } from '../../pages/AddContactPage.js'
import { deleteAllContacts } from '../../pages/ContactDetailsPage.js'

test('Sign up successfully', async ({ page }) => {
    const { email, password } = await signup(page);
    await logout(page);
    await login(page, email, password);
    const contactAmount = await addNewContacts(page, 2);
    await exportContactsAsJson(page, contactAmount);
    await deleteAllContacts(page);
})
