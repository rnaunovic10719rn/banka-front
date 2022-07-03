import React from "react"
import Table from "../../components/common/Table"
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { securityCapitalListing } from "../../clients/capital";
import { useState } from "react";
import Block from "../../components/common/Block";
import Button from "../../components/common/Button";
import CashAccountsTable from "../../components/CashAccountsTable";
import Payment from "../../components/Payment";
import Modal from "../../components/common/Modal";
import MarginKapitalBlock from "../../components/margins/MarginKapitalBlock";
import MarginStateBlock from "../../components/margins/MarginStateBlock";
import Tab from "../../components/common/Tab";
import numeral from "numeral"
import AnimationFadeIn from "../../components/common/AnimationFadeIn";

export default function CapitalPage() {
    const [table, setTable] = useState([]);
    const [paymentModal, setPaymentModal] = useState(false)
    const [selectedTab, setSelectedTab] = useState("Tekući račun")

    const navigate = useNavigate();

    async function getCapitals() {
        const list = await securityCapitalListing();
        let tmp = [];
        list.map((r) => {
            tmp.push(createCapitalRow(r));
        });
        setTable(tmp);
    }

    function toCurrency(number) {
        return numeral(number).format("$0,0.00")
    }

    function createCapitalRow(r) {
        return [
            r["kapitalType"],
            toCurrency(r["ukupno"])
        ];
    }

    const routeChange = (e) => {
        navigate(`/capital/checking/${e}`);
    }

    useEffect(() => {
        getCapitals();
    }, []);

    function renderCash() {
        return (
            <>
                <Block title="Tekući račun"
                       cta={<Button design="secondary" label="Uplata/Isplata" onClick={() => setPaymentModal(true)}/>}>
                    <CashAccountsTable/>
                    {paymentModal &&
                        <Modal visible={true} onClose={() => setPaymentModal(false)} id="payment-modal"
                               title="Uplata/Isplata (tekući račun)">
                            <Payment onDone={() => setPaymentModal(false)}/>
                        </Modal>}
                </Block>
                <Block className="flex flex-col gap-4" title="Pregled kapitala">
                    <div className="flex flex-col">
                        <Table
                            headings={[
                                "Tip kapitala",
                                "Ukupno",
                            ]}
                            rows={table}
                            clickable={true}
                            onClick={(e) => routeChange(e[0])}
                        />
                    </div>
                </Block>
            </>
        )
    }

    function renderMargin() {
        return (
            <>
                <MarginStateBlock/>
                <MarginKapitalBlock/>
            </>
        )
    }

    return (
        <div>
            <Tab tabs={['Tekući račun', 'Maržni račun']} onChange={setSelectedTab}/>
            <AnimationFadeIn className='grid gap-5'>
                {selectedTab === "Tekući račun" && renderCash()}
                {selectedTab === "Maržni račun" && renderMargin()}
            </AnimationFadeIn>
        </div>
    )
}