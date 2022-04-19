import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardPageLayout from "./DashboardPageLayout";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import * as reactRedux from "react-redux";

const history = createMemoryHistory();

beforeEach(() => {
	const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
	useSelectorMock.mockReturnValue(null);
});

test("<DashboardPageLayout/> => render", async () => {
	render(
		<Router location={history.location} navigator={history}>
			<DashboardPageLayout />
		</Router>
	);
	const element = screen.getByTestId("component-auth-required");
	expect(element).toBeVisible();
});
