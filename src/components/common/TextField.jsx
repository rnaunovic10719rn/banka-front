import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const TEXT_FIELD_TYPE = {
  TEXT: "text",
  PASSWORD: "password",
};
function TextField(props) {
  const [value, setValue] = useState(props.value);
  const classes = classNames(
    "border-2 border-gray-300",
    "min-widht",
    "font-sans",
    "text-base",
    "bg-white-50", // background
    "text-gray text-base", // text
    "py-2 px-4", //spacing
    "rounded", // border
    "transition ease-in-out", // effects
    props.className // custom style
  );

  function handleChange(e) {
    setValue(e.target.value);
    props.onChange(e.target.value);
  }

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  return (
    <div className="flex flex-col justify-start">
      <div className="text-sm text-slate-500 pb-1 text-left">{props.label}</div>
      <input
        data-testid="common-text-field"
        value={value}
        type={props.type}
        placeholder={props.placeholder}
        className={classes}
        onChange={handleChange}
      />
    </div>
  );
}

TextField.propTypes = {
  value: PropTypes.string,
  type: PropTypes.oneOf([TEXT_FIELD_TYPE.TEXT, TEXT_FIELD_TYPE.PASSWORD]),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
};

TextField.defaultProps = {
  type: TEXT_FIELD_TYPE.TEXT,
  value: "",
};

export default TextField;
