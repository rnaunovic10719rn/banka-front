import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Tab from "./Tab";
const tabs = ["tab1", "tab2"];

test("<Tab/> => render", async () => {
	render(<Tab tabs={tabs} onChange={() => {}} />);
	const element = screen.getByTestId("common-tab");
	expect(element).toBeVisible();
	const elements = screen.getAllByTestId("common-button");
	expect(elements.length).toBe(2);
});

test("<Tab/> => action => click", async () => {
	const mockCallBack = jest.fn();
	render(<Tab tabs={tabs} onChange={mockCallBack} />);
	const elements = screen.getAllByTestId("common-button");
	fireEvent.click(elements[0]);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});
