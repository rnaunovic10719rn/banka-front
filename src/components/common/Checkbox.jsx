import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Checkbox(props) {
    const [active, setActive] = useState(false)

    const style = classNames(
        "select-none cursor-pointer",
    )

    function handleClick() {
        setActive(!active)
        props.onChange(!active)
    }

    return (
        <label className={style} htmlFor={props.value}>
            <input className="mr-2" type="checkbox" value={props.value} id={props.value} checked={active} onClick={handleClick} />
            {props.label}
        </label>
    )
}

Checkbox.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.string.isRequired,
}

export default Checkbox