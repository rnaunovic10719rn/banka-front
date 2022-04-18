import React, { useState } from "react"
import Card from "../../components/common/Card"
import Tab from "../../components/common/Tab"
import TextField from "../../components/common/TextField"
import RadioGroup from "../../components/common/RadioGroup"
import Checkbox from "../../components/common/Checkbox"
import Button from "../../components/common/Button"

const TABS = {
    STOCKS: "Stocks",
    FOREX: "Forex",
    FUTURES: "Futures",
}

export default function TradePage() {
    const [activeTab, setActiveTab] = useState(TABS.STOCKS)

    const [form, setForm] = useState({
        userId: 1,
        symbol: "",
        hartijaOdVrednostiTip: "AKCIJA",
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
        onChange({userId: id})
        console.log(form);

        buySellStocks(form);
    }

    function renderStocks() {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <TextField placeholder="Simbol (npr. AAPL)" />
                <div className="flex gap-3">
                    <RadioGroup options={["BUY", "SELL"]} onChange={(e) => onChange({akcija: e})} />
                    <TextField className="grow" placeholder="Kolicina" value={form["kolicina"]} />
                </div>
                <Select
                className="grow"
                onChange={(e) => onChange({hartijaOdVrednostiTip: e})}
                options={["AKCIJA", "FOREX", "FUTURES_UGOVOR"]}
                defValue="AKCIJA"
                />
                <div className="flex gap-4">
                    <TextField placeholder="Limit" className="w-48" onChange={(e) => onChange({limitValue: e})} value={form["limitValue"]}/>
                    <TextField placeholder="Stop" className="w-48" onChange={(e) => onChange({stopValue: e})} value={form["stopValue"]}/>
                </div>
                <TextField placeholder="Tip" />
                <TextField placeholder="Limit" />
                <Checkbox label="Kniziti na margins nalog" />
                <div>
                    <Button label="Naruci" type="submit" />
                </div>
            </form>
        )
    }

    return (
        <div>
            <Card title="Kupovina akcija" className="w-1/2">
                <Tab tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]} onChange={(e) => setActiveTab(e)} />
                {activeTab === TABS.STOCKS && renderStocks()}
            </Card>
        </div>
    )
}