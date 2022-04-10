import React from "react";
import Tab from "./Tab";

export default {
    title: "Common/Tab",
    component: Tab,
    argTypes: {
        onChange: { action: "clicked" },
    },
};

const Template = (args) => <Tab {...args} />;

export const Default = Template.bind({});
Default.args = {
    tabs: ['Tab 1', 'Tab 2', 'Tab 3']
};
