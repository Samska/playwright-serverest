const { test, expect } = require("@playwright/test");
const { userBody, postUser, getUser, userSchema } = require("../../support/api/user");

test.describe("user route", () => {
    test("get all users", async ({ request }) => {
        const { response, responseJson } = await getUser(request, "");

        expect(response.status()).toBe(200);
        expect(responseJson).toHaveProperty("quantidade");
        expect(responseJson).toHaveProperty("usuarios");
        expect(Array.isArray(responseJson.usuarios)).toBe(true);
    });

    test("create a new user", async ({ request }) => {
        const { response, responseJson } = await postUser(request, userBody);

        expect(response.status()).toBe(201);
        expect(responseJson).toHaveProperty("message", "Cadastro realizado com sucesso");
        expect(responseJson).toHaveProperty("_id");
    });

    test("email already exists", async ({ request }) => {        
        await postUser(request, userBody);
        const { response, responseJson } = await postUser(request, userBody);

        expect(response.status()).toBe(400);
        expect(responseJson).toHaveProperty("message", "Este email já está sendo usado");
    });

    test("get user by id and validate schema", async ({ request }) => {
        const { responseJson } = await postUser(request, userBody);
        const { response: responseGet, responseJson: responseGetJson } = await getUser(request, responseJson._id);

        expect(responseGet.status()).toBe(200);

        const { error } = userSchema.validate(responseGetJson);
        expect(error).toBeUndefined();
    });

    test("get user by id not found", async ({ request }) => {
        const { response, responseJson } = await getUser(request, "150364");

        expect(response.status()).toBe(400);
        expect(responseJson).toHaveProperty("message", "Usuário não encontrado");
    });

    test("update user by id with success", async ({ request }) => {
        const { responseJson } = await postUser(request, userBody);

        userBody.nome = "Samska";

        const responseUpdate = await request.put(`/usuarios/${responseJson._id}`, { data: userBody });
        const responseUpdateJson = await responseUpdate.json();

        expect(responseUpdate.status()).toBe(200);
        expect(responseUpdateJson).toHaveProperty("message", "Registro alterado com sucesso");
    });

    test("delete user by id with success", async ({ request }) => {
        const { responseJson } = await postUser(request, userBody);
        const responseDelete = await request.delete(`/usuarios/${responseJson._id}`);
        const responseDeleteJson = await responseDelete.json();

        expect(responseDelete.status()).toBe(200);
        expect(responseDeleteJson).toHaveProperty("message", "Registro excluído com sucesso");
    });
});