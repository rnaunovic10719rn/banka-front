import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Link(props) {
    const style = classNames(
        "text-indigo-500 font-semibold",
        props.className,
    )

    return (
        <a className={style} href={props.href} download={props.downloadText}>
            {props.text}
        </a>
    );
}

Link.propTypes = {
    text: PropTypes.string,
    href: PropTypes.string,
    downloadText: PropTypes.string,
    className: PropTypes.string,
}

export default Link