import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getUserApi } from "../../clients/client";
import Block from "../../components/common/Block";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import { addUserAction } from "../../redux/actions";
import { getUserSelector } from "../../redux/selectors";

export default function ApproveTransactionPage() {

    const user = useSelector(getUserSelector);
    const dispatch = useDispatch();

    async function getUser() {
        const response = await getUserApi();
        dispatch(addUserAction(response));
    }

    useEffect(() => {
        getUser();
    }, []);

    console.log(user);
    
    return (
        <>
        {  user && (user["role"]["name"] != "ROLE_ADMIN") &&
        (<Block className="flex flex-col gap-4" title="Odobravanje porudžbina" cta={<Select className="grow" options={["Sve", "Završene", "Odobrene", "Odbijene", "Na čekanju"]}/>}>
            <Table headings={['Hartija', 'Transakcija', 'Simbol', 'Količina', 'Cena', 'Odobrena', 'Odobrio', 'Završena', 'Posl. modifikacija', 'Opcije', '']} />
        </Block>)
        }
        </>
    )
}