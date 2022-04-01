
import React, { useState, useEffect } from "react"
import Window from "../components/common/Window"
import TextField from "../components/common/TextField"
import Button from "../components/common/Button"

export default function LoginPage() {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    function disableCta() {
        if (username == null || password == null) return true
        return false
    }

    return (
        <Window title="Welcome" className="mx-auto">
            <div className="flex flex-col gap-3">
                <TextField placeholder="Korisnicko ime" onChange={setUsername} />
                <TextField placeholder="Lozinka" onChange={setPassword} />
                <Button label="Login" disabled={disableCta()} />
            </div>
        </Window>
    )
}