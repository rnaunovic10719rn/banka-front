import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Select(props) {
  const style = classNames(
    "border border-gray-300 rounded",
    "p-2", //spacing
    "bg-white",
    props.className
  );

  return (
    <select
      data-testid="common-select"
      className={style}
      onChange={(e) => props.onChange(e.target.value)}
    >
      {props.options.map((o) =>
        o == props.defValue ? (
          <option data-testid="common-select-option" key={o} value={o} selected>
            {o}
          </option>
        ) : (
          <option data-testid="common-select-option" key={o} value={o}>
            {o}
          </option>
        )
      )}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func,
  className: PropTypes.string,
  defValue: PropTypes.string,
};

export default Select;
