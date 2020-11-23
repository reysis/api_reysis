import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import landingBackground from '../assets/landing-background.png';

const Landing = () => {
    return (
        <section 
            id="landing" 
            className="landing-page container-fluid page" 
            style={{ 
                backgroundImage: `url(${landingBackground})`
            }}
        >
            {/* <div className="overlay" /> */}
            <div className="landing-content container">
                <div className="landing-text">
                    <div>
                        <h1 data-aos="fade-up" className="slogan-text">Servicios Técnicos</h1>
                        <p data-aos="fade-up" className="landing-parrafo">Consequat consectetur reprehenderit aliqua fugiat. Irure culpa minim cupidatat nostrud enim sunt Et est et consequat ad sit aute. Mollit ipsum irure nisi ex eiusmod amet elit dolore ea elit laboris. Qui exercitation officia aliqua reprehenderit. Aliquip commodo et aliqua deserunt ipsum labore fugiat.</p>
                        <Link data-aos="fade-up" className="landing-button-text" to="/turnos/create">
                            <button className="landing-button">Hacer cita</button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Landing;
