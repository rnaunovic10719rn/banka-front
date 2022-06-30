
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteUserAction, enableUserAction, getUsersAction, getUserId, resetLimitUser } from "../../clients/client"
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
        setSelectedUser(null);
        window.location.reload();
    }

    async function enableUser(id) {
        await enableUserAction(id);
        setSelectedUser(null);
        window.location.reload();
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
                u['ime'] != null && u['prezime'] != null ? u['ime'] + " " + u['prezime'] : "",
                u['jmbg'],
                u['email'],
                u['role']['name'],
                <div class="text-right">{u['limit'] != null ? parseFloat(u['limit']).toFixed(2) : "Neograničeno"}</div>,
                <div class="text-right">{u['limitUsed'] != null ? parseFloat(u['limitUsed']).toFixed(2) : ""}</div>,
                <Button design="inline" onClick={() => {
                    setSelectedUser(u);
                    setIsSelected(true);
                }} label="Izmeni" />,
                u['id'] != id ?
                    u['aktivan'] ?
                        <Button design="inline" onClick={() => deleteUser(u['id'])} label="Deaktiviraj" /> :
                        <Button design="inline" onClick={() => enableUser(u['id'])} label="Aktiviraj" />

                    : null ,
                u['role']['name'] === "ROLE_AGENT" ? <Button design="inline" onClick={() => resetLimit(u['id'])} label="Resetuj limit" /> : null
            ]);
        });

        r.sort((a, b) => (a[0] > b[0]) ? 1 : -1);

        setRows(r)
    }, [id, users])

    return (
        <Block className="flex flex-col gap-4" title="Spisak zaposlenih" cta={<Button design={BUTTON_DESIGN.SECONDARY} label="Dodaj zaposlenog" onClick={() => navigate("/" + URLS.DASHBOARD.LIST.NEW_USER)} />}>
            <Table headings={['ID', 'Ime i prezime', 'JMBG', 'Email', 'Pozicija', 'Limit', 'Limit preostali', 'Opcije','','']} rows={rows} />
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