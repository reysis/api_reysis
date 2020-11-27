import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { clearError, loginFetch } from "../../redux/auth/authActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const Login = () => {

    const loading = useSelector(state => state.auth.loading)
    const authenticated = useSelector(state => state.auth.authenticated)
    const error = useSelector(state => state.auth.error)

    const dispatch = useDispatch()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [disabledForm, setDisabledForm] = useState(true)
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if(username.length == 0 || password.length == 0) return;
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

    if(authenticated)
        return <Redirect to='/' />
    return (
        <Col className="content-wrap container" lg={6} >
            <Alert role={"status"} variant={"info"} show={loading} >Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            <Form onSubmit={handleSubmit} className="form-login" >
                <Form.Group className="form-header form-in-center">
                    <h2>Iniciar Sesión</h2>
                    <span>Entre sus datos para iniciar sessión</span>
                </Form.Group>

                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="username" >
                                <FontAwesomeIcon icon={faUser} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control type="user" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="password">
                                <FontAwesomeIcon icon={faLock} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <Button variant="primary" block type="submit" disabled={disabledForm} >Entrar</Button>
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