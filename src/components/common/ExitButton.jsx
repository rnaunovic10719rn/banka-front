import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function ExitButton(props) {
    const stlye = classNames(
        " bg-transparent text-sm inline-flex items-center",
        {"text-gray-500 hover:text-gray-900": !props.color},
        props.color,
    )

    return (
        <button data-testid="common-exit-button" type="button" className={stlye} onClick={props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
        </button>
    )
}

ExitButton.propTypes = {
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default ExitButton