import {
	ADD_ERROR_ACTION,
	ADD_FOREX_ACTION,
	ADD_STOCKS_ACTION,
	ADD_USER_ACTION,
	CLEAR_ERROR_ACTION,
} from "./actions";

const initialState = {
	user: null,
	error: null,
	stocks: [],
	forex: [],
};

function addUser(state, action) {
	return {
		...state,
		user: action.value,
	};
}

function addError(state, action) {
	return {
		...state,
		error: action.value,
	};
}

function clearError(state) {
	return {
		...state,
		error: null,
	};
}

function addStocks(state, action) {
	return {
		...state,
		stocks: action.value,
	};
}

function addForex(state, action) {
	return {
		...state,
		forex: action.value,
	};
}

const appReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_USER_ACTION:
			return addUser(state, action);
		case ADD_ERROR_ACTION:
			return addError(state, action);
		case CLEAR_ERROR_ACTION:
			return clearError(state);
		case ADD_STOCKS_ACTION:
			return addStocks(state, action);
		case ADD_FOREX_ACTION:
			return addForex(state, action);
		default:
			return state;
	}
};

export default appReducer;
