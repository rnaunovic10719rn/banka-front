import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Block(props) {
    const style = classNames(
        "p-8",
        "rounded",
        "drop-shadow-lg",
        "bg-white",
        props.className,
    )

    return (
        <div className={style} >
            {props.children}
        </div>
    );
}

Block.propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
}

export default Block