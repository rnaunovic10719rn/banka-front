import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
import Modal from "./common/Modal";
import Table from "./common/Table";
import { useState } from "react";
import { useEffect } from "react";


function UserModal(props) {

  const [tabela, setTabela] = useState([]);

  function cleanData() {
    const dt = props.tabela;
    let tmp = [];
    dt.map((r) => {
        tmp.push(createHistoryRow(r));
      });
    setTabela(tmp);
    }

    function createHistoryRow(r) {
      return [
        r["tipOrdera"],
        <div class="text-right">{parseFloat(r["kolicina"]).toFixed(2)}</div>,
        <div class="text-right">{parseFloat(r["ukupno"]).toFixed(2)}</div>,
        <div class="text-center">{moment(r["datum"]).format("DD.MM.YYYY HH:mm")}</div>
      ];
    }

  useEffect(() => {
    cleanData();
  }, [props.tabela]);

  function renderDetails() {
    return (
      <div className="flex flex-col gap-5">
        <Table
          headings={[
            "Tip ordera",
            "Količina",
            "Ukupno",
            "Datum"
          ]}
          rows={tabela}
          />
      </div>
    );
  }

  return (
    <Modal
      visible={props.visible}
      onClose={props.onClose}
      title={"Istorija narudžbina za " + props.oznakaHartije}
      className="max-w-[800px]"
    >
      <div>{renderDetails()}</div>
    </Modal>
  );
}

UserModal.propTypes = {
  tabela: PropTypes.array.isRequired,
  oznakaHartije: PropTypes.string.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserModal;
