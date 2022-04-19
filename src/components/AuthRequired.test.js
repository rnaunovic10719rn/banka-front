import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import AuthRequired from "./AuthRequired";

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useNavigate: () => mockedUsedNavigate,
}));

test("<AuthRequired/> => render", async () => {
	render(<AuthRequired />);
	const element = screen.getByTestId("component-auth-required");
	expect(element).toBeVisible();
});

test("<AuthRequired/> => action => valid auth token", async () => {
	const mockedAuthGetToken = jest.fn("token");
	jest.mock("../auth", () => ({
		...jest.requireActual("../auth"),
		authGetToken: () => mockedAuthGetToken,
	}));
	render(<AuthRequired />);
	const element = screen.getByTestId("component-auth-required");
	expect(element).toBeVisible();
	expect(mockedUsedNavigate.mock.calls.length).toEqual(1);
});
