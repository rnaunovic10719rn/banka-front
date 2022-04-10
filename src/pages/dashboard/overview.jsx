import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Tab from "../../components/common/Tab";
import Table from "../../components/common/Table";
import { getForexApi, getFuturesApi, getStocksApi } from "../../clients/stocks";
import StocksModal from "../../components/StocksModal";
import PlaceholderLoading from 'react-placeholder-loading'

const TABS = {
  STOCKS: "Stocks",
  FOREX: "Forex",
  FUTURES: "Futures",
};

export default function OverviewPage() {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.STOCKS);

  const [stocksRowData, setStocksRowData] = useState([])
  const [forexData, setForexData] = useState([])
  const [futuresData, setFuturesData] = useState([])

  const [selectedStock, setSelectedStock] = useState(null)
  const [selectedForex, setSelectedForex] = useState(null)
  const [selectedFuture, setSelectedFuture] = useState(null)


  async function getStocks() {
    const response = await getStocksApi()
    let tmp = []
    response.map(r => {
      tmp.push([
        r['ticker'],
        r['price'],
        r['volume'],
        r['change'],
        r['changePercent'],
        moment(r['time']).format("DD/MM/YYYY - HH:MM"),
      ])
    })
    setStocksRowData(tmp)
  }

  async function getForex() {
    const response = await getForexApi()
    let tmp = []
    response.map(r => {
      tmp.push([
        r['fromCurrency'],
        r['toCurrency'],
        r['exchangeRate'],
        moment(r['time']).format("DD/MM/YYYY - HH:MM"),
      ])
    })
    setForexData(tmp)
  }

  async function getFutures() {
    const response = await getFuturesApi()
    let tmp = []
    response.map(r => {
      tmp.push([
        r['symbol'],
        r['high'],
        "EUREX",
        moment(r['time']).format("DD/MM/YYYY - HH:MM"),
      ])
    })
    setFuturesData(tmp)
  }

  function renderFutures() {
    return (
      <Table
        headings={[
          "Oznaka",
          "Cena",
          "Berza",
          "Poslednje azuriranje",
        ]}
        rows={futuresData}
        pagination
      />
    );
  }

  function renderPlaceholderRows(cols) {
    return new Array(5).fill(new Array(cols).fill(<PlaceholderLoading shape="rect" width={'100%'} height={20} />))
  }

  function renderForex() {
    return (
      <Table
        headings={[
          "Prodajna valuta",
          "Kupovna valuta",
          "Kurs",
          "Poslednje azuriranje",
        ]}
        rows={forexData}
        pagination
      />
    );
  }

  function renderStocks() {
    const data = stocksRowData.length > 0 ? stocksRowData : renderPlaceholderRows(6)

    return (
      <Table
        headings={[
          "Oznaka",
          "Cena",
          "Volume",
          "Promena",
          "Promena (%)",
          "Poslednje azuriranje",
        ]}
        rows={data}
        pagination
        clickable
        // Nesrecno je uradjeno biranje iz tabele, mora da se vrati red pa da se bira redni broj za informaciju
        onClick={(e) => setSelectedStock(e[0])}
      />
    );
  }

  function onSubmit() { }

  useEffect(() => {
    getStocks()
    getForex()
    getFutures()
  }, [])

  return (
    <div>
      <Tab
        tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]}
        onChange={(e) => setActiveTab(e)}
      />
      {activeTab === TABS.STOCKS && renderStocks()}
      {activeTab === TABS.FOREX && renderForex()}
      {activeTab === TABS.FUTURES && renderFutures()}
      {selectedStock !== null && <StocksModal ticker={selectedStock} onClose={() => setSelectedStock(null)} />}
    </div>
  );
}
