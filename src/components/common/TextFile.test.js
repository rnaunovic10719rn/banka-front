import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import TextField from "./TextField";

test("<TextField/> => render", async () => {
	render(<TextField />);
	const element = screen.getByTestId("common-text-field");
	expect(element).toBeVisible();
});

test("<TextField/> => action => type", async () => {
	render(<TextField value="test" />);
	const element = screen.getByTestId("common-text-field");
	fireEvent.change(element, { target: { value: "test" } });
	expect(element.value).toBe("test");
});
