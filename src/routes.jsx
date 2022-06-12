import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import HeaderPageLayout from "./components/HeaderPageLayout";
import InformationPage from "./pages/dashboard/information";
import ListPage from "./pages/dashboard/list";
import PageLayout from "./components/PageLayout";
import App from "./App";
import NewUserPage from "./pages/dashboard/newuser";
import LoginPage from "./pages/login";
import TradePage from "./pages/dashboard/trade";
import OverviewPage from "./pages/dashboard/overview";
import SystemPage from "./pages/dashboard/system";
import OrdersPage from "./pages/dashboard/order";
import OverviewStockPage from "./pages/dashboard/overview-stock";
import ChangePasswordPage from "./pages/dashboard/changepass";
import PortfolioPage from "./pages/dashboard/portfolio";

export const URLS = {
	DASHBOARD: {
		INDEX: "/",
		STOCK: "berza",
		INFORMATION: "information",
		PORTFOLIO: "portfolio",
		PRIVACY: "privacy",
		LIST: {
			INDEX: "list",
			NEW_USER: "list/new-user",
		},
		CHANGEPASSWORD: {
			REGULAR: "changepassword",
			WITH_TOKEN: "changepassword/:token"
		},
		OVERVIEW: {
			INDEX: "view",
			STOCK: "view/:id",
		},
		TRADE: "trade",
		ORDERS: "orders",
		SYSTEM: "system",
	},
	LOGIN: "login",
	REGISTER: "register",
	EMAIL: "email"
};

export function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<App />}>
					<Route path={URLS.DASHBOARD.INDEX} element={<Navigate to={URLS.DASHBOARD.STOCK} replace />} />
					<Route element={<HeaderPageLayout />}>
						<Route
							path={URLS.DASHBOARD.STOCK}
							element={<OverviewPage />}
						/>
					</Route>
					<Route element={<HeaderPageLayout />}>
						<Route
							path={URLS.DASHBOARD.LIST.INDEX}
							element={<ListPage />}
						/>
						<Route
							path={URLS.DASHBOARD.LIST.NEW_USER}
							element={<NewUserPage />}
						/>
						<Route
							path={URLS.DASHBOARD.TRADE}
							element={<TradePage />}
						/>
						<Route
							path={URLS.DASHBOARD.OVERVIEW.INDEX}
							element={<OverviewPage />}
						></Route>
						<Route
							path={URLS.DASHBOARD.OVERVIEW.STOCK}
							element={<OverviewStockPage />}
						/>
						<Route
							path={URLS.DASHBOARD.ORDERS}
							element={<OrdersPage />}
						/>
						<Route
							path={URLS.DASHBOARD.SYSTEM}
							element={<SystemPage />}
						/>
						<Route
							path={URLS.DASHBOARD.INFORMATION}
							element={<InformationPage />}
						/>
						<Route
							path={URLS.DASHBOARD.PORTFOLIO}
							element={<PortfolioPage />}
						/>
					</Route>
					<Route element={<PageLayout />}>
						<Route path={URLS.LOGIN} element={<LoginPage />} />
						<Route path={URLS.DASHBOARD.CHANGEPASSWORD.REGULAR} element={<ChangePasswordPage />} />
						<Route path={URLS.DASHBOARD.CHANGEPASSWORD.WITH_TOKEN} element={<ChangePasswordPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
