import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import classNames from "classnames";
import {URLS} from "../../routes";

function Breadcrumbs(props) {
    const location = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState([])

    function generateBreadcrumb() {
        const tempBreadcrumbs = []
        let path = ""
        location.pathname.match(/[^\/]+/g).map(item => {
            path += `/${item}`
            tempBreadcrumbs.push({
                text: item.replace(/[^a-zA-Z0-9]/g, ' ').toLowerCase(),
                url: path
            })
        })
        setBreadcrumbs(tempBreadcrumbs)
    }

    const style = classNames(
        "flex items-center",
        props.className,
    )

    function renderBreadcrumbItem(path) {
        const breadcrumbStyle = classNames(
            "text-indigo-500 hover:text-indigo-700 font-bold capitalize",
        )
        return (
            <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mx-2 stroke-gray-500" fill="none"
                     viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                </svg>
                <Link className={breadcrumbStyle} to={path.url}>{path.text}</Link>
            </div>
        )
    }

    useEffect(() => {
        generateBreadcrumb()
    }, [location])

    return (
        <div className={style}>
            <Link to={URLS.DASHBOARD.STOCK}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-6 w-6  mx-2 stroke-indigo-500 hover:stroke-indigo-700" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
            </Link>
            {breadcrumbs.map(path => {
                return renderBreadcrumbItem(path)
            })}
        </div>
    )
}

Breadcrumbs.propTypes = {
    className: PropTypes.string,
}

Breadcrumbs.defaultProps = {}

export default Breadcrumbs