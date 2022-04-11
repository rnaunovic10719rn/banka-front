import React from "react"
import Table from "../../components/common/Table"
import Button from "../../components/common/Button"

export default function OrdersPage() {
    const rows = [
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
        [
            'Stocks',
            'AAPL',
            10,
            <Button design="inline" label="Cancel" />
        ],
    ]

    return (
        <div className="w-2/3">
            <h3 className="text-xl text-gray-500 pb-5">Pregled</h3>
            <Table
                headings={[
                    'Tip',
                    'Simbol',
                    'Kolicina',
                    'Akcija'
                ]}
                rows={rows}
                pagination
            />
        </div>
    )
}