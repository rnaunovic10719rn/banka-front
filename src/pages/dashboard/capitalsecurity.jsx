import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { boughtSecurity } from "../../clients/capital";
import Block from "../../components/common/Block";
import Table from "../../components/common/Table";

const testExample = [
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"]
];

export default function CapitalSecurityPage() {
    let title = window.location.pathname.split("/")[2];
    title = title.replace("_", " ");

    const [data, setData] = useState([]);

    async function loadData() {
        let harType = "";
        // ovde treba switch da se korektno pozove api
        const ls = await boughtSecurity(title);
        setData(ls);
        console.log(ls);
    }

    useEffect(() => {
        loadData();
    });

    return (
        <div>
            <Block title={title}>
            <Table
                headings={[
                    "Naziv",
                    "Količina",
                    "Trenutna cena",
                    "Ukupno",
                    "Plaćeno",
                    "Razlika"
                  ]}
                rows={data.length > 0 ? data : testExample}
            />
            </Block>
        </div>
    )
}