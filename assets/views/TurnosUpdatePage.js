import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {Update} from "../components/turno";

class TurnosUpdatePage extends Component {
    render() {
        return (
            <div className="content-wrap turnos-update-page">
                <div className="header">
                    <h1><span>Editar Turno</span></h1>
                </div>
                <Update />
            </div>
        );
    }
}

TurnosUpdatePage.propTypes = {};

export default TurnosUpdatePage;