import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import RadioGroup from "./RadioGroup";

const options = ["value1", "value2"];

test("<RadioGroup/> => render", async () => {
	render(<RadioGroup name="test" options={options} onChange={() => {}} />);
	const element = screen.getByTestId("common-radio-group");
	const buttons = screen.queryAllByTestId("common-radio-button");
	expect(element).toBeVisible();
	expect(buttons.length).toBe(options.length);
});

test("<RadioGroup/> => action", async () => {
	const mockCallBack = jest.fn();
	render(
		<RadioGroup name="test" options={options} onChange={mockCallBack} />
	);
	const buttons = screen.queryAllByTestId("common-radio-button");
	fireEvent.click(buttons[0]);
	expect(mockCallBack.mock.calls.length).toEqual(1);
	expect(mockCallBack).toHaveBeenCalledWith("value1");
});
