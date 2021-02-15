import React from 'react';
import {Card, Col} from "react-bootstrap";
import ShowStars from "./ShowStars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getIdFromUrl} from "../../redux/utiles";

const TurnoCard = ({defecto, date, index, time, id, deleteTurno}) => {
    return (
        <Col md={6} sm={12} lg={6}>
            <Card className="turno-card__container">
                <Card.Body>
                    <Card.Title>Turno No. {index}</Card.Title>
                    <Card.Subtitle>
                        <span>Fecha: {date}<br/>Hora: {time}</span>
                    </Card.Subtitle>
                    <Card.Text>Defecto: {defecto}</Card.Text>
                    <div className="turno-card__links-container">
                        <div className="turno-card__link">
                            <Link to={`/turnos/edit/${getIdFromUrl(id)}`}>
                                <FontAwesomeIcon icon={faEdit} size="lg"/>
                            </Link>
                        </div>
                        <div className="turno-card__link" onClick={deleteTurno}>
                            <FontAwesomeIcon className="" icon={faTrash} size="lg"/>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TurnoCard;
