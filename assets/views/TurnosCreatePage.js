import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import {Create} from "../components/turno";

class TurnosCreatePage extends Component {
    render() {
        return (
            <div className="turnos-crete-page">
                <Create />
                <Footer />
            </div>
        );
    }
}

TurnosCreatePage.propTypes = {};

export default TurnosCreatePage;