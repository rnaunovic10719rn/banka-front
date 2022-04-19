import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FuturesModal from "./FuturesModal";
import * as stocks from "../clients/stocks";
import { act } from "react-dom/test-utils";

const detailsDataMock = {
	opisHartije: "opisHartije",
	symbol: "symbol",
	low: "low",
	high: "high",
	open: "open",
	settle: "settle",
	volume: "volume",
};

const timeSeriesDataMock = [
	{
		close: 0,
		open: 1,
	},
	{
		close: 0,
		open: 1,
	},
];

test("<FuturesModal/> => render", async () => {
	render(<FuturesModal future="AAPL" onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	expect(element).toBeVisible();
});

test("<FuturesModal/> => fetch => details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getFuturesDetailsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
	});
	render(<FuturesModal future="AAPL" onClose={() => {}} />);

	expect(detailsApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});

test("<FuturesModal/> => fetch => no details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getFuturesDetailsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(null);
	});
	render(<FuturesModal future="AAPL" onClose={() => {}} />);
	expect(detailsApiMock.mock.calls.length).toEqual(1);
});

test("<FuturesModal/> => fetch => time series", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getFuturesDetailsApi");
	const timeSeriesApiMock = jest.spyOn(stocks, "getFuturesTimeSeriesApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
		timeSeriesApiMock.mockResolvedValue(timeSeriesDataMock);
	});
	render(<FuturesModal future="AAPL" onClose={() => {}} />);

	expect(timeSeriesApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});
