import PropTypes from "prop-types";

function Container(props) {

    return (
        <div className='container mx-auto'>
            {props.children}
        </div>
    )
}
Container.propTypes = {
    children: PropTypes.any,
}
export default Container