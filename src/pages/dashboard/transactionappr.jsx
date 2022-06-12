import React, { useEffect } from "react"
import { useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersForApprovalFalse, getOrdersForApprovalTrue } from "../../clients/stocks";
import Block from "../../components/common/Block";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import { getUserSelector } from "../../redux/selectors";

export default function ApproveTransactionPage() {

    const user = useSelector(getUserSelector);
    const [orderData, setOrderData] = useState([]);

    async function getData() {
        const respFalse = await getOrdersForApprovalFalse();
        setOrderData(respFalse);
        console.log(respFalse);
    };

    useEffect(() => {
        getData();
    }, []);

    
    return (
        <>
        {  user && (user["role"]["name"] == "ROLE_SUPERVISOR") &&
        (<Block className="flex flex-col gap-4" title="Odobravanje porudžbina" cta={<Select className="grow" options={["Sve", "Završene", "Odobrene", "Odbijene", "Na čekanju"]}/>}>
            <Table headings={['Hartija', 'Transakcija', 'Simbol', 'Količina', 'Cena', 'Odobrena', 'Odobrio', 'Završena', 'Posl. modifikacija', 'Opcije', '']} rows={orderData} />
        </Block>)
        }
        </>
    )
}