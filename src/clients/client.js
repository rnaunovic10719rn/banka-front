import { get, post, patch } from "./api";
import { authSaveToken } from "../auth";


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
	console.log("loggggggggggouttttttt");
}

export function getUserApi() {
	let url = new URL(BASE_URL + "/user");
	return get(url);
}

export function getUsersAction() {
	let url = new URL(BASE_URL + "/users");
	return get(url);
}

export function editUserAction(form) {
	let url = new URL(BASE_URL + "/user");
	return patch(url, form);
}

export function createUserAction(body) {
	let url = new URL(BASE_URL + "/user/create");
	return post(url, body);
}

export function changePasswordApi(password) {
	let url = new URL(BASE_URL + `/user/change-password`);
	const body = {
		newPassword: password,
	};
	return post(url, body);
}

export function getQrCodeApi() {
	let url = new URL(BASE_URL + "/otp/generateQrUri");
	const body = {
		label: "Banka",
		secret: "test",
	};
	return post(url, body);
}

export function postValidationCodeApi() {
	let url = new URL(BASE_URL + "/otp/validate");
	return post(url);
}

//export async function savePassAction(password1,password2, otp = null){
//	let url = new URL(BASE_URL + "/login");
//	let params = new URLSearchParams(url.search);
//}
