import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function TabItem(props) {
    const style = classNames(
        "flex gap-5",
        "pb-3",
        "-mb-[2px]",
        "!no-underline",
        "cursor-pointer",
        "select-none",
        "hover:text-indigo-400",
        {"text-indigo-500 border-b-2 border-indigo-500": props.isActive}, // active
        {"text-gray-400": !props.isActive},
    )


    return (
        <div data-testid="common-tab-item" className={style} onClick={() => props.onClick(props.label)}>{props.label}</div>
    );
}

TabItem.propTypes = {
    label: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
}

function Tab(props) {
    const [active, setActive] = useState(props.tabs[0])

    const style = classNames(
        "flex gap-5",
        "border-b-2 border-gray-300",
        "mb-8",
    )

    function handleClick(e) {
        setActive(e)
        props.onChange(e)
    }

    return (
        <div data-testid="common-tab" className={style}>
            {props.tabs.map(t => <TabItem key={t} label={t} isActive={t === active} onClick={handleClick}/>)}
        </div>
    );
}

Tab.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Tab