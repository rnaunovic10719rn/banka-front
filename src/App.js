import React from "react";
import { Outlet } from "react-router-dom";

function App(props) {
	return (
		<div className="h-screen bg-blue-100">
			<Outlet />
		</div>
	);
}

export default App;
