import React, { useEffect, useState } from "react";
import moment from "moment";
import Tab from "../../components/common/Tab";
import Table from "../../components/common/Table";
import {
  getForexApi,
  getFuturesApi,
  getStocksApi,
  getForexSearchApi,
  getFuturesSearchApi,
  getStocksSearchApi,
} from "../../clients/stocks";
import StocksModal from "../../components/StocksModal";
import ForexModal from "../../components/ForexModal";
import FuturesModal from "../../components/FuturesModal";
import PlaceholderLoading from "react-placeholder-loading";
import Button from "../../components/common/Button";
import TextField from "../../components/common/TextField";

const TABS = {
  STOCKS: "Stocks",
  FOREX: "Forex",
  FUTURES: "Futures",
};

export default function OverviewPage() {
  const [activeTab, setActiveTab] = useState(TABS.STOCKS);

  const [stocksRowData, setStocksRowData] = useState([]);
  const [forexData, setForexData] = useState([]);
  const [futuresData, setFuturesData] = useState([]);

  const [selectedStock, setSelectedStock] = useState(null);
  const [selectedForex, setSelectedForex] = useState(null);
  const [selectedFuture, setSelectedFuture] = useState(null);

  const [searchData, setSearchData] = useState("");

  function createStockRow(r) {
    return [
      r["ticker"],
      r["price"],
      r["volume"],
      r["change"],
      r["changePercent"],
      moment(r["time"]).format("DD/MM/YYYY - HH:MM"),
    ];
  }

  function createForexRow(r) {
    return [
      r["fromCurrency"],
      r["toCurrency"],
      r["exchangeRate"],
      moment(r["time"]).format("DD/MM/YYYY - HH:MM"),
    ];
  }

  function createFuturesRow(r) {
    return [
      r["symbol"],
      r["high"],
      "EUREX",
      moment(r["time"]).format("DD/MM/YYYY - HH:MM"),
    ];
  }

  async function getStocks() {
    const response = await getStocksApi();
    let tmp = [];
    response.map((r) => {
      tmp.push(createStockRow(r));
    });
    setStocksRowData(tmp);
  }

  async function getForex() {
    const response = await getForexApi();
    let tmp = [];
    response.map((r) => {
      tmp.push(createForexRow(r));
    });
    setForexData(tmp);
  }

  async function getFutures() {
    const response = await getFuturesApi();
    let tmp = [];
    response.map((r) => {
      tmp.push(createFuturesRow(r));
    });
    setFuturesData(tmp);
  }

  function renderFutures() {
    return (
      <div>
        <TextField onChange={handleChangeData} type="text" />
        <Button
          label="Pretrazi"
          design="primary"
          type="submit"
          onClick={handleSearchData}
        />
        <Table
          headings={["Oznaka", "Cena", "Berza", "Poslednje azuriranje"]}
          rows={futuresData}
          pagination
          clickable
          onClick={(e) => setSelectedFuture(e[0])}
        />
      </div>
    );
  }

  function renderPlaceholderRows(cols) {
    return new Array(5).fill(
      new Array(cols).fill(
        <PlaceholderLoading shape="rect" width={"100%"} height={20} />
      )
    );
  }

  function renderForex() {
    return (
      <div>
        <TextField onChange={handleChangeData} type="text" />
        <Button
          label="Pretrazi"
          design="primary"
          type="submit"
          onClick={handleSearchData}
        />
        <Table
          headings={[
            "Prodajna valuta",
            "Kupovna valuta",
            "Kurs",
            "Poslednje azuriranje",
          ]}
          rows={forexData}
          pagination
          clickable
          // Ovo je jos vise nesrecno jer nam treba 2 parametra => tabela treba da se refaktorise da primar props.children redova i da se pise odvojeno logika za red a ne ovi hakovi
          onClick={(e) => setSelectedForex([e[0], e[1]])}
        />
      </div>
    );
  }

  function renderStocks() {
    const data =
      stocksRowData.length > 0 ? stocksRowData : renderPlaceholderRows(6);

    return (
      <div>
        <TextField onChange={handleChangeData} type="text" />
        <Button
          label="Pretrazi"
          design="primary"
          type="submit"
          onClick={handleSearchData}
        />
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
      </div>
    );
  }

  useEffect(() => {
    getStocks();
    getForex();
    getFutures();
  }, []);

  const handleSearchData = async () => {
    console.log(searchData);
    if (activeTab == TABS.STOCKS) {
      const response = await getStocksSearchApi(searchData);
      let tmp = [];
      tmp.push(createStockRow(response));
      setStocksRowData(tmp);
    } else if (activeTab == TABS.FOREX) {
      const myArray = searchData.split(" ");
      const response = await getForexSearchApi(myArray[0], myArray[1]);
      let tmp = [];
      tmp.push(createForexRow(response));
      setForexData(tmp);
    } else {
      const response = await getFuturesSearchApi(searchData);
      let tmp = [];
      tmp.push(createFuturesRow(response));
      setFuturesData(tmp);
    }
  };

  const handleChangeData = (e) => {
    console.log(e);
    console.log(searchData);
    setSearchData(e);
  };

  return (
    <div>
      <Tab
        tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]}
        onChange={(e) => setActiveTab(e)}
      />
      {activeTab === TABS.STOCKS && renderStocks()}
      {activeTab === TABS.FOREX && renderForex()}
      {activeTab === TABS.FUTURES && renderFutures()}
      {selectedStock !== null && (
        <StocksModal
          ticker={selectedStock}
          onClose={() => setSelectedStock(null)}
        />
      )}
      {selectedForex !== null && (
        <ForexModal
          from={selectedForex[0]}
          to={selectedForex[1]}
          onClose={() => setSelectedForex(null)}
        />
      )}
      {selectedFuture !== null && (
        <FuturesModal
          future={selectedFuture}
          onClose={() => setSelectedFuture(null)}
        />
      )}
    </div>
  );
}
