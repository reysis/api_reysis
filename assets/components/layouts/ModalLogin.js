import React from 'react';
import {Button, Modal} from "react-bootstrap";
import history from "../../history";

const ModalLogin = ({ show, onHide}) => {
    const handleClick = () =>{
        history.push("/login");
    }
    return (
        <Modal
            show={show}
            onHide={onHide}
            className="modal-login"
            centered
        >
            <div className="wrapper flex-centered-container p-5">
                <div className="modal-header text-center my-4">
                    <p className="mb-2"><span>Debes estar logueado para realizar esta acción</span></p>
                </div>
                <Button className='btn btn-primary landing-button' onClick={handleClick}>
                    Loguearse
                </Button>
            </div>
        </Modal>
    );
};

export default ModalLogin;
