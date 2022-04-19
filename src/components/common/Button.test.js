import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button from "./Button";

test("<Button/> => render", async () => {
	render(<Button label="Test" />);
	const element = screen.getByText("Test");
	expect(element).toBeVisible();
});

test("<Button/> => render => default", async () => {
	render(<Button label="Test" />);
	const element = screen.getByText("Test");
	expect(element).toBeVisible();
});

test("<Button/> => render => primary", async () => {
	render(<Button label="Test" design="primary" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("bg-indigo-500");
});

test("<Button/> => render => primary => hover", async () => {
	render(<Button label="Test" design="primary" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("hover:bg-indigo-700");
});

test("<Button/> => render => secondary", async () => {
	render(<Button label="Test" design="secondary" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("bg-transparent");
	expect(element).toHaveClass("border-indigo-500");
});

test("<Button/> => render => secondary => hover", async () => {
	render(<Button label="Test" design="secondary" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("hover:border-indigo-700");
});

test("<Button/> => render => inline", async () => {
	render(<Button label="Test" design="inline" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("text-blue-500");
});

test("<Button/> => render => secondary => hover", async () => {
	render(<Button label="Test" design="inline" />);
	const element = screen.getByText("Test");
	expect(element).toHaveClass("hover:text-blue-700");
});

test("<Button/> => render => disabled", async () => {
	render(<Button label="Test" disabled />);
	const element = screen.getByText("Test");
	expect(element).toBeDisabled();
});

test("<Button/> => action => click", async () => {
	const mockCallBack = jest.fn();
	render(<Button label="Test" onClick={mockCallBack} />);
	const element = screen.getByText("Test");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(1);
});

test("<Button/> => action => click => disabled", async () => {
	const mockCallBack = jest.fn();
	render(<Button label="Test" onClick={mockCallBack} disabled />);
	const element = screen.getByText("Test");
	fireEvent.click(element);
	expect(mockCallBack.mock.calls.length).toEqual(0);
});
