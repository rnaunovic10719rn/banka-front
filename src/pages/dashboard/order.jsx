import React, { useEffect, useState } from "react";
import Table from "../../components/common/Table";
import {getOrdersApi} from "../../clients/stocks";
import PlaceholderLoading from "react-placeholder-loading";

export default function OrdersPage() {
    const [ordersRowData, setOrdersRowData] = useState([]);

    async function getOrders() {
        const response = await getOrdersApi();
        let tmp = [];
        response.map((r) => {
          tmp.push(createOrderRow(r));
        });
        setOrdersRowData(tmp);
    }

    function createOrderRow(r) {
        return [
          r["hartijaOdVrednosti"],
          r["orderAction"],
          r["hartijaOdVrednostiId"],
          r["kolicina"],
          r["ukupnaCena"],
        ];
    }

      useEffect(() => {
        getOrders();
      }, []);

      function renderPlaceholderRows(cols) {
        return new Array(5).fill(
          new Array(cols).fill(
            <PlaceholderLoading shape="rect" width={"100%"} height={20} />
          )
        );
      }

    function renderOrders() {
        const data =
          ordersRowData.length > 0 ? ordersRowData : renderPlaceholderRows(6);
    
        return (
            <div className="flex flex-col">
            <h3 className="text-xl text-gray-500 pb-5">Pregled svih narudžbina</h3>
            <Table
                headings={[
                    "Tip hartije",
                    "Tip transakcije",
                    "Simbol",
                    "Kolicina",
                    "Cena",
                  ]}
                  rows={ordersRowData}
                pagination
            />
           </div>
        );
      }

    return (
        <div>
          {renderOrders()}
        </div>
      );
}