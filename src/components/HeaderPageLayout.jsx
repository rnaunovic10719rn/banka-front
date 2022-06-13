import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import AuthRequired from "./AuthRequired"
import Container from "./Container";

function HeaderPageLayout() {

    return (
        <AuthRequired>
            <Header />
            <div className="grow py-10">
                <Container>
                    <Outlet />
                </Container>
            </div>
        </AuthRequired>
    )
}

export default HeaderPageLayout