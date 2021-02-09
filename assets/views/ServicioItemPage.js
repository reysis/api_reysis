import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ServicioItem from "../components/ServicioItem";
import { serviceItemFetch } from '../redux/service/show/serviceShowActions'
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ServicioItemPage = ({ match }) => {

    const loading = useSelector(state => state.service.show.loading)
    const service = useSelector(state => state.service.show.service)
    const error = useSelector(state => state.service.show.error)

    const dispatch = useDispatch()

    useEffect(() => {
        const serviceItem = decodeURIComponent(match.params.id)
        console.log(serviceItem);
        dispatch(serviceItemFetch(serviceItem))
    }, [])

    return (
        <main className="content-wrap service-item-page page">
            {service &&
                <div className="page-header">
                    <h1>Servicio <span>{service.nombre}</span></h1>
                </div>
            }
            <Alert role={"status"} variant={"info"} show={loading}>
                Loading...
            </Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            { !loading && !error && <ServicioItem {...service} />}
        </main>
    )
}

ServicioItemPage.propTypes = {};

export default ServicioItemPage;