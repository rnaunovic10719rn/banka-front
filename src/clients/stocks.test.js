import * as api from "./api";
import { act } from "react-dom/test-utils";
import * as stocks from "./stocks";

test("getStockInfo()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStockInfo("AAPL", "func", "size");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getStockInfo() => interval", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStockInfo("AAPL", "func", "size", "inverval");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getStocksApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStocksApi("AAPL", "func", "size");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getStocksSearchApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStocksSearchApi();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getStocksDetailsApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStockDetailsApi("searchData");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getStocksTimeSeriesApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getStockTimeSeriesApi("ticker", "range");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getForexApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getForexApi();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getForexSearchApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getForexSearchApi("from", "to");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getForexDetailsApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getForexDetalsApi("from", "to");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getForexTimeSeriesApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getForexTimeSeriesApi("from", "to", "range");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getFuturesApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getFuturesApi();
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getFuturesSearchApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getFuturesSearchApi("futures");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getFuturesDetailsApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getFuturesDetailsApi("futures");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("getFuturesTimeSeriesApi()", async () => {
	const apiMock = jest.spyOn(api, "get");
	stocks.getForexTimeSeriesApi("futures", "range");
	expect(apiMock.mock.calls.length).toBe(1);
});

test("buySellStocks()", async () => {
	const apiMock = jest.spyOn(api, "post");
	stocks.buySellStocks({ form: "form" });
	expect(apiMock.mock.calls.length).toBe(1);
});
