
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import TextField, { VALIDATION_PATTERN } from "../components/common/TextField"
import Button from "../components/common/Button"
import { hasTwoFactor, loginAction } from "../clients/client"
import { URLS } from "../routes"
import { useDispatch } from "react-redux";
import { getUserApi, resetEmail } from "../clients/client";
import { addUserAction } from "../redux/actions";
import Block from "../components/common/Block"
import Logo from "../components/common/Logo"
import Form from "../components/common/Form"
import { Store } from 'react-notifications-component';

const STATE = {
    DEFAULT: 'default',
    TWO_FA: '2fa',
    FORGOT: 'forgot',
}

export default function LoginPage() {
    let navigate = useNavigate();
    const [currentState, setCurrentState] = useState(STATE.DEFAULT)
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [otp, setOtp] = useState(null)
    const [email, setEmail] = useState("")
    const [formValid, setFormValid] = useState(false)


    const dispatch = useDispatch();

    async function getUser() {
        const response = await getUserApi();
        dispatch(addUserAction(response));
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
                setCurrentState(STATE.TWO_FA)
            }
        } catch {
            Store.addNotification({
                title: "Netacni podaci",
                message: "Probajte ponovo",
                type: "danger",
                container: "top-right",
            });
        }
    }

    async function loginWith2fa(e) {
        e.preventDefault()
        try {
            await loginAction(username, password, otp)
            await getUser()
            navigate(URLS.DASHBOARD.INDEX)
        } catch {
            Store.addNotification({
                title: "Netacni podaci",
                message: "Probajte ponovo",
                type: "danger",
                container: "top-right",
            });
        }
    }

    function renderRegular() {
        return (
            <Form onSubmit={login} className="flex flex-col gap-3" onValid={setFormValid}>
                <TextField label="Username" placeholder="username" onChange={setUsername} required />
                <TextField type="password" label="Password" placeholder="********" onChange={setPassword} required />
                <div className="flex justify-end">
                    <Button design="inline" label={"Zaboravili ste sifru?"} onClick={() => setCurrentState(STATE.FORGOT)} />
                </div>
                <Button type="submit" label={"Nastavite"} disabled={!formValid} />
            </Form>
        )
    }

    function render2FA() {
        return (
            <Form onSubmit={loginWith2fa} className="flex flex-col gap-3" onValid={setFormValid}>
                <div>Treba da unesete 6-cifreni kod iz Google authenticatora kako biste pristupili Vašem nalogu.</div>
                <TextField placeholder="Kod" onChange={setOtp} required />
                <Button type="submit" label={"Nastavite"} disabled={!formValid} />
            </Form>
        )
    }

    function renderForgotPassword() {

        async function emailRes(e) {
            e.preventDefault()
            try {
                await resetEmail(email)
                navigate("/" + URLS.LOGIN)
            } catch {
                Store.addNotification({
                    title: "Neuspesno slanje imejla",
                    message: "Probajte ponovo",
                    type: "danger",
                    container: "top-right",
                });
            }
        }

        return (
            <div>
                <div className="mb-3">
                    <p className="text-left font-semibold">Resetujte sifru.</p>
                    <p className="text-left">Unesite email i poslacemo vam link za resetovanje sifre..</p>
                </div>
                <Form onSubmit={emailRes} className="flex flex-col gap-3" onValid={setFormValid}>
                    <TextField label="E-mail" placeholder="user@email.com" onChange={setEmail} validation={VALIDATION_PATTERN.EMAIL} required />
                    <Button type="submit" label="Posaljite email" disabled={!formValid} />
                    <Button design="inline" label="Nazad" onClick={() => setCurrentState(STATE.DEFAULT)} />
                </Form>
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