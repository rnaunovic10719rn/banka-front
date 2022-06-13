import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Block(props) {
    const style = classNames(
        "p-8",
        "rounded-xl",
        "bg-white",
        "border",
        props.className,
    )

    return (
        <div data-testid="common-block">
            <div className={style} >
                <div className="flex justify-between">
                    <h1 data-testid="common-block-title" className="font-extrabold text-4xl mb-8">{props.title}</h1>
                    <div>
                        {props.cta}
                    </div>
                </div>
                {props.children}
            </div>
        </div>
    );
}

Block.propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    cta: PropTypes.any,
    className: PropTypes.string,
}

export default Block