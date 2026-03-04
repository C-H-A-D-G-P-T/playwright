import { expect } from '@playwright/test'
import { writeFile } from 'fs/promises';

export const logout = async (page) => {
    await page.click('#logout');
    await expect(page).toHaveTitle('Contact List App');
}

export const exportContactsAsJson = async (page, contactAmount) => {
    let listData = []
    for (let i = 0; i < contactAmount; i++) {
        const fullName = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[2]`).textContent();
        const birthDate = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[3]`).textContent();
        const email = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[4]`).textContent();
        const phoneNumber = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[5]`).textContent();
        const address = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[6]`).textContent();
        const city = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[7]`).textContent();
        const country = await page.locator(`//tr[@class="contactTableBodyRow"][${i + 1}]/td[8]`).textContent();
        const dictData = {
            Name: fullName,
            Birthdate: birthDate,
            Email: email,
            Address1: address,
            Address2: city,
            Country: country
        };
        console.log(dictData);
        listData.push(dictData);
    }
    console.log(listData);
    await writeFile('contacts.json', JSON.stringify(listData, null, 4));
    console.log('Contacts saved to contacts.json');
}