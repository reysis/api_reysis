import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { loginFetch } from "../../redux/auth/login/authLoginActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Row, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faExclamationTriangle, faUserCircle, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

const Login = (props) => {

    const loading = useSelector(state => state.auth.login.loading)
    const authenticated = useSelector(state => state.auth.token.authenticatedUser)
    const error = useSelector(state => state.auth.login.error)

    const dispatch = useDispatch()

    const [securePIN, setSecurePIN] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [disabledForm, setDisabledForm] = useState(true)

    const location = useLocation()
    //const {from} = this.props.location.state

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginFetch({ username, password }))
    }

    useEffect(() => {
        setDisabledForm(() => {
            return username.length === 0
                || password.length === 0
                || loading
        })
    }, [username, password, loading])

    if (authenticated) {
        if(location.state){
            return <Redirect to={location.state.from.pathname}/>
        }else{
            return <Redirect to={"/"}/>
        }
    }
    console.log("ERROR:",error);
    return (
        <Container>
            <Alert role={"status"} variant={"info"} show={loading} >Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={error !== null} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            <Row>
                <Form onSubmit={handleSubmit} className="mx-auto my-3 pb-3 col-xl-8 col-lg-9 col-md-12 form-login" >
                    <Row>
                        <Col className="login-content" md={8}>
                            <div className="form-header text-center my-4">
                                <h2 className="mb-2"><span>¡Hola!</span></h2>
                                <span>Puedes iniciar sesión en tu cuenta de Reysis aquí.</span>
                            </div>

                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="login-username" >
                                            <FontAwesomeIcon icon={faUserCircle} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="user" id="login-username" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-0">
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="login-password">
                                            <FontAwesomeIcon icon={faLock} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="password" id="login-password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <div className="mx-4 my-2 login-separator s-2x">
                                <p>o</p>
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

                            <Form.Group className="login-forgot-password">
                                <span className="form-text text-muted text-center"><a href="#">¿Has olvidado tu contraseña?</a></span>
                            </Form.Group>

                            <Form.Group className="login-submit">
                                <Button variant="primary" type="submit" block disabled={disabledForm} >Iniciar sesión</Button>
                            </Form.Group>

                            <Form.Group className="d-md-none login-sub-text">
                                <span className="mr-3">¿Primera vez por aquí?</span>
                                <Link to="/register" className="form-link">Registrarse</Link>
                            </Form.Group>
                        </Col>
                        <Col md={4} className="d-none d-md-flex flex-column login-rigth-side">
                            <h2 className="mt-auto">¿Primera vez por aquí?</h2>
                            <p className="my-3">¡Vamos! Regístrate ahora y súmese a nuestra comunidad.</p>
                            <Link to="/register" className="mb-auto mt-3 mx-auto"><Button variant="outline-light">Registrarse</Button></Link>
                        </Col>
                    </Row>
                </Form>
            </Row>
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