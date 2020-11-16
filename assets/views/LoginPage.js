import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../components/user/Login";
import { Row } from 'react-bootstrap';

class LoginPage extends Component {
    render() {
        return (
            <Row className="content-wrap login-page page">
                <Login />
            </Row>
        );
    }
}

LoginPage.propTypes = {};

export default LoginPage;