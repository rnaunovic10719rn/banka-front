import React from "react"
import Header from "./Header"
import {Outlet, useLocation} from "react-router-dom"
import AuthRequired from "./AuthRequired"
import Container from "./Container";
import PropTypes from "prop-types";
import Breadcrumbs from "./common/Breadcrumbs";
import {URLS} from "../routes";

function HeaderPageLayout(props) {
    const location = useLocation();
    const isIndex = location.pathname.includes(URLS.DASHBOARD.INDEX)

    return (
        <AuthRequired>
            <Header />
            <div className="grow">
                <Container>
                    { !isIndex && <Breadcrumbs breadcrumbs={props.breadcrumbs} className="py-5"/> }
                    { isIndex && <div className="mb-10"/> }
                    <Outlet />
                </Container>
            </div>
        </AuthRequired>
    )
}

HeaderPageLayout.propTypes = {
    breadcrumbs: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        url: PropTypes.string,
    }))
}

export default HeaderPageLayout