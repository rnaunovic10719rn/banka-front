import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";


function Card(props) {
    const cardStyle = classNames(
        "border rounded-xl",
        "p-8",
        "bg-white",
        props.className,
    )

    const titleStyle = classNames(
        "relative px-2 left-6 top-3.5", // position
        "bg-white ", // background
        "text-3xl font-extrabold",
    )

    return (

        <div>
            {props.title && < span className={titleStyle}>
                <b>{props.title}</b>
            </span>}
            <div className={cardStyle}>
                {props.children}
            </div>
        </div>
    );
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
}

export default Card