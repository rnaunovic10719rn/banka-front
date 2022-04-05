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

    function handleSubmit(e) {
        e.preventDefault()
    }

    function renderStocks() {
        return (
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <TextField placeholder="Simbol (npr. AAPL)" />
                <div className="flex gap-3">
                    <RadioGroup options={['Kupovina', 'Prodaja']} onChange={() => { }} />
                    <TextField className="grow" placeholder="Kolicina" />
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