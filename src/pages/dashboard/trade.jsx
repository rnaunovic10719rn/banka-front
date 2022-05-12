import React, { useEffect, useState } from "react";
import Card from "../../components/common/Card";
import TextField from "../../components/common/TextField";
import RadioGroup from "../../components/common/RadioGroup";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { getUserId } from "../../clients/client";
import { buySellStocks } from "../../clients/stocks";
import Alert from "../../components/common/Alert";

const TABS = {
  STOCKS: "Stocks",
  FOREX: "Forex",
  FUTURES: "Futures",
};

export default function TradePage() {
  const [form, setForm] = useState({
    symbol: "",
    userId: 1,
    hartijaOdVrednostiTip: "Akcija",
    kolicina: 0,
    akcija: "BUY",
    limitValue: 0,
    stopValue: 0,
    allOrNoneFlag: false,
    marginFlag: false,
  });

  const [forexForm, setForexForm] = useState({
    from: "",
    to: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [id, setId] = useState(null);

  async function getId() {
    setId(await getUserId());
  }

  const onChange = (event) => {
    setForm({ ...form, ...event });
  };

  const onForexChange = (event) => {
    setForexForm({ ...forexForm, ...event });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const msg = await buySellStocks(form);
      setSuccess(true);
    } catch (e) {
      setError(true);
    }
  }

  useEffect(() => {
    getId();
    onChange({ userId: id });
  }, []);

  useEffect(() => {
    setForm({ ...form, symbol: forexForm.from + " " + forexForm.to });
  }, [forexForm]);

  function renderStocks() {
    return (
      <>
        {error && (
          <Alert
            design="danger"
            text="Neuspesna kupovina"
            onDismiss={() => setError(null)}
          ></Alert>
        )}
        {success && (
          <Alert
            design="success"
            text="Uspesna kupovina"
            onDismiss={() => setSuccess(null)}
          ></Alert>
        )}
        <div className="flex gap-3">
          <div>
            <div className="pb-1">Hartija vrednosti</div>
            <div className="flex">
              <Select
                className="grow"
                onChange={(e) => onChange({ hartijaOdVrednostiTip: e })}
                options={["Akcija", "Forex", "Futures Ugovori"]}
                defValue="Akcija"
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {(form.hartijaOdVrednostiTip == "Akcija" ||
            form.hartijaOdVrednostiTip == "Futures Ugovori") && (
            <div className="flex gap-3">
              <div>
                <div className="pb-1">Simbol</div>
                <div className="flex">
                  <TextField
                    placeholder="npr. AAPL"
                    className="grow"
                    onChange={(e) => onChange({ symbol: e })}
                  />
                </div>
              </div>
            </div>
          )}
          {form.hartijaOdVrednostiTip == "Forex" && (
            <div>
              <div className="flex gap-4">
                <div>
                  <div className="pb-1">From</div>
                  <TextField
                    placeholder="npr. USD"
                    onChange={(e) => onForexChange({ from: e })}
                  />
                </div>
                <div>
                  <div className="pb-1">To</div>
                  <TextField
                    placeholder="npr. RSD"
                    onChange={(e) => onForexChange({ to: e })}
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <div>
                  <div className="pb-1">Kolicina</div>
                  <div className="flex">
                    <TextField
                      className="grow"
                      value={form["kolicina"]}
                      onChange={(e) => onChange({ kolicina: e })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {(form.hartijaOdVrednostiTip == "Akcija" ||
            form.hartijaOdVrednostiTip == "Futures Ugovori") && (
            <div className="flex gap-3">
              <div>
                <div className="pb-1">Kolicina</div>
                <div className="flex gap-3">
                  <TextField
                    className="grow"
                    value={form["kolicina"]}
                    onChange={(e) => onChange({ kolicina: e })}
                  />
                  <RadioGroup
                    options={["BUY", "SELL"]}
                    onChange={(e) => onChange({ akcija: e })}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-3">
            <div>
              <div className="pb-1">Limit</div>
              <TextField
                onChange={(e) => onChange({ limitValue: e })}
                value={form["limitValue"]}
              />
            </div>
            <div>
              <div className="pb-1">Stop</div>
              <TextField
                onChange={(e) => onChange({ stopValue: e })}
                value={form["stopValue"]}
              />
            </div>
          </div>
          <div>
            <div className="text-xs">
              * Ako su oba 0 onda se radi Market Order
            </div>
            <div className="text-xs">
              * Ako je jedan stavljen, a drugi 0, radi se šta ste odabrail
              (Limit ili Stop Order)
            </div>
            <div className="text-xs">
              * Ako su oba stavljena, radi se Stop-Limit order
            </div>
          </div>
          <Checkbox
            label="All or none"
            onChange={(e) => onChange({ allOrNoneFlag: e })}
            value={form["allOrNoneFlag"]}
          />
          <div>
            <Button label="Naruci" type="submit" />
          </div>
        </form>
      </>
    );
  }

  return (
    <div>
      <Card title="Trgovina" className="w-1/2">
        {renderStocks()}
      </Card>
    </div>
  );
}
