
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUserAction, getUsersAction, getUserId } from "../../clients/client"
import Table from '../../components/common/Table'
import Button, { BUTTON_DESIGN } from '../../components/common/Button'
import { URLS } from '../../routes'

export default function ListPage() {
    let navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [rows, setRows] = useState([])
    const [id, setId] = useState(null);

    async function getId() {
        setId(await getUserId());
    }

    async function getUsers() {
        setUsers(await getUsersAction())
    }

    function deleteUser(id) {
        console.log(id);
        deleteUserAction(id);
    }

    useEffect(() => {
        getId()
        getUsers()
    }, [])

    useEffect(() => {
        if (users.length === 0) return
        if (id == null) return
        getId()
        let r = []
        users.map(u => {
            console.log(u);
            r.push([
                u['id'],
                u['username'],
                u['ime'] + " " + u['prezime'],
                u['jmbg'],
                u['email'],
                u['role']['name'],
                u['id'] != id ? <Button design="inline" onClick={() => deleteUser(u['id'])} label="Disable" /> : null
            ]);
        })
        setRows(r)
    }, [id, users])

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-indigo-500">Spisak svih zaposlenih</h1>
                <div>
                    <Button design={BUTTON_DESIGN.SECONDARY} label="Dodaj novog zaposlenog" onClick={() => navigate("/" + URLS.DASHBOARD.LIST.NEW_USER)} />
                </div>
            </div>
            <Table headings={['ID', 'Username', 'Ime i prezime', 'JMBG', 'Email', 'Pozicija', '']} clickable={true} rows={rows} />
        </div>
    )
}