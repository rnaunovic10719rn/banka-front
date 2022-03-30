import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "./Button";

function Field(props) {

    if(props.isHidden)
        return (
        <input type="password" placeholder={props.fieldName}></input>
        )

    return (
        <input type="text" placeholder={props.fieldName}></input>
      )
}

Field.propTypes = {
    fieldName: PropTypes.string.isRequired,
    isHidden: PropTypes.bool
}

Field.defaultProps = {
    isHidden: false
}

function Form(props) {

    function renderFields() {
        const fields = []
        props.fields.map(item => {
            fields.push(<Field fieldName={item[0]} isHidden={item[1]}/>)
        })
        return fields
        }
    
    function renderInfo() {
        if(props.info)
            return <div>{props.info}</div> 
        return;
        }

    return (
        <div>
            <div>{props.title}</div>
            <div>
                {renderInfo()}
            </div>
            <div>
                {renderFields().map(r => r)} 
            </div>
            <div>
                <Button label={props.button}/>
            </div>
        </div>


  );
}

Form.propTypes = {
  title: PropTypes.string,
  info: PropTypes.string,
  fields: PropTypes.arrayOf(PropTypes.array),
  button: PropTypes.string
};

export default Form;
