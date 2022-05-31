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
                    const change = stock['bid'] > stock['ask']
                    return <FinancialTicker id={stock['berzaId']} change={change} symbol={`${stock['fromCurrency']}/${stock['toCurrency']}`} lastPrice={0} percentage={0} currentPrice={0} />
                })}
            </Ticker>
        </div>
    )
}

export default ForexTickerWrapper