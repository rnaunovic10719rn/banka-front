import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import QRCode from "react-qr-code";
import TextField from "./common/TextField"
import Modal from "./common/Modal"
import Button from "./common/Button"
import { generateSecret, getQrCodeApi, getUserId, setUserSecret } from "../clients/client";

const MODAL_STATE = {
    QR_CODE: "QR_CODE",
    CONFIRM_CODE: "CONFIRM_CODE",
}

function OtpModal(props) {
    const [modalState, setModalState] = useState(MODAL_STATE.QR_CODE)
    const [secret, setSecret] = useState("")
    const [qrCode, setQrCode] = useState("")
    const [validationCode, setValidationCode] = useState("")

    async function getSecret() {
        setSecret(await generateSecret())
    }

    async function getQrCode() {
        if (secret == null) return;
        const r = await getQrCodeApi(secret);
        setQrCode(r)
    }

    async function setUserSecretModal() {
        const id = await getUserId();
        await setUserSecret(id, secret);
    }

    function handleClose() {
        setModalState(MODAL_STATE.QR_CODE)
        props.onClose()
    }

    useEffect(() => {
        getSecret()
    }, [])

    useEffect(() => {
        getQrCode()
    }, [secret])

    return (
        <Modal id="otp-modal" visible={props.visible} onClose={handleClose} title="OTP Setup">
            {(modalState === MODAL_STATE.QR_CODE) &&
                <div className="flex flex-col gap-5">
                    <div className="grid justify-items-center gap-5">
                        <div>
                            <h4>Korisite Vašu aplikaciju za autentifikaciju da biste skenirali ovaj QR kod.</h4>
                        </div>
                        {qrCode && <span title="QR CODE"><QRCode value={qrCode} /></span>}
                    </div>
                    <div>
                        <Button className="float-right" label="Nastavi" onClick={() => setModalState(MODAL_STATE.CONFIRM_CODE)} />
                    </div>
                </div>
            }
            {(modalState === MODAL_STATE.CONFIRM_CODE) &&
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col justify-items-center gap-5">
                        <div>
                            <h4>Unesite kod koji je Vaša aplikacija generiasala.</h4>
                        </div>
                        <TextField placeholder="Kod" onChange={setValidationCode} />
                    </div>
                    <div>
                        <Button className="float-right" label="Nastavi" onClick={() => {
                            setUserSecretModal();
                            handleClose();
                        }} />
                    </div>
                </div>
            }
        </Modal>
    )
}

OtpModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default OtpModal