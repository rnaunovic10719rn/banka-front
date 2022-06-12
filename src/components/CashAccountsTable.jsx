import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import { getAccountCacheStateAgent, getAccountCashStateSupervisor, getAccountTransactions } from "../clients/accountClient";
import Table from "./common/Table"
import Modal from "./common/Modal"
import { BANK_POSITIONS } from "../utils";

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

    function cashAccountToTableRow() {
        let tableRows = [];
        cashAccount.map(item => {
            tableRows.push([item['kodValute'], item['ukupno'], item['rezervisano'], item['raspolozivo']])
        })
        return tableRows;
    }

    function renderModalContent() {
        if (transactions.length === 0) {
            return (
                <div>LOADING</div>
            )

        }

        return (
            <div>
                LOADED
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
                <Modal visible title={selected[0]} onClose={handleCloseModal}>
                    {renderModalContent()}
                </Modal>
            }
        </>
    )
}

export default CashAccountsTable