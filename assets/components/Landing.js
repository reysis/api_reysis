import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BG from '../assets/landing-background.png';
import LandingImg from '../assets/Logo.png';
import { Button } from 'react-bootstrap';


class Landing extends Component {
    render() {
        return (
            <section id="landing" className="landing-page container-fluid page" style={{ backgroundImage: `url(${BG})` }}>
                <div data-aos="zoom-in" className="landing-content container">
                    <div className="landing-text">
                        <h1 className="slogan-text">Servicios Técnicos</h1>
                        <p className="landing-parrafo">Consequat consectetur reprehenderit aliqua fugiat. Irure culpa minim cupidatat nostrud enim sunt Et est et consequat ad sit aute. Mollit ipsum irure nisi ex eiusmod amet elit dolore ea elit laboris. Qui exercitation officia aliqua reprehenderit. Aliquip commodo et aliqua deserunt ipsum labore fugiat.</p>
                        <div className="landing-button-container">
                            <Link className="landing-button-text" to="/turnos/create">
                                <Button className="landing-button">
                                    Hacer cita
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Landing;
