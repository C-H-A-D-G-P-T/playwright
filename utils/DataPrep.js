import { faker } from '@faker-js/faker';

export const prepareContactData = () => {
    const fakeBirthDateFormatted = (format = 'YYYY-MM-DD') => {
        const year = String(faker.number.int({ min: 1990, max: 2000}));
        const month = String(faker.number.int({ min: 1, max: 12})).padStart(2, "0");
        let day;
        if (month === '02') {
            day = String(faker.number.int({ min: 1, max: 28 })).padStart(2, "0");
        } else if (['04', '06', '09', '11'].includes(month)) {
            day = String(faker.number.int({ min: 1, max: 30 })).padStart(2, "0");
        } else {
            day = String(faker.number.int({ min: 1, max: 31 })).padStart(2, "0");
        }
        if (format === 'YYYY-DD-MM') {
            return `${year}-${day}-${month}`
        }
        return `${year}-${month}-${day}`
    }

    const fakePhoneNumber = () => {
        const firstPart = faker.number.int({ min: 8, max: 9});
        let phoneNumber = `0${firstPart}`
        for (let i = 0; i < 8; i++) {
            phoneNumber += String(faker.number.int({ min: 0, max: 9 }));
        }
        return phoneNumber;
    }

    const randomEmail = () => {
        return `t${Date.now()}_${faker.number.int(1000)}@gmail.com`;
    };

    const randomPassword = (length = 8) => {
        const randomString = Math.random().toString(36).substring(2, 2 + length);
        return `TEST${randomString}`
    }

    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        dateOfBirth: fakeBirthDateFormatted(),
        email: randomEmail(),
        password: randomPassword(),
        phone: fakePhoneNumber(),
        streetAddr1: faker.location.streetAddress(false),
        streetAddr2: faker.location.streetAddress(false),
        city: faker.location.city(),
        state: faker.location.state(),
        postalCode: faker.location.zipCode(),
        country: faker.location.country()
    };
}