import React from "react";

import StockChart from "./StockChart";

export default {
    title: "Components/StockChart",
    component: StockChart,
};

const Template = (args) => <StockChart {...args} />;

export const Default = Template.bind({});
Default.args = {
    data: [
        {
            high: 1,
            time: new Date()
        },
        {
            high: 2,
            time: new Date()
        },
        {
            high: 5,
            time: new Date()
        },
        {
            high: 4,
            time: new Date()
        },
        {
            high: 8,
            time: new Date()
        },
        {
            high: 2,
            time: new Date()
        },
    ],
};

export const Loss = Template.bind({});
Loss.args = {
    color: "colorRed",
    data: [
        {
            high: 1,
            time: new Date()
        },
        {
            high: 2,
            time: new Date()
        },
        {
            high: 5,
            time: new Date()
        },
        {
            high: 4,
            time: new Date()
        },
        {
            high: 8,
            time: new Date()
        },
        {
            high: 2,
            time: new Date()
        },
    ],
};