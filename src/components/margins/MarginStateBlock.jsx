import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import { getMarginState } from "../../clients/marginClient";
import Table from "../common/Table";
import Button from "../common/Button";
import MarginAddTransactionModal from "./MarginAddTransactionModal";
import MarginTransactionModal from "./MarginTransactionModal";
import numeral from "numeral"

function MarginStateBlock() {
    const [marginState, setMarginState] = useState([])
    const [createTransactionModal, setCreateTransactionModal] = useState(false)
    const [viewTransactionsModal, setViewTransactionsModal] = useState(false)

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginState().then(setMarginState)
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function createRows() {
        const rows = []
        marginState.map(m => {
            rows.push([
                m['kodValute'],
                toCurrency(m['ukupno']),
                toCurrency(m['kredit']),
                toCurrency(m['maintenanceMargin']),
                (m['marginCall']) ? "DA" : "Ne"
            ])
        })
        return rows
    }

    function renderCta() {
        return (
            <Button label="Uplata/Isplata" onClick={() => setCreateTransactionModal(true)} design="secondary"/>
        )
    }

    return (
        <div id="margin-account-table">
            <Block title="Maržni račun" cta={renderCta()}>
                <Table

                    headings={['Valuta', 'Ukupno', 'Kredit', 'Maintenance Margin', 'Margin Call']}
                    rows={createRows()}
                    onClick={() => setViewTransactionsModal(true)}
                    clickable
                />
                {createTransactionModal &&
                    <MarginAddTransactionModal onClose={() => setCreateTransactionModal(false)} onSuccess={fetchData}/>}
                {viewTransactionsModal &&
                    <MarginTransactionModal onClose={() => setViewTransactionsModal(false)}/>}
            </Block>
        </div>
    )
}

export default MarginStateBlock