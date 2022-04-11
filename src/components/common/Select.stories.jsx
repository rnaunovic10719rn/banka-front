
import React from "react";

import Select from "./Select";

export default {
    title: "Common/Select",
    component: Select,
    argTypes: {
        onChange: { action: "clicked" },
    },
};

const Template = (args) => <Select {...args} />


export const Default = Template.bind({});
Default.args = {
    options: ['Option 1', 'Option 2', 'Option 3'],
};