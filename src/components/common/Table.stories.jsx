import React from "react";

import Table from "./Table";
import Button from "./Button";

export default {
  title: "Components/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const Default = Template.bind({});

Default.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', ''],
  rows: [
    [<span className="text-black">Jon Doe</span>, 'jdoe@gmail.com', '0123456789', '060/12345678', 'Developer', <Button className="float-right" label="Button" />],
    [<span className="text-black">Jon Doe</span>, 'jdoe@gmail.com', '0123456789', '060/12345678', 'Developer', <Button className="float-right" label="Button" />],
    [<span className="text-black">Jon Doe</span>, 'jdoe@gmail.com', '0123456789', '060/12345678', 'Developer', <Button className="float-right" label="Button" />],
    [<span className="text-black">Jon Doe</span>, 'jdoe@gmail.com', '0123456789', '060/12345678', 'Developer', <Button className="float-right" label="Button" />],
  ],
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  headings: ['Ime i prezime', 'E-mail', 'JMBG', 'Broj telefona', 'Pozicija u banci', ''],
  rows: [],
};
