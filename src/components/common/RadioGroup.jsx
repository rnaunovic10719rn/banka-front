import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function RadioButton(props) {
  const style = classNames(
    "px-3 py-2",
    "cursor-pointer",
    "border first:border-l border-l-0 border-gray-300 first:rounded-l last:rounded-r border-collapse",
    "bg-white hover:bg-gray-100",
    "select-none",
    { "text-indigo-500 font-semibold": props.isActive }
  );

  const labelStyle = classNames();

  return (
    <label
      data-testid="common-radio-button"
      className={style}
      htmlFor={props.value}
    >
      <input
        className="hidden"
        type="radio"
        name={props.name}
        id={props.value}
        value={props.value}
        onClick={props.onClick}
      />
      {props.label}
    </label>
  );
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

function RadioGroup(props) {
  const [active, setActive] = useState(props.options[0]);

  const style = classNames("flex");

  function handleChange(e) {
    setActive(e.target.value);
    props.onChange(e.target.value);
  }

  return (
    <div data-testid="common-radio-group" className={style}>
      {props.options.map((o) => (
        <RadioButton
          key={o}
          value={o}
          label={o}
          onClick={handleChange}
          isActive={o === active}
        />
      ))}
    </div>
  );
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default RadioGroup;
