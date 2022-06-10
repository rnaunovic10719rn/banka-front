import React from "react"
import Table from "../../components/common/Table"

export default function CapitalPage() {
    return (
        <div className="flex flex-col">
            <h3 className="text-xl text-gray-500 pb-5">Pregled svih narudžbina</h3>
            <Table
                headings={[
                    "Tip",
                    "Ukupno",
                  ]}
                  rows={null}
                pagination
            />
           </div>
    )
}