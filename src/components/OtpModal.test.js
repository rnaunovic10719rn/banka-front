import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import OtpModal from "./OtpModal";
import * as client from "../clients/client";

test("<OtpModal/> => render", async () => {
	render(<OtpModal visible={true} onClose={() => {}} />);
	const element = screen.getByText("OTP Setup");
	expect(element).toBeVisible();
});

test("<OtpModal/> => fetch => data", async () => {
	const qrCodeApiMock = jest.spyOn(client, "getQrCodeApi");
	act(() => {
		qrCodeApiMock.mockResolvedValue("test");
	});

	render(<OtpModal visible={true} onClose={() => {}} />);

	expect(qrCodeApiMock.mock.calls.length).toEqual(1);
	await screen.findByTitle("QR CODE");
});

test("<OtpModal/> => action => close", async () => {
	const qrCodeApiMock = jest.spyOn(client, "getQrCodeApi");
	act(() => {
		qrCodeApiMock.mockResolvedValue("test");
	});

	const mockCallBack = jest.fn();
	render(<OtpModal visible={true} onClose={mockCallBack} />);
	const element = screen.getByTestId("common-exit-button");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(1);
	await screen.findByTitle("QR CODE");
});
