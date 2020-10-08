import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {Update} from "../components/turno";

class TurnosUpdatePage extends Component {
    render() {
        return (
            <div className="turnos-update-page">
                <Update />
                <Footer />
            </div>
        );
    }
}

TurnosUpdatePage.propTypes = {};

export default TurnosUpdatePage;