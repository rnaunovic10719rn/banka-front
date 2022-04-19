import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Table from "./Table";

const headings = ["heading1", "heading2"];
const data = [
	["data1", "data1"],
	["data2", "data2"],
];

test("<Table/> => render", async () => {
	render(<Table headings={headings} />);
	const element = screen.getByTestId("common-table");
	expect(element).toBeVisible();
});

test("<Table/> => render => no data", async () => {
	render(<Table headings={headings} />);
	const element = screen.getByTestId("common-table");
	expect(element).toBeVisible();
	expect(element).toHaveTextContent("No data.");
});

test("<Table/> => render => rows", async () => {
	render(<Table headings={headings} rows={data} />);
	const element = screen.getByTestId("common-table");
	expect(element).toBeVisible();
	const rows = screen.queryAllByTestId("common-table-row");
	expect(rows).toHaveLength(data.length);
});

test("<Table/> => render => pagination", async () => {
	render(<Table headings={headings} rows={data} pagination />);
	const element = screen.getByTestId("common-pagination");
	expect(element).toBeVisible();
});

test("<Table/> => action => clickable", async () => {
	const mockCallBack = jest.fn();
	render(
		<Table
			headings={headings}
			rows={data}
			clickable
			onClick={mockCallBack}
		/>
	);
	const element = screen.getByTestId("common-table");
	expect(element).toBeVisible();
	const rows = screen.queryAllByTestId("common-table-row");
	fireEvent.click(rows[0]);
	expect(rows).toHaveLength(data.length);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});

test("<Table/> => action => not clickable", async () => {
	const mockCallBack = jest.fn();
	render(<Table headings={headings} rows={data} onClick={mockCallBack} />);
	const element = screen.getByTestId("common-table");
	expect(element).toBeVisible();
	const rows = screen.queryAllByTestId("common-table-row");
	fireEvent.click(rows[0]);
	expect(rows).toHaveLength(data.length);
	expect(mockCallBack.mock.calls.length).toEqual(0);
});
