const { faker } = require("@faker-js/faker");

const userData = {
    nome: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password()
};

const createUser = async (page, userData) => {
    await page.fill("id=nome", userData.nome);
    await page.fill("id=email", userData.email);
    await page.fill("id=password", userData.password);
    await page.click("id=administrador");
    await page.click("[data-testid='cadastrar']");
};

module.exports = {
    userData,
    createUser
};