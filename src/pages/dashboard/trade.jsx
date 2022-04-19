import React, { useState } from "react"
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import RadioGroup from "../../components/common/RadioGroup"
import Checkbox from "../../components/common/Checkbox"
import Button from "../../components/common/Button"
import Select from "../../components/common/Select"
import { getUserId } from "../../clients/client"
import { buySellStocks } from "../../clients/stocks"
import Alert from "../../components/common/Alert"

const TABS = {
    STOCKS: "Stocks",
    FOREX: "Forex",
    FUTURES: "Futures",
}

export default function TradePage() {

    const [form, setForm] = useState({
        symbol: "",
        userId: 1,
        hartijaOdVrednostiTip: "AKCIJA",
        kolicina: 0,
        akcija: "BUY",
        limitValue: 0,
        stopValue: 0,
        allOrNoneFlag: false,
        marginFlag: false
    });

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const onChange = (event) => {
        setForm({ ...form, ...event });
      };

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const id = await getUserId()
            onChange({userId: id})
            const msg = await buySellStocks(form);
            setSuccess(true);
        } catch (e) {
            setError(true);
        }
    }

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
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <TextField placeholder="Simbol (npr. AAPL)" onChange={(e) => onChange({symbol: e})} value={form['symbol']}/>
                <div className="flex gap-3">
                    <RadioGroup options={["BUY", "SELL"]} onChange={(e) => onChange({akcija: e})} />
                    <TextField className="grow" placeholder="Kolicina" value={form["kolicina"]} onChange={(e) => onChange({kolicina: e})}  />
                </div>
                <Select
                className="grow"
                onChange={(e) => onChange({hartijaOdVrednostiTip: e})}
                options={["AKCIJA", "FOREX", "FUTURES_UGOVOR"]}
                defValue="AKCIJA"
                />
                <div className="flex gap-4">
                    <TextField placeholder="Limit" onChange={(e) => onChange({limitValue: e})} value={form["limitValue"]}/>
                    <TextField placeholder="Stop" onChange={(e) => onChange({stopValue: e})} value={form["stopValue"]}/>
                </div>
                <Checkbox label="All or none" onChange={(e) => onChange({allOrNoneFlag: e})} value={form["allOrNoneFlag"]}/>
                <Checkbox label="Kniziti na margins nalog" onChange={(e) => onChange({marginFlag: e})} value={form["marginFlag"]}/>
                <div>
                    <Button label="Naruci" type="submit" />
                </div>
            </form>
            </>
        )
    }

    return (
        <div>
            <Card title="Kupovina akcija" className="w-1/2">
                {renderStocks()}
            </Card>
        </div>
    )
}