import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import Register from "../components/user/Register";

class RegisterPage extends Component {
    render() {
        return (
            <main className="content-wrap register-page page">
                <Register />
                <Footer/>
            </main>
        );
    }
}

RegisterPage.propTypes = {};

export default RegisterPage;