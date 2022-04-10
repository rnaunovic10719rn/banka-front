import { authGetToken } from "../auth";

export function get(url) {
	return request("GET", url);
}

export function post(url, body = null) {
	return request("POST", url, body);
}

export function patch(url, body = null) {
	return request("PATCH", url, body);
}

async function request(method, url, body) {
	const token = authGetToken();
	try {
		const response = await fetch(url, {
			method: method,
			body: JSON.stringify(body),
			mode: "cors",
			headers: {
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
		});
		if (!response.ok) {
			throw Error("Request failed");
		}
		return await response.json();
	} catch (e) {
		throw e;
	}
}
