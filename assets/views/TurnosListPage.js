import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {List} from "../components/turno";

class TurnosListPage extends Component {
    render() {
        return (
            <div className="content-wrap turnos-list-page">
                <div className="header">
                    <h1><span>Listado de Turnos</span></h1>
                </div>
                <List/>
            </div>
        );
    }
}

TurnosListPage.propTypes = {};

export default TurnosListPage;