import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageLayout from "./PageLayout";

test("<PageLayout/> => render", async () => {
	render(<PageLayout />);
	const element = screen.getByTestId("component-page-layout");
	expect(element).toBeVisible();
});
