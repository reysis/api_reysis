import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { clearError, registerFetch } from "../../redux/auth/authActions";
import { tipoUsuarioFetch } from "../../redux/tipo_usuario/tipoUsuarioActions"

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faUserTag, faTag } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [email, setEmail] = useState("")
    const [tipoUsuario, setTipoUsuario] = useState("")
    const [telephone, setTelephone] = useState("")
    const [address, setAddress] = useState("")
    
    const [arePasswordMatch, setArePasswordMatch] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    const [disableForm, setDisableForm] = useState(true)

    const tipoUsuarioSelect = useRef(null);
    
    var timeout = null;
    
    const authLoading = useSelector(state => state.auth.loading)
    const authAuthenticated = useSelector(state => state.auth.authenticated)
    const authError = useSelector(state => state.auth.error)

    const tipoUsuarioLoading = useSelector(state => state.tipoUsuario.loading)
    const tipoUsuarioList = useSelector(state => state.tipoUsuario.tipoUsuarios)
    const tipoUsuarioError = useSelector(state => state.tipoUsuario.error)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearError())
        dispatch(tipoUsuarioFetch())
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(username.length == 0 
            || password.length == 0 
            || !validEmail 
            || tipoUsuarioList.find((t) => (t == tipoUsuario)) 
            || telephone.length == 0) return;

        this.props.registerUser({
            username,
            password,
            email,
            tipoUsuario,
            telephone,
            address
        })
    }

    useEffect(() => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            let t = /[a-z](\.?[a-z0-9-_]+)*@[a-z0-9-_](\.?[a-z0-9-_]+)*\.[a-z]+/.exec(email);
            setValidEmail(() => {
                return t && email.length == t[0].length && t.index == 0 && email.length > 0
            })
        }, 1000);
    }, [email])

    useEffect(() => {
        setArePasswordMatch(() => {
            return password.length > 0 && passwordCheck.length > 0 && password == passwordCheck
        })
    }, [password, passwordCheck])

    useEffect(() => {

        setDisableForm(() => {
            return username.length > 0 
            && arePasswordMatch
            && validEmail
            && !authLoading
            && !tipoUsuarioLoading
            && tipoUsuarioList.find((t) => (t == tipoUsuario)) 
            && telephone.length > 0
        })

    }, [arePasswordMatch, validEmail, username, tipoUsuario, telephone, tipoUsuarioLoading, authLoading])

    if(authAuthenticated)
        return <Redirect to={"/"} />
    return (
        <Col className="content-wrap container" lg={6} >
            <Alert role={"status"} variant={"info"} show={authLoading || tipoUsuarioLoading}>Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={authError} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {authError}
            </Alert>
            <Alert role={"alert"} variant={"danger"} show={tipoUsuarioError} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {tipoUsuarioError}
            </Alert>
            <Form onSubmit={handleSubmit} className="form-register wrapper">
                <Form.Group className="form-header form-in-center">
                    <h2>Súmese a nosotros!</h2>
                    <span>Entre todos los datos para completar el registro</span>
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

                <Form.Group className="email-group">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="email">
                                <FontAwesomeIcon icon={faAt} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control type="email" placeholder="Correo Electrónico" isInvalid={!validEmail} isValid={validEmail} value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="form-group-password">
                    <Form.Group className="password-group-1">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="password">
                                    <FontAwesomeIcon icon={faLock} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="password" placeholder="Contraseña" isValid={arePasswordMatch} value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="password-group-2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="passwordCheck">
                                    <FontAwesomeIcon icon={faRedoAlt} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="password" placeholder="Confirmar Contraseña" isValid={arePasswordMatch} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} ></Form.Control>
                        </InputGroup>
                    </Form.Group>
                </Form.Group>

                <Form.Group className="tipo-usuario-group" >
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="passwordCheck">
                                <FontAwesomeIcon icon={faTag} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control ref={tipoUsuarioSelect} className="custom-select" disabled={tipoUsuarioLoading || tipoUsuarioError} as="select" defaultValue={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} >
                            <option value="" >Tipo de Usuario ...</option>
                            {
                                tipoUsuarioList.map(tu => ( 
                                    <option key={tu.id} value={tu.id}>{tu.tipo}</option> 
                                ))
                            }
                        </Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="telephone-group">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="telephone">
                                <FontAwesomeIcon icon={faPhone} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Teléfono" value={telephone} onChange={(e) => setTelephone(e.target.value)} ></Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group className="address-group">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <label className="input-group-text" htmlFor="address">
                                <FontAwesomeIcon icon={faAddressBook} />
                            </label>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Dirección Particular" value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
                    </InputGroup>
                </Form.Group>

                <Form.Group>
                    <small id="fileHelp" className="form-text text-muted mb-2">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></small>
                    <Button variant="primary" block disabled={disableForm} type="submit">Registrarse</Button>
                </Form.Group>

                <Form.Group className="form-in-center">
                    <div className="mb-3 mx-4 register-separator">
                        <p className="mt-2 mb-3 hr">o</p>
                        <Link to="/login" className="form-link">Iniciar Sesión</Link>
                    </div>
                </Form.Group>

            </Form>
        </Col>
    )
}

Register.propTypes = {

}

export default Register