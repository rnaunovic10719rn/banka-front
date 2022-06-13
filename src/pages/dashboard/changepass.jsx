import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Window from "../../components/common/Window"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import { URLS } from "../../routes"
import Alert from "../../components/common/Alert"
import { changePasswordById, changePasswordViaEmail, getUserId, logoutAction } from "../../clients/client"
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

    function checkPassword(password) {
        let errorMsg = "Promena šifre nije uspela. Nisu ispunjeni sledeći uslovi:\n";
        let errorCnt = 0;

        if (password.length < 8) {
            errorCnt++;
            errorMsg += "Šifra ima manje od 8 karaktera.\n";
        }

        let upCnt = 0;
        let lowCnt = 0;
        let digCnt = 0;

        for (let i = 0; i < password.length; i++) {
            const ch = password[i];
            if (ch >= '0' && ch <= '9') {
                digCnt++;
            }
            else if (ch == ch.toUpperCase()) {
                upCnt++;
            }
            else if (ch == ch.toLowerCase()) {
                lowCnt++;
            }
        }

        if (upCnt == 0) {
            errorCnt++;
            errorMsg += "Šifra ne sadrži nijedno veliko slovo.\n";
        }

        if (lowCnt == 0) {
            errorCnt++;
            errorMsg += "Šifra ne sadrži nijedno malo slovo.\n";
        }

        if (digCnt == 0) {
            errorCnt++;
            errorMsg += "Šifra ne sadrži nijednu cifru.\n";
        }

        if (errorCnt != 0)
            return errorMsg;
        
        return "";
    }


    async function changePassword(e) {
        e.preventDefault()
        
        let errMsg = checkPassword(password1);
        if (errMsg.length > 0) {
            setError(errMsg);
            return;
        }
        
        try {
            if (linkPath.length == 2) {
                await changePasswordById(id,password1)
                navigate("/" + URLS.DASHBOARD.INFORMATION)
            }
            else {
                const body = {
                    emailToken: "Bearer " + linkPath[2],
                    newPassword: password1
                }
                await changePasswordViaEmail(body);
                await logoutAction();
                navigate("/" + URLS.LOGIN);
            }
        } catch {
            setError("Promena šifre nije uspela.")
        }
    }

    return (
        <>
            {error && <Alert design="danger" text={error} onDismiss={() => setError(null)} />}
            <Window title="PROMENITE ŠIFRU" className="mx-auto">
                <div>
                    Šifra treba da ispuni sledeće uslove:
                    <ul>
                        <li>Da ima minimum 8 karaktera.</li>
                        <li>Da sadrži barem jedno veliko i jedno malo slovo.</li>
                        <li>Da sadrži barem 1 cifru.</li>
                    </ul>
                </div>
                <br></br>
                <form onSubmit={changePassword} className="flex flex-col gap-3">
                    <TextField type="password" placeholder="Šifra" onChange={setPassword1} />
                    <TextField type="password" placeholder="Ponovite šifru" onChange={setPassword2} />
                    <Button label="Promeni sifru" type="submit" disabled={!password1 || !password2 || password1 !== password2} />
                </form>
            </Window>
        </>
    )
}