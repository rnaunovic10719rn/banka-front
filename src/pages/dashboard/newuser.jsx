import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import Button from "../../components/common/Button"
import Select from "../../components/common/Select"
import { createUserAction } from "../../clients/client"
import { useNavigate } from "react-router-dom"
import { URLS } from "../../routes"
import Checkbox from "../../components/common/Checkbox";
import {useDispatch, useSelector,} from "react-redux";
import { getUserSelector } from "../../redux/selectors";
import { getUserApi} from "../../clients/client";
import { addUserAction } from "../../redux/actions";



export const BANK_POSITIONS = {
    ADMIN_GL: "ROLE_GL_ADMIN",
    ADMIN: "ROLE_ADMIN",
}

export default function NewUserPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        ime: "",
        prezime: "",
        email: "",
        jmbg: "",
        brTelefon: "",
        pozicija: BANK_POSITIONS.ADMIN,
        limit: "",
        needsSupervisorPermission: false,
    })

    function handleChange(e) {
        setForm({ ...form, ...e })
    }

    async function handleSubmit() {
        try {
            await createUserAction(form)
            navigate("/" + URLS.DASHBOARD.LIST.INDEX)
        } catch (e) {
        }
    }

    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();

    async function getUser() {
        const response = await getUserApi();
        dispatch(addUserAction(response));
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <div className="w-[500px]">
                <Card title="Register new user">
                    <div className="flex flex-col gap-3">
                        <TextField placeholder="Ime" onChange={(e) => handleChange({ ime: e })} />
                        <TextField placeholder="Prezime" onChange={(e) => handleChange({ prezime: e })} />
                        <TextField placeholder="E-mail" onChange={(e) => handleChange({ email: e })} />
                        <TextField placeholder="JMBG" onChange={(e) => handleChange({ jmbg: e })} />
                        <TextField placeholder="Broj telefona" onChange={(e) => handleChange({ brTelefon: e })} />
                        {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") && <TextField placeholder="Limit" onChange={(e) => handleChange({limit: e})}/>}
                        <Select options={[BANK_POSITIONS.ADMIN, BANK_POSITIONS.ADMIN_GL]} onChange={(e) => handleChange({ pozicija: e })} />
                        {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") && <Checkbox
                            label="Zahtevati odobravanje svake porudžbine"
                            onChange={(e) => handleChange({needsSupervisorPermission: e})}
                            value={form["Zahtevati odobravanje svake porudžbine"]}
                        />}
                        <Button label="Register" type="submit" onClick={handleSubmit} />
                    </div>
                </Card>
            </div>
        </div>
    )
}