import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Alert, { ALERT_TYPES } from "./Alert";

test("<Alert/> => render", async () => {
	render(<Alert text="Test" onDismiss={() => {}} />);
	const element = screen.getByTestId("common-alert");
	expect(element).toBeVisible();
});

test("<Alert/> => render => success", async () => {
	render(
		<Alert text="Test" design={ALERT_TYPES.SUCCESS} onDismiss={() => {}} />
	);
	const element = screen.getByTestId("common-alert");
	expect(element).toHaveClass("bg-emerald-400");
});

test("<Alert/> => render => warning", async () => {
	render(
		<Alert text="Test" design={ALERT_TYPES.WARNING} onDismiss={() => {}} />
	);
	const element = screen.getByTestId("common-alert");
	expect(element).toHaveClass("bg-amber-400");
});

test("<Alert/> => render => danger", async () => {
	render(
		<Alert text="Test" design={ALERT_TYPES.DANGER} onDismiss={() => {}} />
	);
	const element = screen.getByTestId("common-alert");
	expect(element).toHaveClass("bg-red-400");
});

test("<Alert/> => action => dismiss", async () => {
	const mockCallBack = jest.fn();
	const { container } = render(
		<Alert text="Test" onDismiss={mockCallBack} />
	);
	const button = container.querySelector("button");
	fireEvent.click(button);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});
