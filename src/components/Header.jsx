import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { URLS } from "../routes";
import Button, { BUTTON_DESIGN } from "./common/Button";
import { useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";
import { logoutAction } from "../clients/client";
import Logo from "./common/Logo";
import HoverMenu, { HoverMenuItem } from "./common/HoverMenu";

function Header(props) {
    const user = useSelector(getUserSelector)
    const [username, setUsername] = useState("Username")

    const style = classNames(
        "inset-x-0 top-0", //position
        "bg-indigo-500", // background
        "text-base leading-9 text-white font-semibold", // font
        "py-3", // spacing
    )

    useEffect(() => {
        if (user) setUsername(user['username'])
    }, [user])


    return (
        <div data-testid="component-header" className={style}>
            <div className="flex justify-between">
                <div className="flex gap-8">
                    <div className="pl-5 mr-2">
                        <Link to={`${URLS.DASHBOARD.INDEX}`}>
                            <Logo size={10} />
                        </Link>
                    </div>
                    <Link to={`${URLS.DASHBOARD.INDEX}`}>Pocetna</Link>
                    <Link to={`${URLS.DASHBOARD.TRADE}`}>Trgovina</Link>
                    <Link to={`${URLS.DASHBOARD.ORDERS}`}>Narudzbine</Link>
                    <Link to={`${URLS.DASHBOARD.LIST.INDEX}`}>Spisak zaposlenih</Link>
                </div>
                <HoverMenu className="mr-3" text={username}>
                    <HoverMenuItem text="Profile" to={`${URLS.DASHBOARD.INFORMATION}`} />
                    <HoverMenuItem text="Logout" to={`${URLS.DASHBOARD.INDEX}`} onClick={() => logoutAction()} />
                </HoverMenu>
            </div>
        </div>
    );
}

export default Header
