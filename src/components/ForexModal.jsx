import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"
import StocksChart, { CHART_FILTERS } from "./StockChart";
import Card from "./common/Card";
import PlaceholderLoading from 'react-placeholder-loading'
import { getForexDetalsApi, getForexTimeSeriesApi } from "../clients/stocks";
import EmptyState from "./common/EmptyState";
import RadioGroup from "./common/RadioGroup";

function ForexModal(props) {
    const [details, setDetails] = useState(null)
    const [chartFilter, setChartFilter] = useState(CHART_FILTERS.ONE_DAY)
    const [chartColor, setChartColor] = useState("colorGreen")
    const [chartData, setChartData] = useState([])

    async function getDetails() {
        const response = await getForexDetalsApi(props.from, props.to)
        setDetails(response)
    }

    async function getDataForChart() {
        let response = await getForexTimeSeriesApi(props.from, props.to, chartFilter)
        setChartData(response)
    }

    function handleChartChange(e) {
        setChartFilter(e)
        props.onChange(e)
    }

    function renderDetails() {
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
            <div>
                <Card title="Chart">
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
                    {chartData.length !== 0 && <StocksChart data={chartData} chartTimeframe={chartFilter} onChange={(e) => { setChartFilter(e); }} decimals={3} />}
                    {chartData.length === 0 && <EmptyState text="No data." />}
                </Card>
                <Card title="Details">
                    <p className="text-lg font-bold pb-5 text-gray-600">
                        {details['opisHartije']}
                    </p>
                    <div className="flex flex-col">
                        {renderRow("From:", details['fromCurrency'])}
                        {renderRow("To:", details['toCurrency'])}
                        {renderRow("Exchange rate:", details['exchangeRate'])}
                        {renderRow("Bid:", details['bid'])}
                        {renderRow("Ask:", details['ask'])}
                    </div >
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
        getDetails()
    }, [])

    useEffect(() => {
        getDataForChart()
    }, [chartFilter])

    return (
        <Modal id="forex-modal" visible={true} onClose={props.onClose} title={`${props.from} - ${props.to}`} className="min-w-[1100px]">
            {details && renderDetails()}
            {!details && renderPlaceholder()}
        </Modal>
    )
}

ForexModal.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ForexModal