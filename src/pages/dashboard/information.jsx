import React, { useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";

export default function InformationPage(props) {
  const [form, setForm] = useState({
    ime: "",
    prezime: "",
    jmbg: "",
    pozicija: "",
    email: "",
    br_telefon: "",
  });

  const onChange = (event) => {
    console.log(`IN INPUT ${event}`);
    setForm({ ...form, ...event });
  };

  function onSubmit() {
    return fetch("/user/edit/{id}")
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.InformationPage;
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="w-[900px] flex flex-col gap-8">
      <Card title="Osnovno">
        <div class="flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Ime</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ ime: e })}
              placeholder="Ime"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Prezime</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ prezime: e })}
              placeholder="Prezime"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">JMBG</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ jmbg: e })}
              placeholder="JMBG"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Pozicija</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ pozicija: e })}
              placeholder="Pozicija"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">E-mail</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ email: e })}
              placeholder="E-mail"
            />
          </div>
          <div className="flex justify-between items-center">
            <div className="w-[100px]">Telefon</div>
            <TextField
              className="grow"
              onChange={(e) => setForm({ br_telefon: e })}
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
