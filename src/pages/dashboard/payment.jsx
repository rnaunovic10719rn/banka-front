import React, { useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { performPayment } from "../../clients/capital";
import Alert from "../../components/common/Alert";

export default function PaymentPage() {
  const [error, setError] = useState(null);
  const [form, setForm] = useState({
    brojRacuna: "",
    iznos: "",
    opis: "",
    valutaOznaka: "",
  });

  function handleChange(e) {
    setForm({ ...form, ...e });
  }

  async function handleSubmit() {
    try {
      console.log(form);
      await performPayment(form);
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div>
      <div className="w-[290px]">
        {error && (
          <Alert
            design="danger"
            text="Greska pri uplati/isplati"
            onDismiss={() => setError(null)}
          ></Alert>
        )}
        <Card title="Uplata/Isplata sredstava">
          <div className="flex flex-col gap-3">
            <TextField
              label="Iznos"
              placeholder="Iznos"
              onChange={(e) => handleChange({ iznos: e })}
            />
            <div className="flex flex-row gap-16">
              <Select
                options={["RSD", "EUR"]}
                onChange={(e) => handleChange({ valutaOznaka: e })}
              />
              <Button label="Register" type="submit" onClick={handleSubmit} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
