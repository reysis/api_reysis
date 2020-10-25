import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import Register from "../components/user/Register";
import { Row } from 'react-bootstrap';

class RegisterPage extends Component {
    render() {
        return (
            <Row className="content-wrap register-page page">
                <Register />
            </Row>
        );
    }
}

RegisterPage.propTypes = {};

export default RegisterPage;