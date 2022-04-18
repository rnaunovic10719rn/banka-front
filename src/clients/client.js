import { get, post, patch, delete_ } from "./api";
import { authSaveToken, authGetToken } from "../auth";


const BASE_URL = "http://localhost:8080/api";

export async function loginAction(username, password, otp = null) {
	let url = new URL(BASE_URL + "/login");
	let params = new URLSearchParams(url.search);
	params.append("username", username);
	params.append("password", password);
	if (otp) {
		params.append("otp", otp);
	}
	url = url + "?" + params;
	const r = await post(url);
	authSaveToken(r);
	return r;
}

export function logoutAction() {
	localStorage.clear();
}

export function getUserApi() {
	let url = new URL(BASE_URL + "/user");
	return get(url);
}

export function getUsersAction() {
	let url = new URL(BASE_URL + "/users");
	return get(url);
}

export function generateSecret() {
	let url = new URL(BASE_URL + "/otp/generateSecret");
	return get(url);
}

export function getUserId() {
	const token = authGetToken();
	let url = new URL(BASE_URL + "/user/getId/" + token);
	return post(url);
}

export function editUserAction(form) {
	let url = new URL(BASE_URL + "/user");
	return patch(url, form);
}

export function editUserByIdAction(id, form) {
	let url = new URL(BASE_URL + "/user/edit/" + id);
	return post(url, form);
}

export function createUserAction(body) {
	let url = new URL(BASE_URL + "/user/create");
	return post(url, body);
}

export function deleteUserAction(id) {
	let url = new URL(BASE_URL + "/user/delete/" + id);
	return delete_(url);
}

export function changePasswordApi(password) {
	let url = new URL(BASE_URL + `/user/change-password`);
	const body = {
		newPassword: password,
	};
	return post(url, body);
}

export function getQrCodeApi(secret) {
	console.log(secret);
	let url = new URL(BASE_URL + "/otp/generateQrUri");
	const body = {
		label: "Banka",
		secret: secret,
	};
	return post(url, body);
}

export function postValidationCodeApi(otp, secret) {
	let url = new URL(BASE_URL + "/otp/validate");
	const body = {
		otp: otp,
		secret: secret
	};
	return post(url, body);
}

export function resetEmail(email){
	let url = new URL(BASE_URL + "/user/reset-password");
	const body = {
		email: email
	};
	return post(url, body);
}

export function changePasswordById(id,password){
	let url = new URL(BASE_URL + "/user/new-password/" + id);
	const body = {
		newPassword: password,
	};
	return post(url, body);
}

//export async function savePassAction(password1,password2, otp = null){
//	let url = new URL(BASE_URL + "/login");
//	let params = new URLSearchParams(url.search);
//}
