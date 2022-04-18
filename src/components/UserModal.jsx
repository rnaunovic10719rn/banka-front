import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"
import { editUserByIdAction } from "../clients/client";
import { BANK_POSITIONS } from "../pages/dashboard/newuser";
import TextField from "../components/common/TextField";
import Button from "../components/common/Button";
import Select from "../components/common/Select";

function UserModal(props) {
    const [form, setForm] = useState({
        ime: "",
        prezime: "",
        email: "",
        jmbg: "",
        br_telefona: "",
        pozicija: BANK_POSITIONS.ADMIN,
    })

    async function handleSubmit() {
        try{
            await editUserByIdAction(props.id, form);
        }
        catch(e) {

        }
    }

    function renderDetails() {

        return (
            <div className="flex flex-col gap-5">
                <TextField placeholder="Ime" onChange={(e) => setForm({...form, ime: e })} />
                <TextField placeholder="Prezime" onChange={(e) => setForm({...form, prezime: e })} />
                <TextField placeholder="E-mail" onChange={(e) => setForm({...form, email: e })} />
                <TextField placeholder="JMBG" onChange={(e) => setForm({...form, jmbg: e })} />
                <TextField placeholder="Broj telefona" onChange={(e) => setForm({...form, br_telefona: e })} />
                <Select options={[BANK_POSITIONS.ADMIN, BANK_POSITIONS.ADMIN_GL]} onChange={(e) => setForm({...form, pozicija: e })} />
                <Button label="Register" type="submit" onClick={() => handleSubmit()} />
            </div>
        )
    }

    return (
        <Modal visible={true} onClose={props.onClose} title={props.ticker} className="max-w-[900px]">
            <div>
                {renderDetails()}
            </div>
        </Modal>
    )
}

UserModal.propTypes = {
    id: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default UserModal