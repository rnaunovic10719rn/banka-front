import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import App from "./App";

beforeEach(() => {
	const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
	useDispatchMock.mockReturnValue(null);
});

test("<App/> => render", async () => {
	render(<App />);
	const element = screen.getByTestId("app");
	expect(element).toBeVisible();
});
