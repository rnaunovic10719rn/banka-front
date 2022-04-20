import * as client from "./client";
import { act } from "react-dom/test-utils";
import * as api from "./api";

test("loginAction()", async () => {
	const apiMock = jest.spyOn(api, "post");
	act(() => {
		apiMock.mockResolvedValue("token");
	});
	const r = await client.loginAction("username", "password");
	expect(r).toEqual("token");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getUserApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	client.getUserApi();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getUsersAction()", async () => {
	const apiMock = jest.spyOn(api, "get");
	client.getUsersAction();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("generateSecret()", async () => {
	const apiMock = jest.spyOn(api, "get");
	client.generateSecret();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getUserId()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.getUserId();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("editUserAction()", async () => {
	const apiMock = jest.spyOn(api, "patch");
	client.editUserAction({ data: "data" });
	expect(apiMock.mock.calls.length).toBe(1);
});

test("editUserByIdAction()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.editUserByIdAction({ data: "data" });
	expect(apiMock.mock.calls.length).toBe(1);
});

test("createUserAction()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.createUserAction({ data: "data" });
	expect(apiMock.mock.calls.length).toBe(1);
});

test("deleteUserAction()", async () => {
	const apiMock = jest.spyOn(api, "delete_");
	client.deleteUserAction(1);
	expect(apiMock.mock.calls.length).toBe(1);
});

test("changePasswordApi()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.changePasswordApi("password");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getQrCodeApi()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.getQrCodeApi("secret");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("postValidationCodeApi()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.postValidationCodeApi("otp", "secret");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("resetEmail()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.resetEmail("email");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("changePasswordById()", async () => {
	const apiMock = jest.spyOn(api, "post");
	client.changePasswordById("id", "password");
	expect(apiMock.mock.calls.length).toBe(1);
});
