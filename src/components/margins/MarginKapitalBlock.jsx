import React, { useEffect, useState } from "react";
import Block from "../common/Block";
import { getMarginCapital } from "../../clients/marginClient";
import Table from "../common/Table";
import numeral from "numeral"
import { useNavigate } from "react-router-dom";

function MarginKapitalBlock() {
    const navigate = useNavigate();
    const [marginState, setMarginState] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginCapital().then(setMarginState)
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function createRows() {
        const rows = []
        marginState.map(m => {
            rows.push([
                m['kapitalType'],
                toCurrency(m['ukupno'])
            ])
        })
        return rows
    }

    function handleOnSelect(e) {
        navigate(`/capital/margin/${e[0]}`);
    }

    return (
        <Block title="Pregled kapitala">
            <Table
                headings={['Tip kapitala', 'Ukupno']}
                rows={createRows()}
                onClick={handleOnSelect}
                clickable
            />
        </Block>
    )
}

export default MarginKapitalBlock