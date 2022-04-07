import React from "react";

import StockChart from "./StockChart";

export default {
    title: "Components/StockChart",
    component: StockChart,
};

const Template = (args) => <StockChart {...args} />;

export const Default = Template.bind({});
Default.args = {
};