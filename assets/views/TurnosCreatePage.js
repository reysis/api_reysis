import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {Create} from "../components/turno";

class TurnosCreatePage extends Component {
    render() {
        return (
            <main className="content-wrap turnos-crete-page">
                <div className="header">
                    <h1><span>Crear Turno</span></h1>
                </div>
                <Create />
                <Footer />
            </main>
        );
    }
}

TurnosCreatePage.propTypes = {};

export default TurnosCreatePage;