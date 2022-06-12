import React from "react"
import Block from "../../components/common/Block"
import CashAccountsTable from "../../components/CashAccountsTable";

export default function PortfolioPage() {

    return (
        <Block title="Portfolio">
            <CashAccountsTable />
        </Block>
    )
}