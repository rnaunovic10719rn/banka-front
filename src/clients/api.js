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

// delete_ ima underscore jer je delete rezervisana rec
export function delete_(url) {
	return request("DELETE", url);
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
				"Content-Type": "application/json"
			},
		});
		if (!response.ok) {
			console.log(response);
			throw Error("Request failed");
		}

		const contentType = response.headers.get("content-type");
		if (contentType.indexOf("application/json") !== -1) {
			return await response.json();
		}
		if (contentType.indexOf("text/plain") !== -1) {
			return await response.text();
		}
		throw new Error("Unknown content type");
	} catch (e) {
		throw e;
	}
}
