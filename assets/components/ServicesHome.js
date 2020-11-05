import React, { Component } from 'react';
import ServiceCard from '../components/ServiceCard';
import PropTypes from "prop-types";
import { list, reset } from "../actions/servicios/list";
import { connect } from "react-redux";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { Alert } from 'react-bootstrap';

// import serviceImg from '../assets/serviceImage.png';

class ServicesHome extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        eventSource: PropTypes.instanceOf(EventSource),
        deletedItem: PropTypes.object,
        // list: PropTypes.func.isRequired,
        // reset: PropTypes.func.isRequired
    };

    state = {
        loading: true,
        error: null,
        retrieved: {}
    };

    componentDidMount() {
        this.props.listServices();
    }

    componentWillUnmount() {
        this.props.reset()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.retrieved !== nextProps.retrieved) {
            this.setState({
                retrieved: nextProps.retrieved,
                loading: nextProps.loading,
                error: nextProps.error
            })
        }
    };

    render() {
        if (this.state.loading) {
            return (
                <Alert className="my-3" role={"status"} variant={"info"} show={this.state.loading}>Loading...</Alert>
            )
        } else {
            const Cards = this.state.retrieved['hydra:member'].map((card, index) => {
                return (
                    <ServiceCard key={card['@id']} layout={index % 2 === 0 ? false : true} title={card['nombre']} text={card['descripcion']} img={card['image']} />
                )
            })
            return (
                <section id="services" className="services-home">
                    <div className="shape-background"></div>
                    <div className="shape-background-2"></div>
                    <Alert role={"alert"} variant={"danger"} show={this.state.error} >
                        <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                        {this.state.error}
                    </Alert>
                    <h2 className="services-title">Servicios</h2>
                    <div className="container cards-container cards-style">
                        {Cards}
                    </div>
                </section>
            );
        }
    }
};

const mapStateToProps = (state) => {
    const {
        retrieved,
        loading,
        error,
        eventSource,
        deletedItem
    } = state.services.list;

    return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
    listServices: page => dispatch(list(page)),
    reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesHome);