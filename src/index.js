import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { AppRoutes } from "./routes";
import "./index.css";
import { createStore } from "redux";
import rootReducer from "./redux";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const store = createStore(
	rootReducer,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
	<Provider store={store}>
		<ReactNotifications />
		<AppRoutes />
	</Provider>,
	document.getElementById("root")
);
