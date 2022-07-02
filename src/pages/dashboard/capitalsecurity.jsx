import classNames from "classnames";
import React from "react"
import { useState } from "react";
import { useEffect } from "react";
import { boughtSecurity, historyOfOrder } from "../../clients/capital";
import Block from "../../components/common/Block";
import Table from "../../components/common/Table";
import SecurityModal from "../../components/SecurityModal";

export default function CapitalSecurityPage() {
    let title = window.location.pathname.split("/")[2];
    title = title.replace("_", " ");

    const [data, setData] = useState([]);
    const [ozHartije, setOzHartije] = useState(null);
    const [mapping, setMapping] = useState(new Map());
    const [dTabela, setDTabela] = useState([]);

    async function loadData() {
        const harType = title == "FUTURE UGOVOR" ? title.replace(" ", "_") : title;
        // ovde treba switch da se korektno pozove api
        const ls = await boughtSecurity(harType);
        let tmp = [];
        let tmpMap = new Map();
        ls.map((r) => {
          tmp.push(createSecurityRow(r));
          tmpMap.set(r["oznakaHartije"], r["id"]);
        });
        setData(tmp);
        setMapping(tmpMap);
    }

    async function loadTable() {
        const harType = title == "FUTURE UGOVOR" ? title.replace(" ", "_") : title;
        const dd = await historyOfOrder(harType, mapping.get(ozHartije));
        setDTabela(dd);
    }

    function determineProfitStatus(profit) {
        const priceStyle = classNames(
            "font-bold",
            { "text-green-500": profit > 0 },
            { "text-red-500": profit < 0 }
        );
        return <span className={priceStyle}>{profit}</span>;
    }

    function createSecurityRow(r) {
        return [
          r["oznakaHartije"],
          r["berza"],
          r["kolicinaUVlasnistvu"],
          parseFloat(r["cena"]).toFixed(2),
          parseFloat(r["vrednost"]).toFixed(2),
          parseFloat(r["vrednostRSD"]).toFixed(2)
        ];
    }

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        loadTable();
    }, [ozHartije]);

    return (
        <div>
            {ozHartije != null && <SecurityModal tabela={dTabela} oznakaHartije={ozHartije} visible={true} onClose={() => {setOzHartije(null);}} />}
            <Block title={title}>
            <Table
                headings={[
                    "Oznaka",
                    "Berza",
                    "Kol. u vlasništvu",
                    "Cena",
                    "Vrednost",
                    "Vrednost (RSD)",
                  ]}
                rows={data}
                clickable
                onClick={(e) => {
                    setOzHartije(e[0]);
                }}
            />
            </Block>
        </div>
    )
}