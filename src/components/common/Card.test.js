import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

test("<Card/> => render", async () => {
	render(<Card title="Test" />);
	const element = screen.getByText("Test");
	expect(element).toBeVisible();
});

test("<Card/> => render => children", async () => {
	render(
		<Card title="Test">
			<p>Children</p>
		</Card>
	);
	const element = screen.getByText("Children");
	expect(element).toBeVisible();
});
