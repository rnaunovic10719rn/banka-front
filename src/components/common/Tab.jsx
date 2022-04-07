import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button, { BUTTON_DESIGN } from "./Button";

function TabItem(props) {
    const style = classNames(
        "flex gap-5",
        "pb-2",
        "-mb-px",
        "!no-underline",
        { "!text-indigo-500 border-b-2 border-indigo-500": props.isActive }, // active
        { "!text-gray-400 !hover:text-gray-500": !props.isActive },
    )


    return (
        <Button className={style} design={BUTTON_DESIGN.INLINE} label={props.label} onClick={() => props.onClick(props.label)} />
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
        "border-b border-gray-300",
        "mb-8",
    )

    function handleClick(e) {
        setActive(e)
        props.onChange(e)
    }

    return (
        <div className={style} >
            {props.tabs.map(t => <TabItem label={t} isActive={t === active} onClick={handleClick} />)}
        </div>
    );
}

Tab.propTypes = {
    tabs: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Tab