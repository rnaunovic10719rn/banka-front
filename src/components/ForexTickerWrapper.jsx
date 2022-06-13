import React from "react"
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import { useSelector } from "react-redux";

function ForexTickerWrapper() {
    const stocks = useSelector(state => state.app.forex)

    if (stocks.length === 0) {
        return null
    }

    return (
        <div className="-mx-10 -mt-10 mb-10 h-20 flex">
            <Ticker>
                {stocks.map(stock => {
                    const change = true
                    return <FinancialTicker id={stock['berzaId']} change={change} symbol={`${stock['fromCurrency']}/${stock['toCurrency']}`} percentage={`${stock['exchangeRate']}`} />
                })}
            </Ticker>
        </div>
    )
}

export default ForexTickerWrapper