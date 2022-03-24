import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

function Table(props) {
  const borderColor = "border-gray-200"
  const cellSpacing = "py-3 px-4"

  const tableClassnames = classNames(
    "border-collapse border", borderColor, // border
    "w-full", // width
    "text-left", // text
    props.classNames,
  );
  const headerClassnames = classNames("border-b bg-gray-50", borderColor, cellSpacing)
  const cellClassnames = classNames("border-b text-gray-400 bg-white", borderColor, cellSpacing)

  return (
    <React.Fragment>
      <table className={tableClassnames}>
        <thead>
          <tr>
            {props.headings.map((h, i) => {
              return (
                <th key={i} className={headerClassnames} id={h}>
                  {h}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {(props.rows.length > 0) && props.rows.map((row, i) => {
            return (
              <tr key={i}>{row.map((r, j) => { return <td key={j} className={cellClassnames}>{r}</td> })}</tr>
            )
          })}
        </tbody>
      </table>
      {(props.rows.length === 0) &&
        <div className="border border-t-0 bg-white text-center py-10">No data.</div>
      }
    </React.Fragment>
  );
}

Table.propTypes = {
  headings: PropTypes.arrayOf(PropTypes.string),
  rows: PropTypes.array,
  classNames: PropTypes.string,
};

export default Table;
