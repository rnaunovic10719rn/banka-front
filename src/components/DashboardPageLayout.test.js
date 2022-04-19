import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DashboardPageLayout from "./DashboardPageLayout";

jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => jest.fn(),
}));

jest.mock("react-redux", () => {
	const ActualReactRedux = jest.requireActual("react-redux");
	return {
		...ActualReactRedux,
		useSelector: jest.fn().mockImplementation(() => {
			return mockState;
		}),
	};
});

test.skip("<DashboardPageLayout/> => render", async () => {
	render(<DashboardPageLayout />);
	const element = screen.getByTestId("component-auth-required");
	expect(element).toBeVisible();
});
