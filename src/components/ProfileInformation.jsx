import React, { useEffect, useState } from "react";
import Card from "./common/Card";
import TextField from "./common/TextField";
import Button from "./common/Button";
import Alert from "./common/Alert";
import Select from "./common/Select";
import { editUserAction, getUserApi } from "../clients/client";
import { useDispatch, useSelector } from "react-redux";
import { getUserSelector } from "../redux/selectors";
import { BANK_POSITIONS } from "../utils";
import { addUserAction } from "../redux/actions";

function ProfileInformation() {

    const user = useSelector(getUserSelector)
    const [form, setForm] = useState({
        ime: "",
        prezime: "",
        email: "",
        jmbg: "",
        brTelefon: "",
        pozicija: BANK_POSITIONS.ADMIN,
        limit: "",
    });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const dispatch = useDispatch();

  async function getUser() {
    const response = await getUserApi();
    dispatch(addUserAction(response));
  }

  useEffect(() => {
    getUser();
  }, []);

  const onChange = (event) => {
    setForm({ ...form, ...event });
  };

  async function onSubmit() {
    try {
      await editUserAction(form);
      setSuccess(true);
    } catch (e) {
      setError(true);
    }
  }

    useEffect(() => {
        if (!user) return
        setForm({
            ime: user["ime"],
            prezime: user["prezime"],
            email: user["email"],
            jmbg: user["jmbg"],
            brTelefon: user["brTelefon"],
            pozicija: user["role"]["name"],
            limit: user["limit"]
        })
    }, [user])

    return (
        <div className="flex flex-col">
            {error && (
                <Alert
                    design="danger"
                    text="Neuspesno menjanje informacije"
                    onDismiss={() => setError(null)}
                ></Alert>
            )}
            {success && (
                <Alert
                    design="success"
                    text="Uspesno promenjeni podaci"
                    onDismiss={() => setSuccess(null)}
                ></Alert>
            )}
            <div className="flex items-center">
                <div className="w-[200px]">Limit</div>
                <div>
                    {form && form["limit"]}
                </div>
            </div>
            <Card title="Osnovno">
                <div class="flex flex-col gap-5">
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">Ime</div>
                        <TextField
                            className="grow"
                            onChange={(e) => onChange({ ime: e })}
                            placeholder="Ime"
                            value={form && form["ime"]}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">Prezime</div>
                        <TextField
                            className="grow"
                            onChange={(e) => onChange({ prezime: e })}
                            placeholder="Prezime"
                            value={form && form["prezime"]}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">JMBG</div>
                        <TextField
                            className="grow"
                            onChange={(e) => onChange({ jmbg: e })}
                            placeholder="JMBG"
                            value={form && form["jmbg"]}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">Pozicija</div>
                        <Select
                            className="grow"
                            onChange={(e) => onChange({ pozicija: e })}
                            options={[BANK_POSITIONS.ADMIN, BANK_POSITIONS.ADMIN_GL]}
                            defValue={form && form["pozicija"]}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">E-mail</div>
                        <TextField
                            className="grow"
                            onChange={(e) => onChange({ email: e })}
                            placeholder="E-mail"
                            value={form && form["email"]}
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="w-[100px]">Telefon</div>
                        <TextField
                            className="grow"
                            onChange={(e) => onChange({ brTelefon: e })}
                            placeholder="Telefon"
                            value={form && form["brTelefon"]}
                        />
                    </div>
                    <div>
                        <Button
                            className="float-right"
                            onClick={() => onSubmit()}
                            label="Promeni"
                        />
                    </div>
                </div>
            </Card>
    </div>
  );
}

export default ProfileInformation;
