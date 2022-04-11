import React from "react";

import Table from "./Table";
import Button, { BUTTON_DESIGN } from "./Button";
import { tab } from "@testing-library/user-event/dist/tab";

export default {
  title: "Common/Table",
  component: Table,
  argTypes: {
    onClick: { action: "clicked" },
  },
};

const Template = (args) => <Table {...args} />;

const tableLine = [<span className="text-black">Jon Doe 1</span>, 'jdoe@gmail.com', '0123456789', '060/12345678', 'Developer', <Button design={BUTTON_DESIGN.INLINE} label="Button" />]

export const Default = Template.bind({});
Default.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', 'Akcija'],
  rows: new Array(50).fill(tableLine),
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', 'Akcija'],
  rows: [],
};

export const Clickable = Template.bind({});
Clickable.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', 'Akcija'],
  rows: new Array(10).fill(tableLine),
  pagination: true,
  clickable: true,
};

export const WithPagination = Template.bind({});
WithPagination.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', 'Akcija'],
  rows: new Array(150).fill(tableLine),
  pagination: true,
};