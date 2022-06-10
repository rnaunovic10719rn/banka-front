import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal";
import {editUserByIdAction, getUserApi} from "../clients/client";
import { BANK_POSITIONS } from "../pages/dashboard/newuser";
import TextField from "../components/common/TextField";
import Button from "../components/common/Button";
import Select from "../components/common/Select";
import Checkbox from "./common/Checkbox";
import {useDispatch, useSelector} from "react-redux";
import {addUserAction} from "../redux/actions";
import {getUserSelector} from "../redux/selectors";


function UserModal(props) {

    const [form, setForm] = useState({
        ime: props.user ? props.user.ime : "",
        prezime: props.user ? props.user.prezime : "",
        email: props.user ? props.user.email : "",
        jmbg: props.user ? props.user.jmbg : "",
        brTelefon: props.user ? props.user.brTelefon : "",
        limit:props.user ? props.user.limit : "",
        pozicija: props.user ? props.user.role.name : BANK_POSITIONS.ADMIN,
        needsSupervisorPermission: props.user ? props.user.needsSupervisorPermission : false,
    })

  async function handleSubmit() {
    try {
      await editUserByIdAction(props.id, form);
      props.onChange();
    } catch (e) {}
  }




    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();

    async function getUser() {
        const response = await getUserApi();
        dispatch(addUserAction(response));
    }

    useEffect(() => {
        getUser();
    }, []);


    function renderDetails() {

        console.log(props.user);

        return (
            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">Ime</div>
                    <TextField className="grow" value={form.ime} onChange={(e) => setForm({ ...form, ime: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">Prezime</div>
                    <TextField className="grow" value={form.prezime} onChange={(e) => setForm({ ...form, prezime: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">E-mail</div>
                    <TextField className="grow" value={form.email} onChange={(e) => setForm({ ...form, email: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">JMBG</div>
                    <TextField className="grow" value={form.jmbg} onChange={(e) => setForm({ ...form, jmbg: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">Br. telefona</div>
                    <TextField className="grow" value={form.brTelefon} onChange={(e) => setForm({ ...form, brTelefon: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">Limit</div>
                    {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") &&
                        <TextField className="grow" value={form.limit} onChange={(e) => setForm({...form, limit: e})}/>}
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]">Pozicija</div>
                    <Select className="grow" options={[BANK_POSITIONS.ADMIN, BANK_POSITIONS.ADMIN_GL]} defValue={form.pozicija} onChange={(e) => setForm({ ...form, pozicija: e })} />
                </div>
                <div className="flex justify-between items-center">
                    <div className="w-[75px]"></div>
                    {user && (user["role"]["name"] == "ROLE_ADMIN" || user["role"]["name"] == "ROLE_SUPERVISOR") && <Checkbox
                        label="Zahtevati odobravanje svake porudžbine"
                        value={form.needsSupervisorPermission}
                        onChange={(e) => setForm({...form, needsSupervisorPermission: e})}
                    />}
                </div>
                <Button label="Izmeni" onClick={handleSubmit} />
            </div>
        )
    }

  function renderDetails() {
    console.log(props.user);

    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div className="w-[75px]">Ime</div>
          <TextField
            className="grow"
            value={form.ime}
            onChange={(e) => setForm({ ...form, ime: e })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[75px]">Prezime</div>
          <TextField
            className="grow"
            value={form.prezime}
            onChange={(e) => setForm({ ...form, prezime: e })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[75px]">E-mail</div>
          <TextField
            className="grow"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[75px]">JMBG</div>
          <TextField
            className="grow"
            value={form.jmbg}
            onChange={(e) => setForm({ ...form, jmbg: e })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[75px]">Br. telefona</div>
          <TextField
            className="grow"
            value={form.brTelefon}
            onChange={(e) => setForm({ ...form, brTelefon: e })}
          />
        </div>
        <div className="flex justify-between items-center">
          <div className="w-[75px]">Pozicija</div>
          <Select
            className="grow"
            options={[
              BANK_POSITIONS.ADMIN,
              BANK_POSITIONS.ADMIN_GL,
              BANK_POSITIONS.ROLE_AGENT,
              BANK_POSITIONS.ROLE_SUPERVISOR,
            ]}
            defValue={form.pozicija}
            onChange={(e) => setForm({ ...form, pozicija: e })}
          />
        </div>
        <Button label="Izmeni" onClick={handleSubmit} />
      </div>
    );
  }

  return (
    <Modal
      id={props.id}
      visible={props.visible}
      onClose={props.onClose}
      title="User modal"
      className="max-w-[900px]"
    >
      <div>{renderDetails()}</div>
    </Modal>
  );
}

UserModal.propTypes = {
  id: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  user: PropTypes.array,
};

export default UserModal;
