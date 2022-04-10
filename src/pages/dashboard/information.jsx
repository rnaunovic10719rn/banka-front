import React, { useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import Alert from "../../components/common/Alert";

export default function InformationPage(props) {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    jmbg: "",
    pozicija: "",
    email: "",
    br_telefon: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const onChange = (event) => {
    setForm({ ...form, ...event });
  };

  async function onSubmit() {
    try {
      //await editUserAction(form);
      setSuccess(true);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div className="w-[900px] flex flex-col gap-8">
      {error && (
        <Alert
          design="danger"
          text="Error"
          onDismiss={() => setError(null)}
        ></Alert>
      )}
      {success && (
        <Alert
          design="success"
          text="Success"
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
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Prezime</div>
            <TextField
              className="grow"
              onChange={(e) => onChange({ prezime: e })}
              placeholder="Prezime"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">JMBG</div>
            <TextField
              className="grow"
              onChange={(e) => onChange({ jmbg: e })}
              placeholder="JMBG"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Pozicija</div>
            <TextField
              className="grow"
              onChange={(e) => onChange({ pozicija: e })}
              placeholder="Pozicija"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">E-mail</div>
            <TextField
              className="grow"
              onChange={(e) => onChange({ email: e })}
              placeholder="E-mail"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Telefon</div>
            <TextField
              className="grow"
              onChange={(e) => onChange({ br_telefon: e })}
              placeholder="Telefon"
            />
          </div>
          <div>
            <Button
              className="float-right"
              onClick={onSubmit}
              label="Promeni"
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
