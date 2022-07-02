import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import { getMarginTransactions } from "../../clients/marginClient";
import Table from "../common/Table";
import numeral from "numeral";
import moment from "moment";

function MarginTransactionModal(props) {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    function fetchData() {
        getMarginTransactions().then(setTransactions)
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function renderRows() {
        const rows = []
        transactions.map(t => [
            rows.push([
                moment(t["datumVreme"]).format("DD.MM.YYYY HH:mm"),
                t['kapitalType'],
                toCurrency(t['iznos']),
                toCurrency(t['kredit']),
                toCurrency(t['maintenanceMargin']),
                t['opis']
            ])
        ])
        return rows
    }

    return (
        <Modal className="min-w-[1100px]" id="view-margin-modal" title="Maržne transakcije (USD)" onClose={props.onClose}>
            <Table headings={['Datum', 'Tip Kapitala', 'Iznos', 'Kredit', 'M. Margin', 'Opis']} rows={renderRows()} pagination/>
        </Modal>
    )
}

MarginTransactionModal.propTypes = {
    onClose: PropTypes.func,
}

export default MarginTransactionModal