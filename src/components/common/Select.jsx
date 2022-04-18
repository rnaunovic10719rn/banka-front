import React from "react";
import PropTypes from "prop-types"
import classNames from "classnames";

function Select(props) {
    const style = classNames(
        "border border-gray-300 rounded",
        "p-2", //spacing
        "bg-white",
        props.className,
    )

    return (
        <select className={style} onChange={(e) => props.onChange(e.target.value)}>
            {props.options.map(o => o == props.defValue ? <option value={o} selected>{o}</option> : <option value={o}>{o}</option>)}
        </select>
    )
}

Select.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onChange: PropTypes.func,
    className: PropTypes.string,
    defValue: PropTypes.string
}

export default Select