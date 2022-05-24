import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Block(props) {
    const style = classNames(
        "p-8",
        "rounded",
        "drop-shadow-lg",
        "drop-shadow-lg-t",
        "bg-white",
        "border",
        props.className,
    )

    return (
        <div>
            <h1 className="font-extrabold text-2xl mb-2">{props.title}</h1>
            <div className={style} >
                {props.children}
            </div>
        </div>
    );
}

Block.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string,
}

export default Block