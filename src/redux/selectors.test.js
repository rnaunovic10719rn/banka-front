import { getUserSelector } from "./selectors";

test("getUserSelector", async () => {
	const r = getUserSelector({
		app: {
			user: "user",
		},
	});
	expect(r).toEqual("user");
});
