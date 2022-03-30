import PropTypes from "prop-types";
import Button from "./Button";
import TextField from "./TextField";

function Form(props) {

    function renderFields() {
        const fields = []
        props.fields.map(item => {
            fields.push(<p><TextField placeholder={item[0]} isHidden={item[1]}/></p>)
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
            <form>
                <div>
                    {renderFields().map(r => r)} 
                </div>
                <div>
                    <Button label={props.button}/>
                </div>
            </form>
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
