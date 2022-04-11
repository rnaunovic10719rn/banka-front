import React from "react";

import RadioGroup from "./RadioGroup";

export default {
    title: "Common/RadioGroup",
    component: RadioGroup,
};

const Template = (args) => <RadioGroup {...args} />;


export const Default = Template.bind({});
Default.args = {
    name: 'test',
    options: ['Option 1', 'Option 2', 'Option 3'],
    onChange: () => { },
};