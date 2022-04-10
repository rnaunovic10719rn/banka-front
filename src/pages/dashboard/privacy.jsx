import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getUsersAction } from "../../clients/client"
import Button, { BUTTON_DESIGN } from '../../components/common/Button'
import { URLS } from '../../routes'
import Modal from "../../components/common/Modal"
import Card from "../../components/common/Card"
import { render } from "@testing-library/react"
import QRCode from "react-qr-code";
import TextField from "../../components/common/TextField"
import Alert from "../../components/common/Alert"
//import { useNavigate } from "react-router-dom"



export default function PrivacyPage() {

    let navigate = useNavigate()

    const [openModal, setOpenModal] = useState(false);
    const [openKod, setOpenKod] = useState(false);

    const[error, setError] = useState(null);
    const[success, setSuccess] = useState(null);

    const [form,setForm] = useState({
        kod:"",
    });

    const onChange = (event) => {
        setForm({...form, ...event});
    };

    async function onSubmit(){
        try{
            setSuccess(true);
        }catch(e){
            setError(true);
        }
    }
    
    return (
        <div className="w-[500] flex flex-col gap-8">
        {error && (
            <Alert
                design="danger"
                text="Error"
                onDismiss={() => setError(null)}
            ></Alert>
        )}
        { success && (
            <Alert
                design="success"
                text="Autentifikacija je uspešno podešena."
                onDismiss={() => setSuccess(null)}
            ></Alert>
        )}
            <Card title="Šifra">
                <div>
                    <Button design={BUTTON_DESIGN.PRIMARY} label="Promenite šifru" onClick={() => navigate("/" + URLS.DASHBOARD.CHANGEPASSWORD)} />
                </div>
            </Card>
            <Card title="2-faktor autentifikacija">
                <div>
                    <Button className="openModalBtn" label="Podesi" design={BUTTON_DESIGN.PRIMARY} 
                        onClick={()=>{setOpenModal(true);
                    }}/>
                    {openModal && 
                            <Modal title="2-faktor autentifikacija" id="1" onClose={setOpenModal} visible={true} >
                                
                                <div className="flex flex-col gap-5">
                                    <div className="grid justify-items-center gap-5">
                                        <div>
                                             <h4>Korisite Vašu aplikaciju za autentifikaciju da biste skenirali ovaj QR kod.</h4>
                                        </div>
                                        <QRCode value="Generating QR code is easy with react-qr-code, you just need some text." />                                               
                                    </div>
                                    <div>
                                        <Button className="float-right" label="Nastavite" design={BUTTON_DESIGN.PRIMARY} 
                                            onClick={() =>{setOpenModal(false);setOpenKod(true);
                                        }}/>
                                    </div>
                                </div>
                            </Modal>
                    } {openKod &&
                            <Modal title="2-faktor autentifikacija" id="1" onClose={setOpenKod} visible={true}>
                                <div className="flex flex-col gap-5">
                                    <div className="grid justify-items-center gap-5">
                                        <div>
                                             <h4>Unesite kod koji je Vaša aplikacija generiasala.</h4>
                                        </div>
                                        <div>
                                            <TextField
                                            
                                                className="grow"
                                                onChange={(e)=>onChange({kod:e})}
                                                placeholder="Kod"

                                            />
                                        </div>                                               
                                    </div>
                                    <div>
                                        <Button className="float-right" label="Nastavite" design={BUTTON_DESIGN.PRIMARY} 
                                            onClick={() =>{setOpenModal(false);setOpenKod(false);onSubmit(false);
                                        }}/>
                                    </div>
                                </div>
                             </Modal>}
                </div>    
            </Card>
        </div>
    )
}