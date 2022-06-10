import React from "react"
import Block from "../../components/common/Block";
import Table from "../../components/common/Table";

const testExample = [
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"],
    ["Apple Inc.", "15", "$163.64", "$2,454", "$2,400", "$54"]
];

export default function CapitalSecurityPage() {
    const title = window.location.pathname.split("/")[2];

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
                rows={testExample}
            />
            </Block>
        </div>
    )
}