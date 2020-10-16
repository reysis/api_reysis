import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import Register from "../components/user/Register";

class RegisterPage extends Component {
    render() {
        return (
            <main className="content-wrap register-page page">
                <div className="header">
                    <h1><span>Súmese a nosotros!</span></h1>
                </div>
                <Register />
                <Footer/>
            </main>
        );
    }
}

RegisterPage.propTypes = {};

export default RegisterPage;