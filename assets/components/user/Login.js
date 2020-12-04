import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { clearError, loginFetch } from "../../redux/auth/authActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle, faUserCircle, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Login = () => {

    const loading = useSelector(state => state.auth.loading)
    const authenticated = useSelector(state => state.auth.authenticated)
    const error = useSelector(state => state.auth.error)

    const dispatch = useDispatch()

    const [securePIN, setSecurePIN] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [disabledForm, setDisabledForm] = useState(true)

    const location = useLocation()

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.length == 0 || password.length == 0) return;
        dispatch(clearError())
        dispatch(loginFetch({ username, password }))
    }

    useEffect(() => {
        setDisabledForm(() => {
            return username.length == 0
                || password.length == 0
                || loading
        })
    }, [username, password, loading])

    if (authenticated) {
        console.log(location)
        //console.log(location.state.redirect)
        if (location && location.search == '?redirect' && location.state && location.state.redirect) {
            return <Redirect to={{
                pathname: location.state.redirect,
                state: { ...location.state }
            }} />
        }
        return <Redirect to='/' />
    }
    return (
        <Container >
            <Alert role={"status"} variant={"info"} show={loading} >Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            <Col lg={6} className="mx-auto my-3">
                <Form onSubmit={handleSubmit} className="form-login p-3" >
                    <Form.Group className="form-header text-center mb-4">
                        <h2 className="mb-0"><span>Iniciar</span> Sesión</h2>
                        <span>Entre sus datos para iniciar sessión</span>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="login-username" >
                                    <FontAwesomeIcon icon={faUserCircle} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="user" id="login-username" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-0">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="login-password">
                                    <FontAwesomeIcon icon={faLock} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="password" id="login-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <div className="mx-4 my-2 login-separator">
                        <p className="mb-0 hr">o</p>
                    </div>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="login-pin" >
                                    <FontAwesomeIcon icon={faUserShield} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="user" id="login-pin" placeholder="PIN de Seguridad" value={securePIN} onChange={(e) => setSecurePIN(e.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" block type="submit" disabled={disabledForm} >Entrar</Button>
                    </Form.Group>

                    <Form.Group className="mb-0">
                        <small className="form-text text-muted my-2 text-left">¿Olvidaste tu contraseña?, Haga <a href="#">click aquí</a></small>
                        <div className="mx-4 login-separator">
                            <p className="mt-2 mb-3 hr">o</p>
                            <Link to="/register" className="form-link">Registrarse</Link>
                        </div>
                    </Form.Group>
                </Form>
            </Col>
        </Container>
    )
}

Login.propTypes = {
    loading: PropTypes.bool,
    authenticated: PropTypes.bool,
    user: PropTypes.object,
    error: PropTypes.string,
    loginFetch: PropTypes.func,
    clearError: PropTypes.func,
    username: PropTypes.string,
    password: PropTypes.string
}

export default Login