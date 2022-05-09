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
import PlaceholderLoading from "react-placeholder-loading";
import Button from "../../components/common/Button";
import TextField from "../../components/common/TextField";
import Alert from "../../components/common/Alert";

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

  const [error, setError] = useState(null);

  const [searchData, setSearchData] = useState("");
  const [helpSearchForex, setHelpSearchForex] = useState("");

  function createStockRow(r) {
    return [
      r["ticker"],
      r["price"],
      r["volume"],
      r["change"],
      r["changePercent"],
      moment(r["time"]).format("DD.MM.YYYY HH:mm"),
    ];
  }

  function createForexRow(r) {
    return [
      r["fromCurrency"],
      r["toCurrency"],
      r["exchangeRate"],
      moment(r["time"]).format("DD.MM.YYYY HH:mm"),
    ];
  }

  function createFuturesRow(r) {
    return [
      r["symbol"],
      r["high"],
      "EUREX",
      moment(r["time"]).format("DD.MM.YYYY HH:mm"),
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
      <div class="flex flex-col gap-5">
        <div className="flex justify-start gap-5">
          <TextField
            onChange={handleChangeData}
            type="text"
            value={searchData}
            placeholder={"Symbol"}
          />
          <Button
            label="Pretrazi"
            design="primary"
            type="submit"
            onClick={handleSearchData}
          />
          <Button
            label="X"
            design="inline"
            type="submit"
            disabled={searchData == 0}
            onClick={clearSearchData}
          />
        </div>
        <Table
          headings={["Oznaka", "Cena", "Berza", "Poslednje azuriranje"]}
          rows={futuresData}
          pagination
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
      <div class="flex flex-col gap-5">
        <div className="flex justify-start gap-5">
          <TextField
            onChange={handleChangeData}
            type="text"
            value={searchData}
            placeholder={"From"}
          />
          <TextField
            onChange={handleChangeDataForex}
            type="text"
            value={helpSearchForex}
            placeholder={"To"}
          />
          <Button
            label="Pretrazi"
            design="primary"
            type="submit"
            onClick={handleSearchData}
          />
          <Button
            label="X"
            design="inline"
            type="submit"
            disabled={searchData == 0 && helpSearchForex == 0}
            onClick={clearSearchData}
          />
        </div>
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
      <div class="flex flex-col gap-5">
        <div className="flex justify-start gap-5">
          <TextField
            onChange={handleChangeData}
            type="text"
            value={searchData}
            placeholder={"Symbol"}
          />
          <Button
            label="Pretrazi"
            design="primary"
            type="submit"
            onClick={handleSearchData}
          />
          <Button
            label="X"
            design="inline"
            type="submit"
            disabled={searchData == 0}
            onClick={clearSearchData}
          />
        </div>
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

  const clearSearchData = async () => {
    if (activeTab == TABS.STOCKS) {
      resetInputField();
      getStocks();
    } else if (activeTab == TABS.FOREX) {
      resetInputField();
      resetInputFieldForex();
      getForex();
    } else if (activeTab == TABS.FUTURES) {
      resetInputField();
      getFutures();
    }
  };

  const resetInputField = () => {
    setSearchData("");
  };

  const resetInputFieldForex = () => {
    setHelpSearchForex("");
  };

  const handleSearchData = async () => {
    console.log(searchData);
    if (activeTab == TABS.STOCKS) {
      try {
        const response = await getStocksSearchApi(searchData);
        let tmp = [];
        tmp.push(createStockRow(response));
        setStocksRowData(tmp);
      } catch (e) {
        setError(true);
      }
    } else if (activeTab == TABS.FOREX) {
      try {
        const response = await getForexSearchApi(searchData, helpSearchForex);
        let tmp = [];
        tmp.push(createForexRow(response));
        setForexData(tmp);
      } catch (e) {
        setError(true);
      }
    } else {
      try {
        const response = await getFuturesSearchApi(searchData);
        let tmp = [];
        tmp.push(createFuturesRow(response));
        setFuturesData(tmp);
      } catch (e) {
        setError(true);
      }
    }
  };

  const handleChangeData = (e) => {
    setSearchData(e);
  };

  const handleChangeDataForex = (e) => {
    setHelpSearchForex(e);
  };

  return (
    <div>
      {error && (
        <Alert
          design="danger"
          text="Nema podataka za datu pretragu"
          onDismiss={() => setError(null)}
        ></Alert>
      )}
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
    </div>
  );
}
