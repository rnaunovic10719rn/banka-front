import React, { useState } from "react"
import Card from "../../components/common/Card"
import TextField from "../../components/common/TextField"
import RadioGroup from "../../components/common/RadioGroup"
import Checkbox from "../../components/common/Checkbox"
import Button from "../../components/common/Button"
import Select from "../../components/common/Select"
import { getUserId } from "../../clients/client"
import { buySellStocks } from "../../clients/stocks"

const TABS = {
    STOCKS: "Stocks",
    FOREX: "Forex",
    FUTURES: "Futures",
}

export default function TradePage() {

    const [form, setForm] = useState({
        user_id: 1,
        symbol: "",
        hartija_od_vrednosti_tip: "AKCIJA",
        kolicina: 0,
        akcija: "BUY",
        limitValue: 0,
        stopValue: 0,
        allOrNoneFlag: false,
        marginFlag: false
    });

    const onChange = (event) => {
        setForm({ ...form, ...event });
      };

    async function handleSubmit(e) {
        e.preventDefault()
        const id = await getUserId()
        onChange({user_id: id})
        console.log(form);

        buySellStocks(form);
    }

    function renderStocks() {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <TextField placeholder="Simbol (npr. AAPL)" onChange={(e) => onChange({symbol: e})} value={form['symbol']}/>
                <div className="flex gap-3">
                    <RadioGroup options={["BUY", "SELL"]} onChange={(e) => onChange({akcija: e})} />
                    <TextField className="grow" placeholder="Kolicina" value={form["kolicina"]} />
                </div>
                <Select
                className="grow"
                onChange={(e) => onChange({hartija_od_vrednosti_tip: e})}
                options={["AKCIJA", "FOREX", "FUTURES_UGOVOR"]}
                defValue="AKCIJA"
                />
                <div className="flex gap-4">
                    <TextField placeholder="Limit" className="w-48" onChange={(e) => onChange({limitValue: e})} value={form["limitValue"]}/>
                    <TextField placeholder="Stop" className="w-48" onChange={(e) => onChange({stopValue: e})} value={form["stopValue"]}/>
                </div>
                <Checkbox label="All or none" onChange={(e) => onChange({allOrNoneFlag: e})} value={form["allOrNoneFlag"]}/>
                <Checkbox label="Kniziti na margins nalog" onChange={(e) => onChange({marginFlag: e})} value={form["marginFlag"]}/>
                <div>
                    <Button label="Naruci" type="submit" />
                </div>
            </form>
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