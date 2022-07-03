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
import Notification from "../../components/common/Notification";
import ForexModal from "../../components/ForexModal";
import PlaceholderLoading from "react-placeholder-loading";
import Button from "../../components/common/Button";
import TextField from "../../components/common/TextField";
import Block from "../../components/common/Block";
import { useDispatch } from "react-redux";
import { addForexAction, addStocksAction } from "../../redux/actions";
import StockTickerWrapper from "../../components/StockTickerWrapper";
import classNames from "classnames";
import numeral from "numeral";
import Form from "../../components/common/Form";
import AnimationFadeIn from "../../components/common/AnimationFadeIn";

const TABS = {
    STOCKS: "Akcije",
    FOREX: "Forex",
    FUTURES: "Terminski ugovori",
};

export default function OverviewPage() {
    const dispatch = useDispatch();
    const [activeTab, setActiveTab] = useState(TABS.STOCKS);

    const [stocksRowData, setStocksRowData] = useState([]);
    const [forexData, setForexData] = useState([]);
    const [futuresData, setFuturesData] = useState([]);

    const [selectedStock, setSelectedStock] = useState(null);
    const [selectedForex, setSelectedForex] = useState(null);

    const [searchData, setSearchData] = useState("");
    const [helpSearchForex, setHelpSearchForex] = useState("");

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function createStockRow(r) {
        const priceStyle = classNames(
            "font-semibold",
            "flex items-center",
            {"text-green-500": r["change"] >= 0},
            {"text-red-500": r["change"] < 0}
        );

        const arrow = r["change"] >= 0 ?
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7l4-4m0 0l4 4m-4-4v18"/>
            </svg> :
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l-4 4m0 0l-4-4m4 4V3"/>
            </svg>

        return [
            r["ticker"],
            <div>{toCurrency(r["price"])}</div>,
            <div>{numeral(r["volume"]).format("0.0a")}</div>,
            <div className={priceStyle}>{arrow} {toCurrency(r["change"])}</div>,
            <div className={priceStyle}>{arrow} {parseFloat(r["changePercent"]).toFixed(4)}</div>,
            <div>{moment(r["time"]).format("DD.MM.YYYY HH:mm")}</div>,
        ];
    }

    function createForexRow(r) {
        return [
            r["fromCurrency"],
            r["toCurrency"],
            <div>{parseFloat(r["exchangeRate"]).toFixed(3)}</div>,
            <div>{moment(r["time"]).format("DD.MM.YYYY HH:mm")}</div>,
        ];
    }

    function createFuturesRow(r) {
        return [
            <div>{r["symbol"]}</div>,
            <div>{toCurrency(r["high"])}</div>,
            <div>EUREX</div>,
            <div>{moment(r["time"]).format("DD.MM.YYYY HH:mm")}</div>,
        ];
    }

    async function getStocks() {
        const response = await getStocksApi();
        dispatch(addStocksAction(response));
        let tmp = [];
        response.map((r) => {
            if (r === null) return;
            tmp.push(createStockRow(r));
        });
        setStocksRowData(tmp);
    }

    async function getForex() {
        const response = await getForexApi();
        dispatch(addForexAction(response));
        let tmp = [];
        response.map((r) => {
            if (r === null) return;
            tmp.push(createForexRow(r));
        });
        setForexData(tmp);
    }

    async function getFutures() {
        const response = await getFuturesApi();
        let tmp = [];
        response.map((r) => {
            if (r === null) return;
            tmp.push(createFuturesRow(r));
        });
        setFuturesData(tmp);
    }

    function renderFutures() {
        return (
            <AnimationFadeIn className="flex flex-col gap-5">
                <Form onSubmit={handleSearchData} className="flex justify-start">
                    <TextField
                        onChange={handleChangeData}
                        type="text"
                        className="rounded-r-none"
                        value={searchData}
                        placeholder={"Oznaka future"}
                    />
                    <Button
                        label="Pretraži"
                        design="primary"
                        className="rounded-l-none mr-2"
                        type="submit"
                    />
                    {searchData.length > 0 && (
                        <Button
                            label="Clear"
                            design="inline"
                            type="submit"
                            onClick={clearSearchData}
                        />
                    )}
                </Form>
                <Table
                    headings={["Oznaka", "Cena", "Berza", "Poslednje ažuriranje"]}
                    rows={futuresData}
                    pagination
                />
            </AnimationFadeIn>
        );
    }

    function renderPlaceholderRows(cols) {
        return new Array(5).fill(
            new Array(cols).fill(
                <PlaceholderLoading shape="rect" width={"100%"} height={20}/>
            )
        );
    }

    function renderForex() {
        return (
            <AnimationFadeIn className="flex flex-col gap-5">
                <Form onSubmit={handleSearchData} className="flex gap-5">
                    <TextField
                        onChange={handleChangeData}
                        type="text"
                        value={searchData}
                        placeholder={"Prodajna valuta (EUR...)"}
                    />
                    <TextField
                        onChange={handleChangeDataForex}
                        type="text"
                        value={helpSearchForex}
                        placeholder={"Kupovna valuta (RSD...)"}
                    />
                    <Button
                        label="Pretraži"
                        design="primary"
                        type="submit"
                    />
                    {searchData.length > 0 && (
                        <Button
                            label="Clear"
                            design="inline"
                            type="submit"
                            onClick={clearSearchData}
                        />
                    )}
                </Form>
                <Table
                    headings={[
                        "Prodajna valuta",
                        "Kupovna valuta",
                        "Kurs",
                        "Poslednje ažuriranje",
                    ]}
                    rows={forexData}
                    pagination
                    clickable
                    // Ovo je jos vise nesrecno jer nam treba 2 parametra => tabela treba da se refaktorise da primar props.children redova i da se pise odvojeno logika za red a ne ovi hakovi
                    onClick={(e) => setSelectedForex([e[0], e[1]])}
                />
            </AnimationFadeIn>
        );
    }

    function renderStocks() {
        const data =
            stocksRowData.length > 0 ? stocksRowData : renderPlaceholderRows(6);

        return (
            <AnimationFadeIn className="flex flex-col gap-5">
                <div className="flex justify-start gap-0">
                    <form className="flex">
                        <TextField
                            onChange={handleChangeData}
                            type="text"
                            value={searchData}
                            className="rounded-r-none"
                            placeholder={"Oznaka akcije (AAPL...)"}
                        />
                        <Button
                            label="Pretraži"
                            design="primary"
                            type="submit"
                            className="rounded-l-none"
                            onClick={handleSearchData}
                        />
                    </form>
                    {searchData.length > 0 && (
                        <Button
                            label="Clear"
                            className="ml-3"
                            design="inline"
                            type="submit"
                            onClick={clearSearchData}
                        />
                    )}
                </div>
                <Table
                    headings={[
                        "Oznaka",
                        "Cena",
                        "Volume",
                        "Promena",
                        "Promena (%)",
                        "Poslednje ažuriranje",
                    ]}
                    rows={data}
                    pagination
                    clickable
                    // Nesrecno je uradjeno biranje iz tabele, mora da se vrati red pa da se bira redni broj za informaciju
                    onClick={(e) => setSelectedStock(e[0])}
                />
            </AnimationFadeIn>
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

    const handleSearchData = async (e) => {
        e.preventDefault();

        if (activeTab == TABS.STOCKS) {
            try {
                if (searchData === "") {
                    getStocks();
                    return
                }
                const response = await getStocksSearchApi(searchData);
                let tmp = [];
                tmp.push(createStockRow(response));
                setStocksRowData(tmp);
            } catch (e) {
                Notification("Nema podataka za datu pretragu", "Proverite da li ste ispravno uneli oznaku.", "danger")
            }
        } else if (activeTab == TABS.FOREX) {
            try {
                if (searchData === "") {
                    getForex();
                    return
                }
                const response = await getForexSearchApi(searchData, helpSearchForex);
                let tmp = [];
                tmp.push(createForexRow(response));
                setForexData(tmp);
            } catch (e) {
                Notification("Nema podataka za datu pretragu", "Proverite da li ste ispravno uneli oznaku.", "danger")
            }
        } else {
            try {
                if (searchData === "") {
                    getFutures();
                    return
                }
                const response = await getFuturesSearchApi(searchData);
                let tmp = [];
                tmp.push(createFuturesRow(response));
                setFuturesData(tmp);
            } catch (e) {
                Notification("Nema podataka za datu pretragu", "Proverite da li ste ispravno uneli oznaku.", "danger")
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
            <div className="flex flex-col gap-3">
                <Block title="Berza">
                    <Tab
                        tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]}
                        onChange={function (e) {
                            setActiveTab(e);
                            clearSearchData(e);
                        }}
                    />
                    {activeTab === TABS.STOCKS && renderStocks()}
                    {activeTab === TABS.FOREX && renderForex()}
                    {activeTab === TABS.FUTURES && renderFutures()}
                </Block>
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
            {activeTab === TABS.STOCKS && <StockTickerWrapper/>}
        </div>
    );
}
