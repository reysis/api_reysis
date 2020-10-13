import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Footer from "../components/Footer";
import Register from "../components/user/Register";

class RegisterPage extends Component {
    render() {
        return (
            <div className="register-page">
                <Register />
                <Footer/>
            </div>
        );
    }
}

RegisterPage.propTypes = {};

export default RegisterPage;