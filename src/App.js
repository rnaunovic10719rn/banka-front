import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserApi } from "./clients/client";
import { addUserAction } from "./redux/actions";

function App(props) {
	const dispatch = useDispatch();

	async function getUser() {
		const response = await getUserApi();
		dispatch(addUserAction(response));
	}

	useEffect(() => {
		getUser();
	}, []);

	return (
		<div data-testid="app" className="h-screen bg-slate-50 text-slate-700">
			<Outlet />
		</div>
	);
}

export default App;
