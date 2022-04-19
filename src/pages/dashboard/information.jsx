import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";
import Select from "../../components/common/Select";
import { editUserAction } from "../../clients/client";
import { useSelector } from "react-redux";
import { getUserSelector } from "../../redux/selectors";
import { BANK_POSITIONS } from "./newuser";

export default function InformationPage(props) {
  const user = useSelector(getUserSelector)
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    email: "",
    jmbg: "",
    br_telefon: "",
    pozicija: BANK_POSITIONS.ADMIN,
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
      br_telefon: user["br_telefon"],
      pozicija: user["role"]["name"],
    })
  }, [user])

  return (
    <div className="w-[900px] flex flex-col gap-8">
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
              onChange={(e) => onChange({ br_telefon: e })}
              placeholder="Telefon"
              value={form && form["br_telefon"]}
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
