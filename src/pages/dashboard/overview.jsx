import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Tab from "../../components/common/Tab";
import Table from "../../components/common/Table";
import { URLS } from "../../routes";
import Modal from "../../components/common/Modal";
import TextField from "../../components/common/TextField";

const TABS = {
  STOCKS: "Stocks",
  FOREX: "Forex",
  FUTURES: "Futures",
};

export default function OverviewPage() {
  let navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS.STOCKS);

  const [openModal, setOpenModal] = useState(false);

  function renderFutures() {
    const rows = new Array(15).fill([
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
    ]);

    return (
      <Table
        headings={[
          "Oznaka",
          "Cena",
          "Promena iznosa",
          "Opseg",
          "Ugovorena velicina",
          "Ugovorena jedinica",
          "Margina odrzavanja",
          "Datum poravnanja",
        ]}
        rows={rows}
        pagination
      />
    );
  }

  function renderForex() {
    const rows = new Array(15).fill([
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
    ]);

    return (
      <Table
        headings={[
          "Oznaka",
          "Cena",
          "Promena iznosa",
          "Opseg",
          "Osnovna valuta",
          "Navedena valuta",
          "Ugovorena velicina",
        ]}
        rows={rows}
        pagination
      />
    );
  }

  function renderStocks() {
    const rows = new Array(15).fill([
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
      "placeholder",
    ]);

    return (
      <Table
        headings={[
          "Oznaka",
          "Cena",
          "Promena iznosa",
          "Opseg",
          "Naziv berze",
          "Oznaka berze",
          "Drzava",
          "Valuta",
          "Vremenska zona",
        ]}
        rows={rows}
        pagination
        clickable
        onClick={() => navigate("123", { id: "test" })}
      />
    );
  }

  function onSubmit() {}

  return (
    <div>
      <Button
        className="float-right"
        onClick={() => {
          setOpenModal(true);
        }}
        label="Filter"
      />
      {openModal && (
        <Modal title="Filter" id="1" onClose={setOpenModal} visible={true}>
          <div class="flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="w-[100px]">Exchange: </div>
              <TextField className="grow" placeholder="Exchange" />
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="w-[100px]">Price: </div>
              <TextField className="grow" placeholder="Price 1" />
              <TextField className="grow" placeholder="Price 2" />
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="w-[100px]">Ask: </div>
              <TextField className="grow" placeholder="Ask 1" />
              <TextField className="grow" placeholder="Ask 2" />
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="w-[100px]">Bid: </div>
              <TextField className="grow" placeholder="Bid 1" />
              <TextField className="grow" placeholder="Bid 2" />
            </div>
            <div className="flex justify-between items-center gap-5">
              <div className="w-[100px]">Volume: </div>
              <TextField className="grow" placeholder="Volume 1" />
              <TextField className="grow" placeholder="Volume 2" />
            </div>
            <div>
              <Button
                className="float-right"
                onClick={() => {
                  setOpenModal(false);
                }}
                label="Filter"
              />
            </div>
          </div>
        </Modal>
      )}

      <Tab
        tabs={[TABS.STOCKS, TABS.FOREX, TABS.FUTURES]}
        onChange={(e) => setActiveTab(e)}
      />
      {activeTab === TABS.STOCKS && renderStocks()}
      {activeTab === TABS.FOREX && renderForex()}
      {activeTab === TABS.FUTURES && renderFutures()}
    </div>
  );
}
