import React from 'react'
import PropTypes from "prop-types";
import classNames from 'classnames';
import Button from './Button'

function Modal(props) {
    const wrapperStyle = classNames(
        "fixed top-0 right-0 left-0 z-50 flex justify-center pt-8", // position
        "w-full h-full",
        "overflow-y-auto overflow-x-hidden", // overflow
        "bg-black/25",
        { "hidden": !props.visible },
    )

    const modalStyle = classNames(
        "w-full max-w-2xl h-full",
        "drop-shadow-2xl",
    )

    function renderHeader() {
        return (
            <div class="py-4 px-6 flex justify-between items-middle border-b bd-gray-300">
                <h3 class="text-2xl font-semibold text-gray-900 lg:text-2xl">
                    {props.title}
                </h3>
                <button type="button" class="text-gray-500 bg-transparent hover:text-gray-900 text-sm inline-flex items-center" onClick={handleClose}>
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd">
                        </path>
                    </svg>
                </button>
            </div>
        )
    }

    function handleClose() {
        props.onClose()
    }

    return (
        <div id={props.id} tabindex="-1" className={wrapperStyle}>
            <div class={modalStyle}>
                <div class="relative bg-white shadow">
                    {renderHeader()}
                    <div className='p-6'>
                        {props.children}
                        {props.cta &&
                            <div className="flex justify-end mt-5">
                                <Button label={"Click"} />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Modal.propTypes = {
    visible: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node,
    cta: PropTypes.func,
    onClose: PropTypes.func.isRequired,
}

export default Modal