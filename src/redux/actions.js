export const ADD_USER_ACTION = "ADD_USER_ACTION";
export const ADD_ERROR_ACTION = "ADD_ERROR_ACTION";
export const CLEAR_ERROR_ACTION = "CLEAR_ERROR_ACTION";

export function addUserAction(user) {
	return {
		type: ADD_USER_ACTION,
		value: user,
	};
}

export function addErrorAction(error) {
	return {
		type: ADD_ERROR_ACTION,
		value: error,
	};
}
