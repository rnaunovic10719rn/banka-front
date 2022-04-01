import React from "react"
import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"

function DashboardPageLayout() {

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="grow p-10">
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardPageLayout