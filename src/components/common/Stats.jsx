import PropTypes from "prop-types";

function Stats(props) {
    function renderStat(s) {
        console.log(s)
        return (
            <div className="text-center">
                <div className="text-3xl text-indigo-500 font-black">{s.stat}</div>
                <div className="text-lg text-gray-500 capitalize">{s.text.replace(/([a-z])([A-Z])/g, '$1 $2')}</div>
            </div>
        )
    }

    return (
        <div className="flex justify-between">
            {props.stats.map(s => {
                return renderStat(s)
            })}
        </div>
    )
}

Stats.propTypes = {
    stats: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string,
        stat: PropTypes.string,
    }))
}

export default Stats