import React from "react";

import Pagination from "./Pagination";

export default {
  title: "Components/Pagination",
  component: Pagination,
  argTypes: {
    onChange: {
      action: 'clicked',
    },
  }
};

const Template = (args) => <Pagination {...args} />;

export const Default = Template.bind({});
Default.args = {
  itemCount: 15,
  groupSize: 5,
};

export const WithBreaks = Template.bind({});
WithBreaks.args = {
  itemCount: 150,
  groupSize: 5,
};
