import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ServicioItem from "../components/ServicioItem";
import { serviceItemFetch } from '../redux/service/serviceActions'
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const ServicioItemPage = ({ match }) => {

    const loading = useSelector(state => state.service.itemLoading)
    const service = useSelector(state => state.service.itemService)
    const error = useSelector(state => state.service.itemError)

    const dispatch = useDispatch()

    useEffect(() => {
        const serviceItem = decodeURIComponent(match.params.id)
        dispatch(serviceItemFetch(serviceItem))
    }, [])

    return (
        <main className="content-wrap service-item-page page">
            <div className="service-item-header">
                <h1 className="mx-4">Servicio</h1>
            </div>
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