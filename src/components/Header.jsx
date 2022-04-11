import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { URLS } from "../routes";
import Button, { BUTTON_DESIGN } from "./common/Button";
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";

function Header(props) {
    const user = useSelector(getUserSelector)
    const [username, setUsername] = useState("Username")

    const style = classNames(
        "inset-x-0 top-0", //position
        "bg-gray-400", // background
        "text-base leading-9 text-white font-semibold", // font
        "py-3", // spacing
    )

    useEffect(() => {
        if (user) setUsername(user['username'])
    }, [user])


    return (
        <div className={style}>
            <div className="flex justify-between">
                <div className="flex gap-8">
                    <div className="w-60 pl-5 mr-2">
                        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.6667 30.1667V37.9167M25 30.1667V37.9167M35.3333 30.1667V37.9167M1.75 48.25H48.25M1.75 19.8333H48.25M1.75 12.0833L25 1.75L48.25 12.0833H1.75ZM4.33333 19.8333H45.6667V48.25H4.33333V19.8333Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <Link to={`${URLS.DASHBOARD.INDEX}`}>Pocetna</Link>
                    <Link to={`${URLS.DASHBOARD.LIST.INDEX}`}>Spisak zaposlenih</Link>
                    <Link to={`${URLS.DASHBOARD.OVERVIEW.INDEX}`}>Pregled</Link>
                    <Link to={`${URLS.DASHBOARD.TRADE}`}>Trgovina</Link>
                    <Link to={`${URLS.DASHBOARD.ORDERS}`}>Narudzbine</Link>
                    <Link to={`${URLS.DASHBOARD.SYSTEM}`}>Sistem</Link>
                </div>
                <Button design={BUTTON_DESIGN.INLINE} className="pr-8 !text-white" label={username} />
            </div>
        </div>
    );
}

export default Header
