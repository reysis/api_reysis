import React, { Component, useContext } from 'react';
import PropTypes from 'prop-types';
import { login } from "../../actions/user/authentication";
import { connect } from 'react-redux';
import { Redirect, Link } from "react-router-dom";
import { reset } from "../../actions/turno/create";

import { Button, Form, InputGroup, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

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

        this.props.reset();

        this.props.login({
            username: this.state.username,
            password: this.state.password
        })
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        console.log(this.props.logged);
        console.log(nextProps.logged);
    }

    render() {
        if (this.props.logged) {
            return (
                <Redirect to='/' />
            );
        }
        return (
            <Col className="content-wrap container" lg={6} >
                <Alert role={"status"} variant={"info"} show={this.props.loading}>Loading...</Alert>
                <Alert role={"alert"} variant={"danger"} show={this.props.error} >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                    {this.props.error}
                </Alert>
                <Form onSubmit={this.handleSubmit} className="form-login" >
                    <Form.Group className="form-header form-in-center">
                        <h2>Iniciar Sesión</h2>
                        <spam>Entre sus datos para iniciar sessión</spam>
                    </Form.Group>

                    <Form.Group>
                        {/* <Form.Label>Usuario</Form.Label> */}
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="username" >
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
                                <label className="input-group-text" htmlFor="password">
                                    <FontAwesomeIcon icon={faLock} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id="password" type="password" placeholder="Contraseña" onChange={this.handleChange}></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" block type="submit" >Entrar</Button>
                    </Form.Group>

                    <Form.Group className="form-in-center">
                        <small className="form-text text-muted my-2 text-left">¿Olvidaste tu contraseña?, Haga <a href="#">click aquí</a></small>
                        <div className="mb-3 mx-4 login-separator">
                            <p className="mt-2 mb-3 hr">o</p>
                            <Link to="/register" className="form-link">Registrarse</Link>
                        </div>
                    </Form.Group>
                </Form>
            </Col>
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
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);