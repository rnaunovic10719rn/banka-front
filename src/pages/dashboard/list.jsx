
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUserAction, getUsersAction, getUserId, resetLimitUser } from "../../clients/client"
import Table from '../../components/common/Table'
import Button, { BUTTON_DESIGN } from '../../components/common/Button'
import { URLS } from '../../routes'
import UserModal from "../../components/UserModal"
import Block from "../../components/common/Block"

export default function ListPage() {
    let navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [rows, setRows] = useState([])
    const [id, setId] = useState(null)
    const [selectedUser, setSelectedUser] = useState(null)
    const [isSelected, setIsSelected] = useState(false)

    async function getId() {
        setId(await getUserId());
    }

    async function getUsers() {
        setUsers(await getUsersAction())
    }

    async function deleteUser(id) {
        await deleteUserAction(id);
        setSelectedUser(null);
        window.location.reload();
    }

    async function resetLimit(id) {
        await resetLimitUser(id);
    }

    async function enableUser(id) {
        //TODO: implementirati enable user action
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
            r.push([
                u['id'],
                u['username'],
                u['ime'] + " " + u['prezime'],
                u['jmbg'],
                u['email'],
                u['role']['name'],
                <Button design="inline" onClick={() => {
                    setSelectedUser(u);
                    setIsSelected(true);
                }} label="Edit" />,
                u['id'] != id ?
                    u['aktivan'] ?
                        <Button design="inline" onClick={() => deleteUser(u['id'])} label="Disable" /> :
                        <Button design="inline" onClick={() => enableUser(u['id'])} label="Enable" />

                    : null ,
                <Button design="inline" onClick={() => resetLimit(u['id'])} label="Refresh" />
            ]);
        })
        setRows(r)
    }, [id, users])

    return (
        <Block className="flex flex-col gap-4" title="Spisak zaposlenih" cta={<Button design={BUTTON_DESIGN.SECONDARY} label="Dodaj zaposlenog" onClick={() => navigate("/" + URLS.DASHBOARD.LIST.NEW_USER)} />}>
            <Table headings={['ID', 'Username', 'Ime i prezime', 'JMBG', 'Email', 'Pozicija', 'Opcije','','Refresh']} rows={rows} />
            {selectedUser != null && <UserModal visible={isSelected} id={selectedUser.id} user={selectedUser} onClose={() => {
                setSelectedUser(null);
                setIsSelected(false);
            }}
                onChange={() => {
                    setSelectedUser(null);
                    setIsSelected(false);
                    window.location.reload();
                }}
            />}
        </Block>
    )
}