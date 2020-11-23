import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { serviceFetch } from '../redux/service/serviceActions';

import ServiceCard from '../components/ServiceCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import { Alert } from 'react-bootstrap';

const ServicesHome = () => {

    const loading = useSelector(state => state.service.loading)
    const services = useSelector(state => state.service.services)
    const error = useSelector(state => state.service.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(serviceFetch())
    }, [])

    return (
        <section id="services" className="services-home section-padding">
            <div className="services-header">
                <h2 className="mx-4">Nuestros <span>servicios</span></h2>
            </div>
            {/* <div className="shape-background-1" />
            <div className="shape-background-2" /> */}
            <Alert role={"status"} variant={"info"} show={loading}>
                Loading...
            </Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            {
                loading != undefined && !loading && error != undefined && !error &&
                <div className="container cards-container cards-style">
                    {
                        services.map(service => {
                            return (
                                <ServiceCard key={service.id} nombre={service.nombre} descripcion={service.descripcion} imaage={service.image} />
                            )
                        })
                    }
                </div>
            }
        </section>
    )
}

ServicesHome.propTypes = {
    loading: PropTypes.bool,
    services: PropTypes.array,
    error: PropTypes.string
}

export default ServicesHome