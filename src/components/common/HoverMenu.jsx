import React, { useState } from "react";
import PropTypes, { func } from "prop-types";
import classNames from "classnames";
import { Link } from "react-router-dom";

export function HoverMenuItem(props) {
    const style = classNames(
        "py-2 px-3",
        "text-slate-800",
        "bg-white hover:bg-gray-300",
        "first:rounded-t last:rounded-b",
        "cursor-pointer",
    )
    return (
        <div className={style}>
            <Link to={props.to} onClick={props.onClick}>{props.text}</Link>
        </div>
    )
}

HoverMenuItem.propTypes = {
    text: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
}

HoverMenuItem.defaultProps = {
    to: "",
}

function HoverMenu(props) {
    const [hovered, setHovered] = useState(false)

    const style = classNames(
        "relative",
        "cursor-pointer",
        props.className,
    )

    const hoverWidgetStyle = classNames(
        "rounded",
        "drop-shadow-xl",
        "right-0",
        "absolute",
        { "hidden": !hovered }
    )

    console.log(hovered)

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className={style}>
            {props.text}
            <div className={hoverWidgetStyle}>
                {props.children}
            </div>
        </div>
    );
}

HoverMenu.propTypes = {
    text: PropTypes.string,
    children: PropTypes.any,
    className: PropTypes.string,
}

export default HoverMenu