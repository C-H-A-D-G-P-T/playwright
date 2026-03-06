export const login = async (page, email, password) => {
    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.click('#submit')
}