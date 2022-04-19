import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserModal from "./UserModal";

test("<UserModal/> => render", async () => {
	render(<UserModal id="modal-id" onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	expect(element).toBeVisible();
});

test("<UserModal/> => render => form", async () => {
	render(<UserModal id="modal-id" onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	const elements = screen.getAllByTestId("common-text-field");
	// fireEvent.change(element, { target: { value: "test" } });
	expect(elements.length).toBe(5);
});

test("<UserModal/> => action => fill form", async () => {
	render(<UserModal id="modal-id" onClose={() => {}} />);

	const elements = screen.getAllByTestId("common-text-field");
	elements.map((e) => {
		fireEvent.change(e, { target: { value: "test" } });
		expect(e.value).toBe("test");
	});

	const select = screen.getByTestId("common-select");
	fireEvent.change(select, {
		target: { value: "ROLE_ADMIN" },
	});
	const options = screen.getAllByTestId("common-select-option");
	expect(options[0].selected).toBeTruthy();
});

test("<UserModal/> => action => submit", async () => {
	const mockCallBack = jest.fn();
	render(<UserModal id="modal-id" onClose={mockCallBack} />);
	const element = screen.getByText("Register");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(0);
});
