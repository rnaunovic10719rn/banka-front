import React from "react";

import Breadcrumbs from "./Breadcrumbs";
import {URLS} from "../../routes";

export default {
    title: "Common/Breadcrumbs",
    component: Breadcrumbs,
};

const Template = (args) => <Breadcrumbs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};
