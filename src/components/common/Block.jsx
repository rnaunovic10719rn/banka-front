import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Block(props) {
    const style = classNames(
        "p-8",
        "rounded-xl",
        "drop-shadow-lg",
        "drop-shadow-lg-t",
        "bg-white",
        "border",
        props.className,
    )

    return (
        <div>
            <div className={style} >
                {props.title &&
                    <h1 className="font-extrabold text-4xl mb-8">{props.title}</h1>
                }
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