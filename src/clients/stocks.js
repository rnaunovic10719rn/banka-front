import { get, post } from "./api";
const alpha = require("alphavantage")({ key: "R2A94K4PARJ2R5LS" });
const BASE_URL = "http://localhost:8082/api";

// http://localhost:8082/api/akcije/podaci

export async function getRawStockAction(stock, format) {
  const data = await alpha.data.intraday("AAPL");
  return data[format["payloadKey"]];
}

export function getStockInfo(symbol, func, size, interval = null) {
  let url = new URL("https://www.alphavantage.co/query");
  let params = new URLSearchParams(url.search);
  params.append("symbol", symbol);
  params.append("function", func);
  params.append("datatype", "json");
  params.append("outputsize", size);
  if (interval) {
    params.append("interval", interval);
  }
  params.append("apikey", "R2A94K4PARJ2R5LS");

  url = url + "?" + params;
  return get(url);
}

export function getStocksApi() {
  let url = new URL(BASE_URL + "/akcije/podaci");
  return get(url);
}

export function getStocksSearchApi(searchData) {
  let url = new URL(BASE_URL + `/akcije/podaci/${searchData}`);
  return get(url);
}

export function getStockDetailsApi(ticker) {
  let url = new URL(BASE_URL + "/akcije/podaci/" + ticker);
  return get(url);
}

export function getStockTimeSeriesApi(ticker, range) {
  let url = new URL(BASE_URL + `/akcije/podaci/timeseries/${range}/${ticker}`);
  return get(url);
}

export function getForexApi() {
  let url = new URL(BASE_URL + "/forex/podaci");
  return get(url);
}

export function getForexSearchApi(from, to) {
  let url = new URL(BASE_URL + `/forex/podaci/${from}/${to}`);
  return get(url);
}

export function getForexDetalsApi(from, to) {
  let url = new URL(BASE_URL + `/forex/podaci/${from}/${to}`);
  return get(url);
}

export function getForexTimeSeriesApi(from, to, range) {
  let url = new URL(
    BASE_URL + `/forex/podaci/timeseries/${range}/${from}/${to}`
  );
  return get(url);
}

export function getFuturesApi() {
  let url = new URL(BASE_URL + "/futures/podaci");
  return get(url);
}

export function getFuturesSearchApi(searchData) {
  let url = new URL(BASE_URL + `/futures/podaci/${searchData}`);
  return get(url);
}

export function getFuturesDetailsApi(future) {
  let url = new URL(BASE_URL + `/futures/podaci/${future}`);
  return get(url);
}

export function getFuturesTimeSeriesApi(future, range) {
  let url = new URL(BASE_URL + `/futures/podaci/timeseries/${range}/${future}`);
  return get(url);
}

export function buySellStocks(form) {
	let url = new URL(BASE_URL + "/berza/order");
	return post(url, form);
}
