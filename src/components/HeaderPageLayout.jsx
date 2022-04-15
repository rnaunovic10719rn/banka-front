import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import AuthRequired from "./AuthRequired"

function HeaderPageLayout() {

    return (
        <AuthRequired>
            <Header />
            <div className="grow p-10">
                <Outlet />
            </div>
        </AuthRequired>
    )
}

export default HeaderPageLayout