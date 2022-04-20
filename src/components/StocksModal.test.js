import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import StocksModal from "./StocksModal";
import * as stocks from "../clients/stocks";
import { act } from "react-dom/test-utils";

const detailsDataMock = {
	opisHartije: "opisHartije",
	previousClose: "previousClose",
	change: "change",
	changePercen: "changePercent",
	low: "low",
	high: "high",
	open: "open",
	volume: "volume",
	priceVolume: "priceVolume",
	outstandingShares: "outstandingShares",
	marketCap: "marketCap",
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

test("<StocksModal/> => render", async () => {
	render(<StocksModal ticker="AAPL" onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	expect(element).toBeVisible();
});

test("<StocksModal/> => fetch => details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getStockDetailsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
	});
	render(<StocksModal ticker="AAPL" onClose={() => {}} />);

	expect(detailsApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});

test("<StocksModal/> => fetch => no details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getStockDetailsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(null);
	});
	render(<StocksModal ticker="AAPL" onClose={() => {}} />);
	expect(detailsApiMock.mock.calls.length).toEqual(1);
});

test("<StocksModal/> => fetch => time series", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getStockDetailsApi");
	const timeSeriesApiMock = jest.spyOn(stocks, "getStockTimeSeriesApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
		timeSeriesApiMock.mockResolvedValue(timeSeriesDataMock);
	});
	render(<StocksModal ticker="AAPL" onClose={() => {}} />);

	expect(timeSeriesApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});
