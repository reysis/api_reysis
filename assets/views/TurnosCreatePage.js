import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {Create} from "../components/turno";

class TurnosCreatePage extends Component {
    render() {
        return (
            <main className="content-wrap turnos-crete-page page">
                <div className="header">
                    <h1><span>Busquemos el momento adecuado!</span></h1>
                </div>
                <Create />
            </main>
        );
    }
}

TurnosCreatePage.propTypes = {};

export default TurnosCreatePage;