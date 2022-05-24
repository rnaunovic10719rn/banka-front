
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField from "../components/common/TextField"
import Button from "../components/common/Button"
import Alert from "../components/common/Alert"
import { hasTwoFactor, loginAction } from "../clients/client"
import { URLS } from "../routes"
import { useDispatch } from "react-redux";
import { getUserApi, resetEmail } from "../clients/client";
import { addUserAction } from "../redux/actions";
import Block from "../components/common/Block"
import Logo from "../components/common/Logo"

const STATE = {
    DEFAULT: 'default',
    TWO_FA: '2fa',
    FORGOT: 'forgot',
}

export default function LoginPage() {
    let navigate = useNavigate();
    const [currentState, setCurrentState] = useState(STATE.DEFAULT)
    const [is2fa, setis2fa] = useState(false);
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [otp, setOtp] = useState(null)
    const [error, setError] = useState(null)
    const [email, setEmail] = useState(null)


    const dispatch = useDispatch();

    async function getUser() {
        const response = await getUserApi();
        dispatch(addUserAction(response));
    }

    function disableCta() {
        if (username == null || password == null) return true
        return false
    }

    async function login(e) {
        e.preventDefault()
        try {
            const has2fa = await hasTwoFactor(username);
            if (!has2fa) {
                await loginAction(username, password)
                await getUser()
                navigate(URLS.DASHBOARD.INDEX)
            }
            else {
                setis2fa(true);
            }
        } catch {
            setError("Failed to login.")
        }
    }

    async function loginWith2fa(e) {
        e.preventDefault()
        try {
            await loginAction(username, password, otp)
            await getUser()
            navigate(URLS.DASHBOARD.INDEX)
        } catch {
            setError("Failed to login.")
        }
    }

    function renderRegular() {
        return (
            <form onSubmit={login} className="flex flex-col gap-3">
                {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                <TextField label="Username" placeholder="username" onChange={setUsername} />
                <TextField type="password" label="Password" placeholder="********" onChange={setPassword} />
                <div className="flex justify-end">
                    <Button design="inline" label={"Zaboravili ste sifru?"} onClick={() => setCurrentState(STATE.FORGOT)} />
                </div>
                <Button type="submit" label={"Nastavite"} disabled={disableCta()} />
            </form>
        )
    }

    function render2FA() {
        return (
            <form onSubmit={loginWith2fa} className="flex flex-col gap-3">
                {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                <div>Treba da unesete 6-cifreni kod iz Google authenticatora kako biste pristupili Vašem nalogu.</div>
                <TextField placeholder="Kod" onChange={setOtp} />
                <Button type="submit" label={"Nastavite"} />
            </form>
        )
    }

    function renderForgotPassword() {
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
            <div>
                <div className="mb-3">
                    <p className="text-left font-semibold">Resetujte sifru.</p>
                    <p className="text-left">Unesite email i poslacemo vam link za resetovanje sifre..</p>
                </div>
                <form onSubmit={emailRes} className="flex flex-col gap-3">
                    {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                    <TextField label="E-mail" placeholder="user@email.com" onChange={setEmail} />
                    <Button type="submit" label="Posaljite email" disabled={disableCta()} />
                    <Button design="inline" label="Nazad" onClick={() => setCurrentState(STATE.DEFAULT)} />
                </form>
            </div>
        )
    }
    return (
        <div className="mt-10 grid grid-cols-4">
            <div className="max-w-xl col-span-2 col-start-2 text-center">
                <div className="mb-8">
                    <Logo className="flex justify-center text-indigo-500" size={32} />
                    <h1 className="text-3xl font-extrabold">Dobro dosli!</h1>
                </div>
                <Block className="">
                    {currentState === STATE.DEFAULT && renderRegular()}
                    {currentState === STATE.TWO_FA && render2FA()}
                    {currentState === STATE.FORGOT && renderForgotPassword()}
                </Block>
            </div>
        </div>
    )
}