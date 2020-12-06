import React from 'react';
import PropTypes from 'prop-types';
import ServicioItem from "../components/ServicioItem";
import { Row } from 'react-bootstrap';

const ServicioItemPage = () => {
    return (
        <Row className="content-wrap servicio-item-page page">
            <ServicioItem />
        </Row>
    )
}

ServicioItemPage.propTypes = {};

export default ServicioItemPage;