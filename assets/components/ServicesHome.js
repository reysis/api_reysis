import React, { Component } from 'react';
import ServiceCard from '../components/ServiceCard';
import serviceImg from '../assets/serviceImage.png';
import PropTypes from "prop-types";
import { list, reset } from "../actions/servicios/list";
import { connect } from "react-redux";

class ServicesHome extends Component {
    static propTypes = {
        retrieved: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        eventSource: PropTypes.instanceOf(EventSource),
        deletedItem: PropTypes.object,
        list: PropTypes.func.isRequired,
        //reset: PropTypes.func.isRequired
    };
    state = {
        loading: true,
        error: null,
        retrieved: {},
    };
    
    componentDidMount() {
        this.props.listServices();
    }
    
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.retrieved !== nextProps.retrieved) {
            this.setState({
                retrieved: nextProps.retrieved,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }
    render() {
        if (this.state.loading) {
            return (
                <div className="alert alert-info" role="status">
                    Loading...
                </div>
            )
        } else {
            const Cards = this.props.retrieved['hydra:member'].map((card, index) => {
                return (
                    <ServiceCard key={card['@id']} layout={index % 2 === 0 ? false : true} title={card['nombre']} text={card['descripcion']} img={card['image']} />
                )
            })
            return (
                <section id="services" className="services-home">
                    {/* <div className="shape-background"></div> */}
                    {/* <div className="shape-background-2"></div> */}
                    {this.props.error && (
                        <div className="alert alert-danger" role="alert">
                            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                            {this.props.error}
                        </div>
                    )}
                    <h1 className="services-title">Servicios</h1>
                    <div className="cards-container container">
                        {Cards}
                    </div>
                </section>
            );
        }
    }
}
const mapStateToProps = state => {
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
    //reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(ServicesHome);