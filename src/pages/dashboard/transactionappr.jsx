import React, { useEffect } from "react"
import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getOrdersApprovedFalse, getOrdersApprovedTrue, getOrdersForApprovalFalse, getOrdersRejectedFalse, postApproveOrder, postRejectOrder } from "../../clients/stocks";
import Block from "../../components/common/Block";
import Select from "../../components/common/Select";
import Table from "../../components/common/Table";
import { getUserSelector } from "../../redux/selectors";
import Button from "../../components/common/Button";

export default function ApproveTransactionPage() {

    const user = useSelector(getUserSelector);
    const [orderData, setOrderData] = useState([]);
    const [typeOfOrder, setTypeOfOrder] = useState("Sve");

    async function getData() {
        let response = [];
        const l1 = await getOrdersForApprovalFalse();
        const l2 = await getOrdersApprovedFalse();
        const l3 = await getOrdersRejectedFalse();
        const l4 = await getOrdersApprovedTrue();
        if (typeOfOrder == "Sve") {    
            response = response.concat(l1);
            response = response.concat(l2);
            response = response.concat(l3);
            response = response.concat(l4);
        } else if (typeOfOrder == "Završene") {
            response = response.concat(l4);
        } else if (typeOfOrder == "Odobrene") {
            response = response.concat(l2);
        } else if (typeOfOrder == "Odbijene") {
            response = response.concat(l3);
        } else {
            response = response.concat(l1);
        }
        let tmp = [];
        response.map((r) => {
            console.log(r);
          tmp.push(createOrderRow(r));
        });
        setOrderData(tmp);
    }

    async function approveOrder(id) {
        await postApproveOrder(id);
        window.location.reload();
    }
    
    async function rejectOrder(id) {
        await postRejectOrder(id);
        window.location.reload();
    }

    function createOrderRow(r) {
        return [
          r["hartijaOdVrednosti"],
          r["orderAction"],
          r["hartijaOdVrednostiSymbol"],
          r["kolicina"],
          r["predvidjenaCena"],
          r["orderStatus"] === "ON_HOLD" ? "Ne" : "Da",
          r["done"] ? "Da" : "Ne",
          moment(r["lastModified"]).format("DD.MM.YYYY HH:mm"),
          r["orderStatus"] == "ON_HOLD" ? <Button design="inline" onClick={() => approveOrder(r['id'])} label="Odobri"/> : null,
          r["orderStatus"] == "ON_HOLD" ? <Button design="inline" onClick={() => rejectOrder(r['id'])} label="Odbij"/> : null,
        ];
    }

    useEffect(() => {
        getData();
    }, [typeOfOrder]);

    
    return (
        <>
        {  user && (user["role"]["name"] == "ROLE_SUPERVISOR") &&
        (<Block className="flex flex-col gap-4" title="Odobravanje porudžbina" cta={
            <Select className="grow" options={["Sve", "Završene", "Odobrene", "Odbijene", "Na čekanju"]} onChange={(e) => setTypeOfOrder(e)}/>
        }>
            <Table headings={['Hartija', 'Transakcija', 'Simbol', 'Količina', 'Cena', 'Odobrena', 'Završena', 'Posl. modifikacija', 'Opcije', '']} rows={orderData} />
        </Block>)
        }
        </>
    )
}