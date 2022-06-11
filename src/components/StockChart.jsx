import React, { useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, ResponsiveContainer } from 'recharts'
import classNames from "classnames";

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
    const [data, setData] = useState([])
    const [color, setColor] = useState(CHART_COLORS.GREEN)

    const style = classNames(
        props.className,
    )

    useEffect(() => {
        if (!props.data || props.data.length === 0) return

        const temp = props.data

        if (temp[0]['close'] > temp[temp.length - 1]['close']) {
            setColor(CHART_COLORS.RED)
        } else {
            setColor(CHART_COLORS.GREEN)
        }

        temp.map(item => {
            switch (props.chartTimeframe) {
                case CHART_FILTERS.ONE_DAY:
                    item['time'] = moment(item['time']).format("HH:mm")
                    break
                case CHART_FILTERS.FIVE_DAYS:
                    item['time'] = moment(item['time']).format("D MMM")
                    break
                case CHART_FILTERS.ONE_MONTH:
                    item['time'] = moment(item['time']).format("D MMM")
                    break
                default:
                    item['time'] = moment(item['time']).format("MMM YYYY")
            }
        })
        setData(temp)
    }, [props.data])

    return (
        <div className={style}>
            <ResponsiveContainer height={250}>
                <AreaChart
                    width={730}
                    height={250}
                    data={data}
                    padding={{ left: 0, right: 0, top: 0, bottom: 0 }}
                >
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
                    <XAxis dataKey="time" minTickGap={50} />
                    <YAxis type="number" domain={['dataMin', 'dataMax']} tickCount={5} tickFormatter={(value) => value.toFixed(props.decimals)} scale="linear" interval="preserveStart" />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    {color === CHART_COLORS.RED && <Area type="monotone" dataKey="high" stroke="#EF4444" fillOpacity={1} fill={`url(#${color})`} />}
                    {color === CHART_COLORS.GREEN && <Area type="monotone" dataKey="high" stroke="#10B981" fillOpacity={1} fill={`url(#${color})`} />}
                    <Tooltip />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

StockChart.propTypes = {
    ticker: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    chartTimeframe: PropTypes.any,
    decimals: PropTypes.number,
    className: PropTypes.string,
}

StockChart.defaultProps = {
    ticker: "IBM",
    decimals: 0,
    className: "",
}

export default StockChart