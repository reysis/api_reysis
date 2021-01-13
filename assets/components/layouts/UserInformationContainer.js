import React from 'react';
import {Col, Row} from "react-bootstrap";

const UserInformationContainer = ({user}) => {
    console.log(user);
    return (
        <div>
            <Row md={12}>
                <Col md={6}>Username</Col>
                <Col md={6}>{user['username']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>Nombre</Col>
                <Col md={6}>{user['persona']['nombre']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>CI</Col>
                <Col md={6}>{user['persona']['ci']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>Teléfonos</Col>
                <Col md={6}>{user['phones']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>Dirección</Col>
                <Col md={6}>{user['address']['postAddress']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>Indicaciones sobre la dirección</Col>
                <Col md={6}>{user['address']['indications']}</Col>
            </Row>
            <Row md={12}>
                <Col md={6}>Nacionalidad</Col>
                <Col md={6}>{user['nationality']}</Col>
            </Row>
        </div>
    );
};

export default UserInformationContainer;
