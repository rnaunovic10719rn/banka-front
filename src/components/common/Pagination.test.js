import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Pagination from "./Pagination";

test("<Pagination/> => render", async () => {
	render(<Pagination itemCount={10} onChange={() => {}} />);
	const element = screen.getByTestId("common-pagination");
	expect(element).toBeVisible();
});

test("<Pagination/> => render => middle break", async () => {
	render(<Pagination itemCount={100} onChange={() => {}} />);
	const element = screen.getByTestId("common-pagination");
	expect(element).toBeVisible();
});

test("<Pagination/> => render => left break", async () => {
	const mockCallBack = jest.fn();
	render(<Pagination itemCount={100} onChange={mockCallBack} />);
	const element = screen.getByText("3");
	fireEvent.click(element);
	expect(element).toBeVisible();
	expect(mockCallBack.mock.calls.length).toEqual(2);
});

test("<Pagination/> => render => right break", async () => {
	const mockCallBack = jest.fn();
	render(<Pagination itemCount={100} onChange={mockCallBack} />);
	const element = screen.getByText("18");
	fireEvent.click(element);
	expect(element).toBeVisible();
	expect(mockCallBack.mock.calls.length).toEqual(2);
});

test("<Pagination/> => render => side break", async () => {
	const mockCallBack = jest.fn();
	render(<Pagination itemCount={100} onChange={mockCallBack} />);
	const element1 = screen.getByText("18");
	fireEvent.click(element1);
	const element2 = screen.getByText("17");
	fireEvent.click(element2);
	expect(element2).toBeVisible();
	expect(mockCallBack.mock.calls.length).toEqual(3);
});
