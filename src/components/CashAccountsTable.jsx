import React, {useEffect, useState} from "react"
import {useDispatch, useSelector} from "react-redux";
import {
    getAccountCacheStateAgent,
    getAccountCashStateSupervisor,
    getAccountTransactions
} from "../clients/accountClient";
import Table from "./common/Table"
import Modal from "./common/Modal"
import {isAgent, isSupervisor} from "../utils";
import moment from "moment";
import Stats from "./common/Stats";
import {addTransactionsAction} from "../redux/actions";

function CashAccountsTable() {
    const dispatch = useDispatch()
    const user = useSelector(state => state.app.user);
    const cashAccount = useSelector(state => state.app.transactions);
    const [agentLimits, setAgentLimits] = useState(null);
    const [selected, setSelected] = useState(null);
    const [transactions, setTransactions] = useState([]);

    async function fetchCashAccountData() {
        if (isSupervisor(user)) {
            dispatch(addTransactionsAction(await getAccountCashStateSupervisor()))
        }
        if (isAgent(user)) {
            setAgentLimits(await getAccountCacheStateAgent())
        }
    }

    async function fetchTransactions() {
        const t = await getAccountTransactions(selected[0])
        setTransactions(t)
    }

    function cashAccountToTableRow() {
        let tableRows = [];
        cashAccount.map(item => {
            tableRows.push([
                item['kodValute'],
                Number.parseFloat(item['ukupno']).toFixed(2),
                Number.parseFloat(item['rezervisano']).toFixed(2),
                Number.parseFloat(item['raspolozivo']).toFixed(2),
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
                        Number.parseFloat(item['uplata']).toFixed(2),
                        Number.parseFloat(item['isplata']).toFixed(2),
                        Number.parseFloat(item['rezervisano']).toFixed(2),
                        Number.parseFloat(item['rezervisanoKoristi']).toFixed(2),
                    ]
                )
            })
            return tableRows
        }

        return (
            <div>
                <Table
                    headings={["Datum", "Korisnik", "Opis", "Valuta", "Uplata", "Isplata", "Rezervisano", "Koristi"]}
                    rows={transactionsToTableRow()} pagination paginationGroupSize={10}/>
            </div>
        )
    }

    function renderAgent() {
        function prepareStats() {
            const list = []
            if (!agentLimits) return list

            for (const [key, value] of Object.entries(agentLimits)) {
                list.push({text: key, stat: value})
            }
            return list
        }

        return (
            <>
                <hr className="mb-5"/>
                <Stats stats={prepareStats()}/>
            </>
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
            {isSupervisor(user) &&
                <Table headings={['Valuta', 'Ukupno', 'Rezervisano', 'Raspoloživo']} rows={cashAccountToTableRow()}
                       clickable onClick={setSelected}/>}
            {isAgent(user) && renderAgent()}
            {!!selected &&
                <Modal visible title={`Transakcije ${selected[0]}`} onClose={handleCloseModal}
                       className="min-w-[1000px]">
                    {renderModalContent()}
                </Modal>
            }
        </>
    )
}

export default CashAccountsTable