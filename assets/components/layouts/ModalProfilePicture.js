import React from 'react';
import {Col, Row, Modal} from "react-bootstrap";
import MyDropzone from "./MyDropzone";

const ModalProfilePicture = ({show, setShow}) => {
    return (
        <Modal
            show={show}
            onHide={()=>setShow(false)}
            className="modals-reysis user-profile-picture__modal"
            centered
        >
            <div className="modal-header text-center my-4">
                <h2 className="mb-2"><span>Démosle un aire fresco a tu imagen!</span></h2>
            </div>
            <MyDropzone setShow={setShow}/>
        </Modal>
    );
};

export default ModalProfilePicture;
