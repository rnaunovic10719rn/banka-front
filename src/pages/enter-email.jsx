
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Window from "../components/common/Window"
import TextField from "../components/common/TextField"
import Button from "../components/common/Button"
import Alert from "../components/common/Alert"
import { resetEmail } from "../clients/client"
import { URLS } from "../routes"

export default function EmailPage() {
    let navigate = useNavigate();
    const [email, setEmail] = useState(null)
    const [error, setError] = useState(null)

    function disableCta() {
        if (email == null) return true
        return false
    }

    async function emailRes(e) {
        e.preventDefault()
        try {
            await resetEmail(email)
            navigate("/" + URLS.LOGIN)
        } catch {
            setError("Failed to send email.")
        }
    }

    return (
        <Window title="ZABORAVILI STE ŠIFRU" className="mx-auto">
            <form onSubmit={emailRes} className="flex flex-col gap-3">
                {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                <TextField placeholder="E-mail" onChange={setEmail} />
                <Button type="submit" label="Posaljite email" disabled={disableCta()} />
            </form>
        </Window>
    )
}