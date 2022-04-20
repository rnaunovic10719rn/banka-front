import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Checkbox from "./Checkbox";

test("<Checkbox/> => render", async () => {
	render(<Checkbox label="Test" value="Value" onChange={() => {}} />);
	const element = screen.getByText("Test");
	expect(element).toBeVisible();
});

test("<Checkbox/> => action => click", async () => {
	const mockCallBack = jest.fn();
	render(<Checkbox label="Test" value="Value" onChange={mockCallBack} />);
	const element = screen.getByText("Test");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});
