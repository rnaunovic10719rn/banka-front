import React, { useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { performPayment } from "../../clients/capital";
import Alert from "../../components/common/Alert";
import Block from "../../components/common/Block";

export default function PaymentPage() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
      valutaOznaka: "",
      iznos: 0
  });

  function handleChange(e) {
    setForm({ ...form, ...e });
  }

  async function handleSubmit() {
    try {
      const tmp = {
        "opis": form.iznos >= 0 ? "Uplata sredstava" : "Isplata sredstava",
        "valutaOznaka": form.valutaOznaka,
        "uplata": form.iznos >= 0 ? form.iznos : 0,
        "isplata": form.iznos < 0 ? -1*form.iznos : 0,
        "rezervisano": 0,
        "lastSegment": false,
        "type": "NOVAC"
      };
      console.log(tmp);
      await performPayment(tmp);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div>
        {error && (
          <Alert
            design="danger"
            text="Greska pri uplati/isplati"
            onDismiss={() => setError(null)}
          ></Alert>
        )}
        <Block title="Uplata/Isplata sredstava">
          <div className="flex flex-col gap-3">
            <TextField
              className={"max-w-[300px]"}
              label="Iznos"
              onChange={(e) => handleChange({ iznos: e })}
            />
            <TextField
                className={"max-w-[300px]"}
                label="Valuta"
                placeholder="RSD"
                onChange={(e) => handleChange({ valutaOznaka: e })}
              /> 
            <div className="flex flex-row gap-3">
              
            </div>
            <div className="flex flex-row gap-3">
              <Button label="Realizuj" type="submit" onClick={handleSubmit} />
            </div>
          </div>
        </Block>
    </div>
  );
}
