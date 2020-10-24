import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import { login } from "../../actions/user/authentication";
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { reset } from "../../actions/turno/create";

import { Button, Form, InputGroup, Card } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

class Login extends Component {
    static propTypes = {
        logged: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        login: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        username: PropTypes.string,
        password: PropTypes.string
    };
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.login({
            'username': this.state.username,
            'password': this.state.password
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        console.log(this.props.logged);
        if (this.props.logged) {
            return (
                <Redirect to='/'
                />
            );
        }
        return (
            <div className="container">
                {this.props.loading && (
                    <div className="alert alert-info" role="status">
                        Loading...
                    </div>
                )}
                {this.props.error && (
                    <div className="alert alert-danger" role="alert">
                        <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                        {this.props.error}
                    </div>
                )}
                <Form onSubmit={this.handleSubmit} className="form-login" >
                    {/* <div className="header">
                        <h1><span>Iniciar sesión</span></h1>
                    </div> */}
                    <Form.Group className="form-header form-in-center">
                        <h3>Iniciar Sesión</h3>
                        <p>Entre sus datos para iniciar sessión</p>
                    </Form.Group>

                    <Form.Group>
                        {/* <Form.Label>Usuario</Form.Label> */}
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" for="username" >
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id='username' type="user" placeholder="Usuario" onChange={this.handleChange} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        {/* <Form.Label>Password</Form.Label> */}
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" for="password">
                                    <FontAwesomeIcon icon={faLock} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id="password" type="password" placeholder="Contraseña" onChange={this.handleChange}></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" block >Entrar</Button>
                    </Form.Group>

                    <Form.Group className="form-in-center">
                        <p className="my-2 text-left">¿Olvidaste tu contraseña?, click <a href="#">aquí</a></p>
                        <div className="mb-3 mx-4 login-separator">
                            <p className="my-2 hr">o</p>
                            <Link to="/register" className="card-link">Regístrese</Link>
                        </div>
                    </Form.Group>
                </Form>
            </div >
        );
    }
}

const mapStateToProps = state => {
    const {
        logged,
        loading,
        error,
    } = state.user.auth;
    return { logged, loading, error };
}

const mapDispatchToProps = dispatch => ({
    login: user => dispatch(login(user)),
    reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);