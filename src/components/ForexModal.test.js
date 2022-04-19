import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForexModal from "./ForexModal";
import * as stocks from "../clients/stocks";
import { act } from "react-dom/test-utils";

const detailsDataMock = {
	opisHartije: "opisHartije",
	fromCurrency: "fromCurrency",
	toCurrency: "toCurrency",
	exchangeRate: "exchangeRate",
	bid: "bid",
	ask: "ask",
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

test("<ForexModal/> => render", async () => {
	render(<ForexModal from="RSD" to="EUR" onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	expect(element).toBeVisible();
});

test("<ForexModal/> => fetch => details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getForexDetalsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
	});
	render(<ForexModal from="RSD" to="EUR" onClose={() => {}} />);

	expect(detailsApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});

test("<ForexModal/> => fetch => no details", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getForexDetalsApi");
	act(() => {
		detailsApiMock.mockResolvedValue(null);
	});
	render(<ForexModal from="RSD" to="EUR" onClose={() => {}} />);
	expect(detailsApiMock.mock.calls.length).toEqual(1);
});

test("<ForexModal/> => fetch => time series => green chart", async () => {
	const detailsApiMock = jest.spyOn(stocks, "getForexDetalsApi");
	const timeSeriesApiMock = jest.spyOn(stocks, "getForexTimeSeriesApi");
	act(() => {
		detailsApiMock.mockResolvedValue(detailsDataMock);
		timeSeriesApiMock.mockResolvedValue(timeSeriesDataMock);
	});
	render(<ForexModal from="RSD" to="EUR" onClose={() => {}} />);

	expect(timeSeriesApiMock.mock.calls.length).toEqual(1);
	await screen.findByText("opisHartije");
});
