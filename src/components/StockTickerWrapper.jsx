import React from "react"
import Ticker, { FinancialTicker, NewsTicker } from 'nice-react-ticker';
import { useSelector } from "react-redux";

function StockTickerWrapper() {
    let stocks = useSelector(state => state.app.stocks)


    if (stocks.length === 0) {
        return null
    }

    return (
        <div className="pb-20">
            <div className="fixed left-0 right-0 -mt-10 mb-10 h-20 flex">
                <Ticker>
                    {stocks.map(stock => {
                        if (!stock) return null;
                        const change = stock['price'] > stock['previousClose']
                        return <FinancialTicker id={stock['berzaId']} change={change} symbol={stock['ticker']} lastPrice={stock['previousClose']} percentage={`${stock['changePercent'].toFixed(2)}%`} currentPrice={stock['price']} />
                    })}
                </Ticker>
            </div>
        </div>
    )
}

export default StockTickerWrapper