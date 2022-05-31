import React from "react";
import HoverMenu, { HoverMenuItem } from "./HoverMenu";

export default {
    title: "Common/HoverMenu",
    component: HoverMenu,
};

const Template = (args) =>
    <HoverMenu {...args}>
        <HoverMenuItem text="Testing 1" />
        <HoverMenuItem text="Testing 2" />
        <HoverMenuItem text="Testing 3" />
    </HoverMenu>;

export const Default = Template.bind({});
Default.args = {
    text: "Placeholder empty state text",
};

