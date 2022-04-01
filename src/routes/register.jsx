
import React from "react"
import Window from "../components/common/Window"
import TextField from "../components/common/TextField"
import Button from "../components/common/Button"

export default function RegisterPage() {

    return (
        <Window title="Welcome" className="mx-auto">
            <div className="flex flex-col gap-3">
                <TextField placeholder="Ime" />
                <TextField placeholder="Prezime" />
                <TextField placeholder="E-mail" />
                <TextField placeholder="JMBG" />
                <TextField placeholder="Broj telefona" />
                <TextField placeholder="Pozicija u banci" />
                <Button label="Register" />
            </div>
        </Window>
    )
}