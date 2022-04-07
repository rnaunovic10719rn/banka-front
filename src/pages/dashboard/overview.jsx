import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Tab from "../../components/common/Tab"
import Table from "../../components/common/Table"
import { URLS } from "../../routes"

const TABS = {
    STOCKS: "Stocks",
    FOREX: "Forex",
    FUTURES: "Futures",
}

export default function OverviewPage() {
    let navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(TABS.STOCKS)

    function renderFutures() {
        const rows = new Array(15).fill(
            [
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
            ],
        )

        return (
            <Table
                headings={[
                    'Oznaka',
                    'Cena',
                    'Promena iznosa',
                    'Opseg',
                    'Ugovorena velicina',
                    'Ugovorena jedinica',
                    'Margina odrzavanja',
                    'Datum poravnanja',
                ]}
                rows={rows}
                pagination
            />
        )
    }

    function renderForex() {
        const rows = new Array(15).fill(
            [
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
            ],
        )

        return (
            <Table
                headings={[
                    'Oznaka',
                    'Cena',
                    'Promena iznosa',
                    'Opseg',
                    'Osnovna valuta',
                    'Navedena valuta',
                    'Ugovorena velicina',
                ]}
                rows={rows}
                pagination
            />
        )
    }

    function renderStocks() {
        const rows = new Array(15).fill(
            [
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
                'placeholder',
            ],
        )

        return (
            <Table
                headings={[
                    'Oznaka',
                    'Cena',
                    'Promena iznosa',
                    'Opseg',
                    'Naziv berze',
                    'Oznaka berze',
                    'Drzava',
                    'Valuta',
                    'Vremenska zona',
                ]}
                rows={rows}
                pagination
                clickable
                onClick={() => navigate("123", { id: "test" })}
            />
        )
    }

    return (
        <div>
            <Tab tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]} onChange={(e) => setActiveTab(e)} />
            {activeTab === TABS.STOCKS && renderStocks()}
            {activeTab === TABS.FOREX && renderForex()}
            {activeTab === TABS.FUTURES && renderFutures()}
        </div>
    )
}