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
        let wholeList = [];
        const respTrue = await getOrdersForApprovalTrue();
        const respFalse = await getOrdersForApprovalFalse();
        wholeList += respTrue;
        wholeList += respFalse;
        setOrderData(wholeList);
    };

    useEffect(() => {
        getData();
    }, []);

    
    return (
        <>
        {  user && (user["role"]["name"] != "ROLE_ADMIN") &&
        (<Block className="flex flex-col gap-4" title="Odobravanje porudžbina" cta={<Select className="grow" options={["Sve", "Završene", "Odobrene", "Odbijene", "Na čekanju"]}/>}>
            <Table headings={['Hartija', 'Transakcija', 'Simbol', 'Količina', 'Cena', 'Odobrena', 'Odobrio', 'Završena', 'Posl. modifikacija', 'Opcije', '']} rows={orderData} />
        </Block>)
        }
        </>
    )
}