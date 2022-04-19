import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Window from "./Window";

test("<Window/> => render", async () => {
	render(<Window title="Title">Children</Window>);
	const element = screen.getByTestId("common-window");
	expect(element).toBeVisible();
});
