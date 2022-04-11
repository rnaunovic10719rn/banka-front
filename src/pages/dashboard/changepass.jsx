import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import { URLS } from "../../routes"
import { changePasswordApi } from "../../clients/client"



export default function ChangePasswordPage() {
    let navigate = useNavigate();
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [error, setError] = useState(null)

    async function changePassword(e) {
        e.preventDefault()

        if (password1 !== password2) {
            setError("Sifra je pogresna");
            return;
        }

        try {
            await changePasswordApi(password1)
            navigate("/" + URLS.DASHBOARD.PRIVACY)
        } catch {
            setError("Failed to change password.")
        }
    }

    return (
        <div className="w-[500px] flex-centre">
            <Card title="PROMENITE ŠIFRU">
                <form onSubmit={changePassword} className="flex flex-col gap-3">
                    <TextField type="password" placeholder="Šifra" onChange={setPassword1} />
                    <TextField type="password" placeholder="Ponovite šifru" onChange={setPassword2} />
                    <Button label="Promeni sifru" type="submit" disabled={!password1 || !password2 || password1 !== password2} />
                </form>
            </Card>
        </div>
    )
}