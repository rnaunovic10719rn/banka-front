import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "../common/Modal";
import { getMarginCapitalForType, getMarginCapitalForTypeDetails } from "../../clients/marginClient";
import Table from "../common/Table";
import Block from "../common/Block";

function MarginKapitalDetails(props) {
    const [items, setItems] = useState([])
    const [selected, setSelected] = useState(null)
    const [modal, setModal] = useState(false)
    const [details, setDetails] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (modal) {
            fetchModalData()
        }
    }, [modal])

    function fetchData() {
        getMarginCapitalForType(props.type).then(setItems)
    }

    function fetchModalData() {
        getMarginCapitalForTypeDetails(props.type, selected[0]).then(setDetails)
    }

    function createRows() {
        const rows = []
        items.map(i => rows.push([
            i['id'],
            i['berza'],
            i['kodValute'],
            i['oznakaHartije'],
            i['kupljenoZa'],
            i['vrednost'],
            i['profit'],
        ]))
        return rows
    }

    function handleOpenModal(e) {
        console.log(e)
        setSelected(e)
        setModal(true)
    }

    function handleCloseModal() {
        setSelected(null)
        setModal(false)
    }

    function renderModal() {
        function createRows() {
            const rows = []
            details.map(d => {
                rows.push([
                    d['tipOrdera'],
                    d['cena'],
                    d['kolicina'],
                    d['ukupno'],
                    new Date(d['datum']).toLocaleDateString(),
                ])
            })
            return rows
        }

        return (
            <Modal onClose={handleCloseModal} id="modal" title={`Istorija narudzbina za ${selected[3]}`}>
                <Table headings={['Tip', 'Cena', 'Kolicina', 'Ukupno', 'Datum']} rows={createRows()}/>
            </Modal>
        )
    }

    return (
        <Block title="Margine">
            <Table
                headings={['ID', 'Berza', 'Valuta', 'Oznaka', 'Kupljeno za', 'Vrednost', 'Profit']}
                rows={createRows()}
                pagination
                onClick={handleOpenModal}
                clickable
            />
            {modal && renderModal()}
        </Block>
    )
}

MarginKapitalDetails.propTypes = {
    type: PropTypes.string,
    onClose: PropTypes.func,
}

export default MarginKapitalDetails