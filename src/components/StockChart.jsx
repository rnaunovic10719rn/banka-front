import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts'

function StockChart(props) {
    const [data, setData] = useState([])

    async function getDataForStock() {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${props.stockKey}&apikey=demo`

        const options = {
            method: 'GET',
        };

        const response = await fetch(url, options)
        if (!response.ok) {
            return
        }
        const temp = await response.json()
        console.log(temp)
        setData(Object.values(temp["Time Series (Daily)"]))

    }

    useEffect(() => {
        getDataForStock()
    }, [])

    return (
        <ResponsiveContainer height={250}>
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorBlue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="2. high" stroke="#8884d8" fillOpacity={1} fill="url(#colorBlue)" />
                <Area type="monotone" dataKey="3. low" stroke="#8884d8" fillOpacity={1} fill="url(#colorGreen)" />
            </AreaChart>
        </ResponsiveContainer>
    )
}

StockChart.propTypes = {
    stockKey: PropTypes.string.isRequired,
}

StockChart.defaultProps = {
    stockKey: "IBM",
}

export default StockChart