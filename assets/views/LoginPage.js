import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Login from "../components/user/Login";
import Footer from "../components/Footer";

class LoginPage extends Component {
    render() {
        return (
            <main className="content-wrap login-page page">
                <Login />
                <Footer />
            </main>
        );
    }
}

LoginPage.propTypes = {};

export default LoginPage;