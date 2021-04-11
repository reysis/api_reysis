import React from 'react';
import {Card, Col} from "react-bootstrap";
import ShowStars from "./ShowStars";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import {getIdFromUrl} from "../../redux/utiles";

const TurnoCard = ({defecto, date, index, time, id, deleteTurno, taller, domicilio, equipo, servicio}) => {
    return (
        <Col md={12} sm={12} lg={6}>
            <Card className="turno-card__container">
                <Card.Body>
                    <Card.Header>
                        <Card.Title>Turno No. {index}</Card.Title>
                    </Card.Header>
                    <Card.Subtitle className="m-auto">
                        Detalles de su turno
                    </Card.Subtitle>
                    <Card.Text>
                        <strong>Fecha:</strong> {date}
                            <br/>
                        <strong>Hora:</strong> {time}
                            <br />
                        <strong>Equipo a reparar:</strong> {equipo}
                            <br />
                        <strong>Posible servicio a realizar:</strong> {servicio}
                            <br />
                        <strong>Taller:</strong> {taller['nombre']}
                            <br />
                        <strong>Dirección del Taller:</strong> {taller['address']['postAddress']}
                            <br />
                        <strong>Indicaciones para llegar:</strong> {taller['address']['postAddress']}
                            <br />
                        <strong>Servicio a domicilio:</strong> {domicilio ? "Usted a solicitado el servicio" : "Usted no ha solicitado el servicio"}
                            <br />
                        <strong>Defecto:</strong> {defecto}
                    </Card.Text>
                    <Card.Footer>
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
                    </Card.Footer>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default TurnoCard;
