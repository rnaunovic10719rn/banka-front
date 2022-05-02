import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Window from "../../components/common/Window"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import { URLS } from "../../routes"
import { changePasswordById, getUserId, logoutAction } from "../../clients/client"
import { useEffect } from 'react';


export default function ChangePasswordPage() {
    let navigate = useNavigate();
    const [password1, setPassword1] = useState(null);
    const [password2, setPassword2] = useState(null);
    const [error, setError] = useState(null);
    const [linkPath, setLinkPath] = useState([]);


    const [id, setId] = useState(null)

    async function getId() {
        setId(await getUserId());
    }

    useEffect(() => {
        console.log(window.location.pathname);
        setLinkPath(window.location.pathname.split("/"));
        getId()
    }, [])

    useEffect(() => {
        console.log(linkPath);
    }, [linkPath])


    async function changePassword(e) {
        e.preventDefault()

        if (password1 !== password2) {
            setError("Sifra je pogresna");
            return;
        }

        try {
            if (linkPath.length == 2) {
                await changePasswordById(id,password1)
                navigate("/" + URLS.DASHBOARD.PRIVACY)
            }
            else {
                await logoutAction()
                navigate("/" + URLS.LOGIN)
            }
        } catch {
            setError("Failed to change password.")
        }
    }

    return (
        <Window title="PROMENITE ŠIFRU" className="mx-auto">
            <form onSubmit={changePassword} className="flex flex-col gap-3">
                <TextField type="password" placeholder="Šifra" onChange={setPassword1} />
                <TextField type="password" placeholder="Ponovite šifru" onChange={setPassword2} />
                <Button label="Promeni sifru" type="submit" disabled={!password1 || !password2 || password1 !== password2} />
            </form>
        </Window>
    )
}