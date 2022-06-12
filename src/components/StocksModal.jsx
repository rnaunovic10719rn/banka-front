import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"
import { getStockDetailsApi } from "../clients/stocks";
import Card from "./common/Card";
import Button from "./common/Button";
import StocksChart, { CHART_FILTERS } from "./StockChart";
import { getStockTimeSeriesApi } from "../clients/stocks";
import EmptyState from "./common/EmptyState";
import classNames from "classnames";
import moment from "moment";
import numeral from "numeral";
import RadioGroup from "./common/RadioGroup";

function StocksModal(props) {
    const [details, setDetails] = useState(null)
    const [chartFilter, setChartFilter] = useState(CHART_FILTERS.ONE_DAY)
    const [chartData, setChartData] = useState([])

    async function getStockDeatils() {
        const response = await getStockDetailsApi(props.ticker)
        setDetails(response)
    }

    async function getDataForChart() {
        let response = await getStockTimeSeriesApi(props.ticker, chartFilter)
        setChartData(response)
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function handleChartChange(e) {
        setChartFilter(e)
        props.onChange(e)
    }

    function renderDetails() {
        const priceStyle = classNames(
            { "text-green-500": details.change >= 0 },
            { "text-red-500": details.change < 0 },
        )

        function renderRow(left, right) {
            return (
                <div className="flex justify-between border-t py-2">
                    <div className="font-semibold uppercase text-gray-600">
                        {left}
                    </div>
                    <div className="text-gray-500">
                        {right}
                    </div>
                </div>
            )
        }

        return (
            <div className="flex flex-col gap-5">
                <Card className="grow" title="">
                    <div className="grid grid-cols-3">
                        <div>
                            <div className="text-lg">{details.opisHartije}</div>
                            <div className={"text-4xl font-bold"}>{toCurrency(details.price)}</div>
                            <div className={priceStyle + " font-bold text-lg"}>{details.changePercent}% - danas</div>
                            <div className="text-sm">Last updated: <span className="italic">{moment(details.time).format("D MMM YYYY HH:MM")}</span></div>
                        </div>
                        <div className="col-span-2">
                        <div className="mb-5 flex justify-end">
                            <RadioGroup name="chart" options={[
                                CHART_FILTERS.ONE_DAY,
                                CHART_FILTERS.FIVE_DAYS,
                                CHART_FILTERS.ONE_MONTH,
                                CHART_FILTERS.SIX_MONTHS,
                                CHART_FILTERS.ONE_YEAR,
                                CHART_FILTERS.ALL,
                            ]} onChange={handleChartChange} />
                        </div>
                            {chartData.length !== 0 && <StocksChart ticker={props.ticker} data={chartData} chartTimeframe={chartFilter} onChange={(e) => { setChartFilter(e); }} />}
                            {chartData.length === 0 && <EmptyState text="No data." />}
                        </div>
                    </div>
                </Card>
                <Card title="Details" className="grid grid-cols-2 gap-10">
                    <div className="flex flex-col">
                        {renderRow("Change:", <span className={priceStyle}>${toCurrency(details['change'])} (${details['changePercent']}%)</span>)}
                        {renderRow("Open:", toCurrency(details['open']))}
                        {renderRow("Low:", toCurrency(details['low']))}
                        {renderRow("High:", toCurrency(details['high']))}
                        {renderRow("Previous close:", details['previousClose'])}
                    </div >
                    <div>
                        {renderRow("Day range:", `${toCurrency(details['low'])} - ${toCurrency(details['high'])}`)}
                        {renderRow("Price volume", numeral(details['priceVolume']).format("0.0a"))}
                        {renderRow("Volume", numeral(details['volume']).format("0.0a"))}
                        {renderRow("Outstanding shares", numeral(details['outstandingShares']).format("0.0a"))}
                        {renderRow("Market cap", numeral(details['marketCap']).format("0.0a"))}
                    </div>
                </Card>
            </div>
        )
    }

    function renderPlaceholder() {
        return (
            <Card title="" className="flex flex-col gap-3">
                {/* <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} />
                <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} />
                <PlaceholderLoading shape="rect" width={'100%'} height={20} />
                <PlaceholderLoading shape="rect" width={'90%'} height={20} /> */}
            </Card>
        )
    }

    useEffect(() => {
        getStockDeatils()
    }, [])

    useEffect(() => {
        getDataForChart()
    }, [chartFilter])

    return (
        <Modal id="stocks-modal" visible={true} onClose={props.onClose} title={props.ticker} className="min-w-[1100px]" cta={props.onClose} ctaText="Close">
            <div className="mb-4">
                {!details && renderPlaceholder()}
                {details && renderDetails()}
            </div>
        </Modal>
    )
}

StocksModal.propTypes = {
    ticker: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default StocksModal