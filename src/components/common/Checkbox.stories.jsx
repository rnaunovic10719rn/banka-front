
import React from "react";
import Checkbox from "./Checkbox";


export default {
    title: "Common/Checkbox",
    component: Checkbox,
    argTypes: {
        onChange: { action: "clicked" },
    },
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Checkbox 1",
    value: "checkbox1",
};