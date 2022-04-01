import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./routes/login";
import DashboardPageLayout from "./components/DashboardPageLayout";
import DashboardPage from "./routes/dashboard/index";
import InformationPage from "./routes/dashboard/information";
import PrivacyPage from "./routes/dashboard/privacy";
import ListPage from "./routes/dashboard/list";

export const URLS = {
	DASHBOARD: {
		INDEX: "/",
		INFORMATION: "information",
		PRIVACY: "privacy",
		LIST: "list",
	},
	LOGIN: "login",
};

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route element={<DashboardPageLayout />}>
				<Route
					path={URLS.DASHBOARD.INDEX}
					element={<DashboardPage />}
				/>
				<Route
					path={URLS.DASHBOARD.INFORMATION}
					element={<InformationPage />}
				/>
				<Route
					path={URLS.DASHBOARD.PRIVACY}
					element={<PrivacyPage />}
				/>
				<Route path={URLS.DASHBOARD.LIST} element={<ListPage />} />
			</Route>
			<Route path={URLS.LOGIN} element={<LoginPage />} />
		</Routes>
	</BrowserRouter>,
	document.getElementById("root")
);
