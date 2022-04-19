import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

test("<Modal/> => render", async () => {
	render(
		<Modal id="modal-id" visible={true} title="Title" onClose={() => {}} />
	);
	const element = screen.getByText("Title");
	expect(element).toBeVisible();
});

test("<Modal/> => render => button", async () => {
	render(
		<Modal
			id="modal-id"
			visible={true}
			title="Title"
			onClose={() => {}}
			cta={() => {}}
		/>
	);
	const element = screen.getByText("Click");
	expect(element).toBeVisible();
});

test("<Modal/> => action => close", async () => {
	const mockCallBack = jest.fn();
	render(
		<Modal
			id="modal-id"
			visible={true}
			title="Title"
			onClose={mockCallBack}
			cta={() => {}}
		/>
	);
	const element = screen.getByTestId("common-exit-button");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});
