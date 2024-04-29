const login = async (page, credentials) => {
    const { email, password } = credentials;
    await page.fill("[data-testid='email']", email);
    await page.fill("[data-testid='senha']", password);
    await page.click("[data-testid='entrar']");
}

module.exports = {
    login
};