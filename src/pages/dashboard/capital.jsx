import React from "react"
import Table from "../../components/common/Table"
import { useNavigate } from "react-router-dom";

const testExample = [
    ["Akcija", "1000"],
    ["Futures", "1000"]
];

export default function CapitalPage() {
    const navigate = useNavigate();

    const routeChange = (e) => {
        navigate(e);
    }

    return (
        <div className="flex flex-col">
            <h3 className="text-xl text-gray-500 pb-5">Pregled kapitala</h3>
            <Table
                headings={[
                    "Tip",
                    "Ukupno",
                  ]}
                rows={testExample}
                clickable={true}
                onClick={(e) => routeChange(e[0])}
            />
           </div>
    )
}