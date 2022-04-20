import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterModal from "./FilterModal";

test("<FilterModal/> => render", async () => {
	render(<FilterModal visible={true} onClose={() => {}} />);
	const element = screen.getByTestId("common-modal");
	expect(element).toBeVisible();
});
