export const ADD_USER_ACTION = "ADD_USER_ACTION";
export const ADD_ERROR_ACTION = "ADD_ERROR_ACTION";
export const CLEAR_ERROR_ACTION = "CLEAR_ERROR_ACTION";
export const ADD_STOCKS_ACTION = "ADD_STOCKS_ACTION";
export const ADD_FOREX_ACTION = "ADD_FOREX_ACTION";
export const ADD_TRANSACTIONS = "ADD_TRANSACTIONS";

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

export function addStocksAction(stocks) {
	return {
		type: ADD_STOCKS_ACTION,
		value: stocks,
	};
}

export function addForexAction(forex) {
	return {
		type: ADD_FOREX_ACTION,
		value: forex,
	};
}

export function addTransactionsAction(transactions) {
	return {
		type: ADD_TRANSACTIONS,
		value: transactions,
	};
}
