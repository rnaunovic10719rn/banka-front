import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import { URLS } from "../../routes"



export default function ChangePasswordPage() {
    const [password1,setPassword1 ] = useState(null);
    const [password2,setPassword2 ] = useState(null);
    const [form,setForm] = useState({

        password1:"",
        password2:"",

    });

    let navigate = useNavigate();

    const [error, setError] = useState(null)

    async function changePassword() {
        console.log(password1,password2);
        if(password1 !== password2){
            setError("Sifra je pogresna");
            
            return;
        
        }
        try {
            //await loginAction(username, password)
            navigate("/" + URLS.DASHBOARD.PRIVACY)
        } catch {
            setError("Failed to login.")
        }
    }

    return (
        <div className="w-[500px] flex-centre">
            <Card title="PROMENITE ŠIFRU">
                <div className="flex flex-col gap-3">
                    <TextField placeholder="Šifra" onChange={setPassword1}/>
                    <TextField placeholder="Ponovite šifru" onChange={setPassword2} />
                    <Button label="Prijavite se" onClick={changePassword}/>
                </div>
            </Card>
        </div>
    )
}