import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"

function ForexModal(props) {
    useEffect(() => {
    }, [])

    return (
        <Modal visible={props.visible} onClose={handleClose} title="OTP Setup">
        </Modal>
    )
}

ForexModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ForexModal