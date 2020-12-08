import React from 'react';
import PropTypes from 'prop-types';
import Register from "../components/user/Register";

const RegisterPage = () => {
    return (
        <main className="content-wrap register-page page">
            <Register />
        </main>
    )
}

RegisterPage.propTypes = {};

export default RegisterPage;