import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserApi } from "./clients/client";
import { addUserAction } from "./redux/actions";
import nightwind from "nightwind/helper";

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
        <div data-testid="app" className="h-full bg-slate-50 text-slate-700 pb-10">
            <script dangerouslySetInnerHTML={{__html: nightwind.init()}}/>
            <Outlet/>
        </div>
    );
}

export default App;
