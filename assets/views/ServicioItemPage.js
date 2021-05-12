import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ServicioItem from "../components/ServicioItem";
import { serviceItemFetch } from '../redux/service/show/serviceShowActions'
import { useDispatch, useSelector } from 'react-redux';
import {Alert, Image, Jumbotron} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import LoaderSpinner from "../components/Loader";
import draftjsToHtml from 'draftjs-to-html';
import {Row, Col} from 'react-bootstrap';

const ServicioItemPage = ({ match }) => {

    const loading = useSelector(state => state.service.show.loading)
    const service = useSelector(state => state.service.show.service)
    const error = useSelector(state => state.service.show.error)
    const [htmlState, setHtmlState] = useState("")

    const dispatch = useDispatch()

    useEffect(() => {
        if (service) {
            let jsonState;
            try {
                jsonState = JSON.parse(service.description)
                setHtmlState(draftjsToHtml(jsonState))
            }
            catch (error) {
                setHtmlState("<p>Sin descripción</p>")
            }
        }
    }, [service])

    useEffect(() => {
        const serviceItem = decodeURIComponent(match.params.id)
        dispatch(serviceItemFetch(serviceItem))
    }, [])

    return (
        <main className="content-wrap service-item-page page">
            {service &&
                <Row>
                    <Col sm={12} lg={3}>
                        <div className="service-item-page__imagen-container">
                            <Image fluid src={service['urlPortada']} className="image-header"/>
                        </div>
                    </Col>
                    <Col sm={12} lg={9} className="service-item-page__header-container">
                        <div className="page-header">
                            <h1>Servicio <span>{service.nombre}</span></h1>
                        </div>
                    </Col>
                </Row>
            }
            {loading &&
                <LoaderSpinner />
            }
            { !loading && !error && <ServicioItem htmlState={htmlState} />}
        </main>
    )
}

ServicioItemPage.propTypes = {};

export default ServicioItemPage;