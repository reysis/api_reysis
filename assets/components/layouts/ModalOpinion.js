import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

const ModalOpinion = ({ show, onHide }) => {

    const [stars, setStarts] = useState([
        { id: "start-1", marked: false },
        { id: "start-2", marked: false },
        { id: "start-3", marked: false },
        { id: "start-4", marked: false },
        { id: "start-5", marked: false }
    ])

    return (
        <div />
        // <Modal
        //     show={show}
        //     onHide={onHide}
        //     className="modal-opinion"
        // >
        //     <Modal.Header className="modal-opinion__header" closeButton>
        //         <Modal.Title className="modal-opinion__header-title">Coméntenos como te ha ido!</Modal.Title>
        //     </Modal.Header>
        //     <Modal.Body className="modal-opinion__body">
        //         {/* <div className="modal-opinion__body-starts">
        //             {
        //                 stars.map(({ id, marked }) => {
        //                     return <FontAwesomeIcon key={id} icon={marked ? faStarFull : faStarEmpty} />
        //                 })
        //             }
        //         </div> */}
        //     </Modal.Body>
        //     <Modal.Footer className="modal-opinion__footer">
        //         {/* <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        //         <Button variant="primary" onClick={onHide}>Comentar</Button> */}
        //     </Modal.Footer>
        // </Modal>
    )
}

export default ModalOpinion