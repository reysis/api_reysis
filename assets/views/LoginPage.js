import React from 'react';
import PropTypes from 'prop-types';
import Login from "../components/user/Login";

const LoginPage = () => {
    return (
        <main className="content-wrap login-page page">
            <Login />
        </main>
    )
}

LoginPage.propTypes = {};

export default LoginPage;