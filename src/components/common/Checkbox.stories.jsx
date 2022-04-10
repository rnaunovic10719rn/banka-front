
import React from "react";
import Checkbox from "./Checkbox";


export default {
    title: "Common/Checkbox",
    component: Checkbox,
};

const Template = (args) => <Checkbox {...args} />;

export const Default = Template.bind({});
Default.args = {
    label: "Checkbox 1",
    value: "checkbox1",
    onChange: (e) => console.log(e)
};