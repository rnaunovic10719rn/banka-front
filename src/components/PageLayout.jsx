import React from "react";
import { Outlet } from "react-router-dom";

export default function PageLayout() {

    return (
        <div data-testid="component-page-layout" className="container mx-auto pt-10">
            <Outlet />
        </div>
    )
}