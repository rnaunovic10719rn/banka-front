import React from "react"
import Table from "../../components/common/Table"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { securityCapitalListing } from "../../clients/capital";
import { useState } from "react";

const testExample = [
    ["Akcija", "1000"],
    ["Futures", "1000"]
];

export default function CapitalPage() {
    const [table, setTable] = useState([]); 

    const navigate = useNavigate();

    async function getCapitals() {
        const list = await securityCapitalListing();
        let tmp = [];
        list.map((r) => {
          tmp.push(createCapitalRow(r));
        });
        setTable(tmp);
    }

    function createCapitalRow(r) {
        return [
          r["kapitalType"],
          r["ukupno"]
        ];
    }

    const routeChange = (e) => {
        navigate(e);
    }

    useEffect(() => {
        getCapitals();
    }, []);

    return (
        <div className="flex flex-col">
            <h3 className="text-xl text-gray-500 pb-5">Pregled kapitala</h3>
            <Table
                headings={[
                    "Tip",
                    "Ukupno",
                  ]}
                rows={table.length > 0 ? table : testExample}
                clickable={true}
                onClick={(e) => routeChange(e[0])}
            />
           </div>
    )
}