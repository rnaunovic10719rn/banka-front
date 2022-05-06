
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Window from "../components/common/Window"
import TextField from "../components/common/TextField"
import Button from "../components/common/Button"
import Alert from "../components/common/Alert"
import { hasTwoFactor, loginAction } from "../clients/client"
import { URLS } from "../routes"
import { useDispatch } from "react-redux";
import { getUserApi } from "../clients/client";
import { addUserAction } from "../redux/actions";

export default function LoginPage() {
    let navigate = useNavigate();
    const [is2fa, setis2fa] = useState(false);
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const [otp, setOtp] = useState(null)
    const [error, setError] = useState(null)

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
            console.log(has2fa);
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
            console.log(username);
            console.log(password);
            console.log(otp);
            await loginAction(username, password, otp)
            await getUser()
            navigate(URLS.DASHBOARD.INDEX)
        } catch {
            setError("Failed to login.")
        }
    }

    return (
        <> { !is2fa &&
            <Window title="Welcome" className="mx-auto">
                <form onSubmit={login} className="flex flex-col gap-3">
                    {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                    <TextField placeholder="Korisnicko ime" onChange={setUsername} />
                    <TextField type="password" placeholder="Lozinka" onChange={setPassword} />
                    <div style={{textAlign: 'right'}}>
                        <a href={"/" + URLS.EMAIL}>Zaboravili ste sifru</a>
                    </div>

                    <Button type="submit" label="Login" disabled={disableCta()} />
                </form>
            </Window>
            }
            {
                is2fa &&
                <Window title="Welcome" className="mx-auto">
                    <form onSubmit={loginWith2fa} className="flex flex-col gap-3">
                        {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
                        <div>Treba da unesete 6-cifreni kod iz Google authenticatora kako biste pristupili Vašem nalogu.</div>
                        <TextField placeholder="Kod" onChange={setOtp} />
                        <Button type="submit" label="Nastavite"/>
                    </form>
                </Window>
            }
        </>
    )
}