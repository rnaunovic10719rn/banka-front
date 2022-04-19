import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import * as reactRedux from "react-redux";

const history = createMemoryHistory();

beforeEach(() => {
	const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
	useSelectorMock.mockReturnValue(null);
});

afterEach(() => {});

test("<Header/> => render", async () => {
	render(
		<Router location={history.location} navigator={history}>
			<Header />
		</Router>
	);
	const element = screen.getByTestId("component-header");
	expect(element).toBeVisible();
});
