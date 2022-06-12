import React, { useEffect, useRef, useState } from "react";
import Card from "../../components/common/Card";
import TextField, {
  VALIDATION_PATTERN,
} from "../../components/common/TextField";
import RadioGroup from "../../components/common/RadioGroup";
import Checkbox from "../../components/common/Checkbox";
import Button from "../../components/common/Button";
import Select from "../../components/common/Select";
import { getUserId } from "../../clients/client";
import { buySellStocks } from "../../clients/stocks";
import { Store } from "react-notifications-component";
import Block from "../../components/common/Block";
import Form from "../../components/common/Form";

const TYPE = {
  STOCKS: "Stocks",
  FOREX: "Forex",
  FUTURES: "Futures",
};

export default function TradePage() {
  const [formValid, setFormValid] = useState(false);
  const [securityType, setSecurityType] = useState(TYPE.STOCKS);
  const [form, setForm] = useState({
    symbol: "",
    hartijaOdVrednostiTip: TYPE.STOCKS,
    kolicina: null,
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
      console.log(form);
      const msg = await buySellStocks(form);
      Store.addNotification({
        title: "",
        message: `Uspesno ste izvrsili trgovinu.`,
        type: "success",
        container: "top-right",
      });
    } catch (e) {
      Store.addNotification({
        title: "Doslo je do greske",
        message: `${e}`,
        type: "danger",
        container: "top-right",
      });
    }
  }

  useEffect(() => {
    getId();
    onChange({ userId: id });
  }, []);

  useEffect(() => {
    setForm({ ...form, symbol: forexForm.from + " " + forexForm.to });
  }, [forexForm]);

  useEffect(() => {
    switch (securityType) {
      case TYPE.STOCKS:
        setForm({...form, hartijaOdVrednostiTip: "AKCIJA"})
        break;
      case TYPE.FOREX:
        setForm({...form, hartijaOdVrednostiTip: "FOREX"})
        break;
      case TYPE.FUTURES:
        setForm({...form, hartijaOdVrednostiTip: "FUTURES_UGOVOR"})
        break;
    }
  }, [securityType]);

  function renderStocks() {
    return (
      <>
        <div className="flex">
          <TextField
            label="Simbol"
            placeholder="npr. AAPL"
            className="grow"
            onChange={(e) => onChange({ symbol: e })}
            required
          />
        </div>
        <div className="flex items-end gap-3">
          <TextField
            label="Kolicina"
            className="grow"
            value={form["kolicina"]}
            onChange={(e) => onChange({ kolicina: e })}
            validation={VALIDATION_PATTERN.NUMBER}
            required
          />
          <RadioGroup
            options={["BUY", "SELL"]}
            onChange={function (e) {
              onChange({ akcija: e });
            }}
          />
        </div>
      </>
    );
  }

  function renderForex() {
    return (
      <>
        <div className="flex gap-4">
          <TextField
            label="From"
            placeholder="npr. USD"
            onChange={(e) => onForexChange({ from: e })}
            required
          />
          <TextField
            label="To"
            placeholder="npr. RSD"
            onChange={(e) => onForexChange({ to: e })}
            required
          />
        </div>
        <div className="flex">
          <TextField
            label="Kolicina"
            className="grow"
            value={form["kolicina"]}
            onChange={(e) => onChange({ kolicina: e })}
            validation={VALIDATION_PATTERN.NUMBER}
            required
          />
        </div>
      </>
    );
  }

  function renderShared() {
    return (
      <>
        <div className="flex gap-3">
          <TextField
            label="Limit"
            onChange={(e) => onChange({ limitValue: e })}
            value={form["limitValue"]}
            validation={VALIDATION_PATTERN.NUMBER}
            required
          />
          <TextField
            label="Stop"
            onChange={(e) => onChange({ stopValue: e })}
            value={form["stopValue"]}
            validation={VALIDATION_PATTERN.NUMBER}
            required
          />
        </div>
        <div>
          <div className="text-xs">
            * Ako su oba 0 onda se radi Market Order
          </div>
          <div className="text-xs">
            * Ako je jedan stavljen, a drugi 0, radi se šta ste odabrail (Limit
            ili Stop Order)
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
      </>
    );
  }

  function renderForm() {
    return (
      <>
        {(securityType === TYPE.STOCKS ||
          securityType === TYPE.FUTURES) &&
          renderStocks()}
        {securityType === TYPE.FOREX && renderForex()}
        {renderShared()}
      </>
    );
  }

  return (
    <Block title="Trgovina">
      <Form onSubmit={handleSubmit} onValid={setFormValid}>
        <div className="flex flex-col gap-3">
          <Select
            label="Hartija vrednosti"
            className="grow"
            onChange={(e) => setSecurityType(e)}
            options={[TYPE.STOCKS, TYPE.FOREX, TYPE.FUTURES]}
            defValue={TYPE.STOCKS}
          />
          {securityType && renderForm()}
          <div>
            <Button label="Naruci" type="submit" disabled={!formValid} />
          </div>
        </div>
      </Form>
    </Block>
  );
}
