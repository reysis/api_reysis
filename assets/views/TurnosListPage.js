import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListTurno from "../components/turno/ListTurno";

const TurnosListPage = () => {
    return (
        <main className="content-wrap turnos-list-page page">
            <div className="header">
                <h1><span>Listado de Turnos</span></h1>
            </div>
            <ListTurno/>
        </main>
    )
}

export default TurnosListPage;