import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getAccountCacheStateAgent, getAccountCashStateSupervisor, getAccountTransactions } from "../clients/accountClient";
import Table from "./common/Table"
import Modal from "./common/Modal"
import { BANK_POSITIONS } from "../utils";
import moment from "moment";
import numeral from "numeral"

function CashAccountsTable() {
    const user = useSelector(state => state.app.user);
    const [cashAccount, setCashAccount] = useState([]);
    const [selected, setSelected] = useState(null);
    const [transactions, setTransactions] = useState([]);

    async function fetchCashAccountData() {
        let tempCashAccount = []
        const supervisorRoles = [BANK_POSITIONS.ADMIN_GL, BANK_POSITIONS.ROLE_SUPERVISOR]
        if (supervisorRoles.includes(user['role']['name'])) {
            tempCashAccount = await getAccountCashStateSupervisor();
        } else if (user['role']['name'] === BANK_POSITIONS.ROLE_AGENT) {
            tempCashAccount = await getAccountCacheStateAgent();
        }
        setCashAccount(tempCashAccount)
    }

    async function fetchTransactions() {
        const t = await getAccountTransactions(selected[0])
        console.log("transactions", t)
        setTransactions(t)
    }

    function formatNumber(num) {
        return numeral(num).format("0.[000]")
    }

    function cashAccountToTableRow() {
        let tableRows = [];
        cashAccount.map(item => {
            tableRows.push([
                item['kodValute'],
                formatNumber(item['ukupno']),
                formatNumber(item['rezervisano']),
                formatNumber(item['raspolozivo']),
            ])
        })
        return tableRows;
    }

    function renderModalContent() {
        function transactionsToTableRow() {
            let tableRows = []
            transactions.map(item => {
                tableRows.push(
                    [
                        moment(item['datumVreme']).format("DD.MM.YYYY HH:mm"),
                        item['username'],
                        item['opis'],
                        item['valuta']['kodValute'],
                        formatNumber(item['uplata']),
                        formatNumber(item['isplata']),
                        formatNumber(item['rezervisano']),
                        formatNumber(item['rezervisanoKoristi']),
                    ]
                )
            })
            return tableRows
        }

        return (
            <div>
                <Table headings={["Datum", "Korisnik", "Opis", "Valuta", "Uplata", "Isplata", "Rezervisano", "Rezervisano koristi"]} rows={transactionsToTableRow()} pagination paginationGroupSize={10}/>
            </div>
        )
    }

    function handleCloseModal() {
        setSelected(null)
        setTransactions([])
    }

    useEffect(() => {
        if (!user) return;
        fetchCashAccountData()
    }, [user])

    useEffect(() => {
        if (!selected) return;
        fetchTransactions();
    }, [selected])

    return (
        <>
            <Table headings={['Valuta', 'Ukupno', 'Rezervisano', 'Raspolozivo']} rows={cashAccountToTableRow()} clickable onClick={setSelected} />
            {!!selected &&
                <Modal visible title={`Transakcije ${selected[0]}`} onClose={handleCloseModal}  className="min-w-[1000px]">
                    {renderModalContent()}
                </Modal>
            }
        </>
    )
}

export default CashAccountsTable