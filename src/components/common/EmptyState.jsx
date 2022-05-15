
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function EmptyState(props) {
    const style = classNames(
        "border-1 rounded-xl",
        "bg-gray-200 text-gray-500 bd-gray-500",
        "flex justify-center items-center",
        "h-32"
    )

    return (
        <div className={style} >
            {props.text}
        </div>
    );
}

EmptyState.propTypes = {
    text: PropTypes.string.isRequired,
}

export default EmptyState