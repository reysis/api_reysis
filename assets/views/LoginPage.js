import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../components/user/Login";
import Footer from "../components/Footer";

class LoginPage extends Component {
    render() {
        return (
            <div className="login-page">
                <Login />
                <Footer />
            </div>
        );
    }
}

LoginPage.propTypes = {};

export default LoginPage;