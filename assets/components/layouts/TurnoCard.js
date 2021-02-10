import React from 'react';
import {Card} from "react-bootstrap";
import ShowStars from "./ShowStars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getIdFromUrl} from "../../redux/utiles";

const TurnoCard = ({defecto, date, index, time, id, deleteTurno}) => {
    return (
        <div>
            <Card className="turno-card__container">
                <Card.Body>
                    <Card.Title>Turno No. {index}</Card.Title>
                    <Card.Subtitle>
                        <span>Fecha: {date}<br/>Hora: {time}</span>
                    </Card.Subtitle>
                    <Card.Text>Defecto: {defecto}</Card.Text>
                    <Link to={`/turnos/edit/${getIdFromUrl(id)}`}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Link>
                    <div onClick={deleteTurno(getIdFromUrl(id))}>
                        <FontAwesomeIcon className="" icon={faTrash} />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TurnoCard;
