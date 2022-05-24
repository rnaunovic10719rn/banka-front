import React from "react";

import Block from "./Block";

export default {
    title: "Common/Block",
    component: Block,
};

const Template = (args) => <Block {...args} />;

export const Default = Template.bind({});
Default.args = {
    children: "Placeholder text",
};
