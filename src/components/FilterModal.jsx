import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Modal from "./common/Modal"

function FilterModal(props) {
    useEffect(() => {
    }, [])

    return (
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
    )
}

FilterModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
}

export default FilterModal