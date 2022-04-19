import { addErrorAction, addUserAction } from "./actions";
import appReducer from "./reducer";

test("initial state", async () => {
	expect(appReducer(undefined, {})).toEqual({
		user: null,
		error: null,
	});
});

test("addUser()", async () => {
	const previousState = {
		user: null,
		error: null,
	};
	expect(appReducer(previousState, addUserAction("user"))).toEqual({
		user: "user",
		error: null,
	});
});

test("addError()", async () => {
	const previousState = {
		user: null,
		error: null,
	};
	expect(appReducer(previousState, addErrorAction("error"))).toEqual({
		user: null,
		error: "error",
	});
});

test("clearError()", async () => {
	const previousState = {
		user: null,
		error: "error",
	};
	expect(appReducer(previousState, addErrorAction(null))).toEqual({
		user: null,
		error: null,
	});
});
