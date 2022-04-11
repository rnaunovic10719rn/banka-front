import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts'
import { getStockInfo, getStockTimeSeriesApi } from "../clients/stocks";
import Alert, { ALERT_TYPES } from "./common/Alert";
import RadioGroup from "./common/RadioGroup";

export const CHART_FILTERS = {
    ONE_DAY: "1d",
    FIVE_DAYS: "5d",
    ONE_MONTH: "1m",
    SIX_MONTHS: "6m",
    ONE_YEAR: "1y",
    TWO_YEARS: "2y",
    ALL: "ytd",
}

export const CHART_COLORS = {
    GREEN: "colorGreen",
    RED: "colorRed",
}

function StockChart(props) {
    return (
        <div className={props.className}>
            <div className="mb-5">
                <RadioGroup options={['1d', '5d', '1m', '6m', '1y', '2y', 'ytd']} onChange={props.onChange} />
            </div>
            <ResponsiveContainer height={250}>
                <AreaChart
                    width={730}
                    height={250}
                    data={props.data}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}>
                    <defs>
                        <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#EF4444" stopOpacity={0.05} />
                            <stop offset="80%" stopColor="#EF4444" stopOpacity={0.3} />
                        </linearGradient>
                        <linearGradient id="colorGreen" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="10%" stopColor="#10B981" stopOpacity={0.05} />
                            <stop offset="80%" stopColor="#10B981" stopOpacity={0.3} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="time" />
                    <YAxis domain={['dataMin', 'dataMax']} />
                    {props.color === "colorRed" && <Area type="monotone" dataKey="high" stroke="#EF4444" fillOpacity={1} fill={`url(#${props.color})`} />}
                    {props.color === "colorGreen" && <Area type="monotone" dataKey="high" stroke="#10B981" fillOpacity={1} fill={`url(#${props.color})`} />}
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

StockChart.propTypes = {
    ticker: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    color: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
}

StockChart.defaultProps = {
    color: "colorGreen",
    ticker: "IBM",
    className: "",
}

export default StockChart