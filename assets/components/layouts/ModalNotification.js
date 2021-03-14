import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Moment from "react-moment";

const ModalNotification = ({ show, onHide, values }) => {
    return (
        <Modal
            show={show}
            onHide={onHide}
            className="modal-opinion"
            centered
        >
            <Modal.Header className="modal-opinion__header" closeButton>
                <h3 className="modal-opinion__header-title">Notificación</h3>
            </Modal.Header>
            <Modal.Body className="modal-opinion__body">
                <div className="modal-opinion__body-review">
                    {values.description}
                </div>
            </Modal.Body>
            <Modal.Footer className="modal-opinion__footer">
                <Moment fromNow>{values.date}</Moment>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalNotification