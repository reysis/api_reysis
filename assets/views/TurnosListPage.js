import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {List} from "../components/turno";

class TurnosListPage extends Component {
    render() {
        return (
            <div className="turnos-list-page">
                <List/>
                <Footer/>
            </div>
        );
    }
}

TurnosListPage.propTypes = {};

export default TurnosListPage;