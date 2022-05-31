import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Logo(props) {
    const style = classNames(
        "font-semibold",
        props.className,
    )

    const logoStyle = classNames(
        `h-${props.size} w-${props.size}`,
        "text-center",
    )

    return (
        <div className={style}>
            <svg xmlns="http://www.w3.org/2000/svg" className={logoStyle} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </div>
    );
}

Logo.propTypes = {
    size: PropTypes.string,
    className: PropTypes.string,
}

Logo.defaultProps = {
    size: 12,
}

export default Logo