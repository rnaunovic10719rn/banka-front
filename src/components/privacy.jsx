import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Button, { BUTTON_DESIGN } from './common/Button'
import { URLS } from '../routes'
import Card from "./common/Card"
import Alert from "./common/Alert"
import OtpModal from "./OtpModal"
//import { useNavigate } from "react-router-dom"



export default function ProfilePrivacy() {
    let navigate = useNavigate()

    const [otpModal, setOtpModal] = useState(false);
    const [openKod, setOpenKod] = useState(false);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const [form, setForm] = useState({
        kod: "",
    });

    const onChange = (event) => {
        setForm({ ...form, ...event });
    };

    async function onSubmit() {
        try {
            setSuccess(true);
        } catch (e) {
            setError(true);
        }
    }

    return (
        <div className="w-[500] flex flex-col gap-8">
            {error && (
                <Alert
                    design="danger"
                    text="Error"
                    onDismiss={() => setError(null)}
                ></Alert>
            )}
            {success && (
                <Alert
                    design="success"
                    text="Autentifikacija je uspešno podešena."
                    onDismiss={() => setSuccess(null)}
                ></Alert>
            )}
            <Card title="Šifra">
                <div>
                    <Button design={BUTTON_DESIGN.PRIMARY} label="Promenite šifru" onClick={() => navigate("/" + URLS.DASHBOARD.CHANGEPASSWORD.REGULAR)} />
                </div>
            </Card>
            <Card title="2-faktor autentifikacija">
                <div>
                    <Button className="openModalBtn" label="Podesi" design={BUTTON_DESIGN.PRIMARY}
                        onClick={() => {
                            setOtpModal(true);
                        }} />
                    <OtpModal visible={otpModal} onClose={() => setOtpModal(false)} />
                </div>
            </Card>
        </div>
    )
}