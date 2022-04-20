import { get, post, patch } from "./api";

const unmockedFetch = global.fetch;

afterAll(() => {
	global.fetch = unmockedFetch;
});

test("request() => ok => false", async () => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: false,
			json: () => Promise.resolve(),
		})
	);

	try {
		await get("path");
	} catch (e) {
		expect(e.message).toBe("Request failed");
	}
});

test("request() => response => json", async () => {
	const headers = new Headers({
		"content-type": "application/json",
	});
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ test: "test" }),
			headers: headers,
		})
	);

	const r = await get("path");
	expect(r).toEqual({ test: "test" });
});

test("request() => response => text", async () => {
	const headers = new Headers({
		"content-type": "text/plain",
	});
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			text: () => Promise.resolve("test"),
			headers: headers,
		})
	);

	const r = await get("path");
	expect(r).toEqual("test");
});

test("request() => response => unknown", async () => {
	const headers = new Headers({
		"content-type": "unknown",
	});
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			text: () => Promise.resolve("test"),
			headers: headers,
		})
	);

	try {
		await get("path");
	} catch (e) {
		expect(e.message).toEqual("Unknown content type");
	}
});

test("post()", async () => {
	const headers = new Headers({
		"content-type": "application/json",
	});
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ test: "test" }),
			headers: headers,
		})
	);

	const r = await post("path");
	expect(r).toEqual({ test: "test" });
});

test("patch()", async () => {
	const headers = new Headers({
		"content-type": "application/json",
	});
	global.fetch = jest.fn(() =>
		Promise.resolve({
			ok: true,
			json: () => Promise.resolve({ test: "test" }),
			headers: headers,
		})
	);

	const r = await patch("path");
	expect(r).toEqual({ test: "test" });
});
