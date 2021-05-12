import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { registerFetch } from "../../redux/auth/register/authRegisterActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Row, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faIdCard, faBars } from '@fortawesome/free-solid-svg-icons';
import Phones from "../Phones";
import Toast from "../Utils/Toast";

const Register = () => {

    const [name, setName] = useState("")
    const [changedName, setChangedName] = useState(false);
    const [lastname, setLastname] = useState("")
    const [cid, setCid] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [email, setEmail] = useState("")
    const [phones, setPhones] = useState([]);

    const [phoneType, setPhoneType] = useState("")
    const [phone, setPhone] = useState("")

    const [phoneTypes] = useState([
        "Casa",
        "Personal",
        "Trabajo"
    ])

    const [address, setAddress] = useState("")

    const [arePasswordMatch, setArePasswordMatch] = useState(false)
    const [disabledForm, setDisabledForm] = useState(true)

    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)
    const [validCid, setValidCid] = useState(false)
    const [validUsername, setValidUsername] = useState(false)
    const [invalidPhones, setInvalidPhones] = useState(false);
    const [invalidPass, setInvalidPass] = useState(false);
    const [buttonText, setButtonText] = useState('Registrarse')
    // const [validPhone, setValidPhone] = useState(false)

    var timeout = null,
        timeout2 = null,
        timeout3 = null,
        timeout4 = null,
        timeout5 = null,
        timeout6 = null,
        timeout7 = null

    const authLoading = useSelector(state => state.auth.register.loading)
    const authAuthenticated = useSelector(state => state.auth.login.authenticated)
    const authError = useSelector(state => state.auth.register.error)

    const dispatch = useDispatch()

    useEffect(()=>{
        if(authLoading)
            setButtonText('Registrando...')
        if(!authLoading)
            setButtonText('Registrarse')
    }, [authLoading])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!username.length
            || (!name.length && !lastname.length)
            || !password.length
            || !validPassword
            || !arePasswordMatch
            || !email.length
            || !validEmail
            || !phones.length
            || !address.length
            || authLoading){
            if(!phones.length){
                if(timeout6)
                    clearTimeout(timeout6);

                setInvalidPhones(true)
                timeout6 = setTimeout(()=>{
                    setInvalidPhones(false)
                    },5000);
            }else if(!validPassword || !arePasswordMatch){
                if(timeout7)
                    clearTimeout(timeout7);

                setInvalidPass(true)
                timeout7 = setTimeout(()=>{
                    setInvalidPass(false)
                },5000);
            }
            return;
        }


        const persona = {
            nombre: [name, lastname].join(' '),
            ci: cid
        }

        const nationality = "Cubano"

        let request = {
            persona,
            phoneNumbers: phones,
            address: {
                postAddress: address,
                indications: address
            },
            username,
            email,
            password,
            nationality
        }

        dispatch(registerFetch(request))
    }

    useEffect(() => {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            // RFC
            let reg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
            setValidEmail(() => reg.test(email))
        }, 1000);
    }, [email])

    useEffect(() => {
        if (timeout2) clearTimeout(timeout2)
        timeout2 = setTimeout(() => {
            let reg = /^[0-9]{11,11}$/
            setValidCid(() => reg.test(cid))
        }, 1000);
    }, [cid])

    useEffect(() => {
        if (timeout3) clearTimeout(timeout3)
        timeout3 = setTimeout(() => {
            let reg = /^(\w{3,})$/
            setValidUsername(() => reg.test(username))
        }, 1000);
    }, [username])

    useEffect(() => {
        if (timeout5) clearTimeout(timeout5)
        timeout5 = setTimeout(() => {
            let reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/
            setValidPassword(() => reg.test(password))
        }, 1000);
    }, [password])

    useEffect(() => {
        setArePasswordMatch(() => {
            return password.length > 0 && passwordCheck.length > 0 && password == passwordCheck
        })
    }, [password, passwordCheck])

    useEffect(() => {
        if(timeout4) clearTimeout(timeout4);
        timeout4 = setTimeout(() => {
            setDisabledForm(() => {
                return !username.length
                    || (!name.length && !lastname.length)
                    || !password.length
                    || !validPassword
                    || !arePasswordMatch
                    || !email.length
                    || !validEmail
                    || !phones.length
                    || !address.length
                    || !cid.length
                    || !validCid
            })
        }, 1000);

    }, [username, cid, name, lastname, password, passwordCheck, email, phones, address])

    useEffect(()=>{
        if(authAuthenticated){
            Toast.success("Bienvenido a nuestra comunidad! Será siempre un placer atenderlo.")
        }
    }, [authAuthenticated])

    useEffect(()=>{
        if(authError){
            Toast.error(authError);
        }
    }, [authError])

    if (authAuthenticated)
        return <Redirect to='/' />
    return (
        <Container>
            <Row>
                <Form id="form-register" onSubmit={handleSubmit} className="mx-auto my-3 pb-3 col-xl-9 col-lg-10 col-md-12 form-register">
                    <Row>
                        <Col md={4} className="d-none d-md-flex flex-column register-left-side">
                            <h2 className="mt-auto">¿Ya tienes una cuenta?</h2>
                            <p className="my-3">Inicia sesión y accede a tu Panel de control.</p>
                            <Link to="/login" className="mb-auto mt-3 mx-auto"><Button variant="outline-light">Iniciar sesión</Button></Link>
                        </Col>

                        <Col className="register-content" md={8}>

                            <Form.Group className="form-header text-center my-4">
                                <h2 className="mb-2"><span>Registrarse</span></h2>
                                <span>¡Qué gusto tenerte aquí!</span>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} md={6}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <label className="input-group-text" htmlFor="register-name" >
                                                <FontAwesomeIcon icon={faUser} />
                                            </label>
                                        </InputGroup.Prepend>
                                        <Form.Control type="name" id="register-name" placeholder="Nombre" value={name} onChange={(e) => {setChangedName(true); setName(e.target.value)}} required={true} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <label className="input-group-text" htmlFor="register-lastname" >
                                                <FontAwesomeIcon icon={faUser} />
                                            </label>
                                        </InputGroup.Prepend>
                                        <Form.Control type="lastname" id="register-lastname" placeholder="Apellidos" value={lastname} onChange={(e) => setLastname(e.target.value)} required={true} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group >
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-cid" >
                                            <FontAwesomeIcon icon={faIdCard} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="id" id="register-cid" placeholder="Carnet Identidad" title="El carnet de identidad tiene 11 números" value={cid} isValid={cid.length && validCid} isInvalid={cid.length && !validCid} onChange={(e) => setCid(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group >
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-address">
                                            <FontAwesomeIcon icon={faAddressBook} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="text" id="register-address" placeholder="Dirección Particular" value={address} onChange={(e) => setAddress(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-username" >
                                            <FontAwesomeIcon icon={faUser} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="user" id="register-username" placeholder="Usuario" title="Solo letras, números and guión bajo" isValid={username.length && validUsername} isInvalid={username.length >= 3 && !validUsername} value={username} onChange={(e) => setUsername(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <label className="input-group-text" htmlFor="register-email">
                                            <FontAwesomeIcon icon={faAt} />
                                        </label>
                                    </InputGroup.Prepend>
                                    <Form.Control type="email" id="register-email" placeholder="Correo Electrónico" isInvalid={email.length && !validEmail} isValid={email.length && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Row>
                                <Form.Group as={Col} md={6}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <label className="input-group-text" htmlFor="register-password">
                                                <FontAwesomeIcon icon={faLock} />
                                            </label>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" id="register-password" title="Mínimo 6 caracteres, al menos 1 mayúscula, minúscula y número" placeholder="Contraseña" isValid={arePasswordMatch && validPassword} isInvalid={password.length >= 6 &&!validPassword} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group as={Col} md={6}>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <label className="input-group-text" htmlFor="register-passwordCheck">
                                                <FontAwesomeIcon icon={faRedoAlt} />
                                            </label>
                                        </InputGroup.Prepend>
                                        <Form.Control type="password" id="register-passwordCheck" placeholder="Confirmar Contraseña" isValid={arePasswordMatch && validPassword} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} required={true} />
                                    </InputGroup>
                                </Form.Group>
                            </Form.Row>
                            {invalidPhones && <Alert variant="danger">Introduzca al menos un teléfono</Alert>}
                            {invalidPass && <Alert variant="danger">La contraseña que introdujo no cumple los requisitos o no coinciden por favor verifique</Alert>}
                            <Phones phones={phones} setPhones={setPhones} enableEdit={true} />

                            <Form.Group className="register-condition-term">
                                <span className="form-text text-muted mx-5">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></span>
                            </Form.Group>

                            <Form.Group className="register-submit">
                                <Button variant="primary" block type="submit">{buttonText}</Button>
                            </Form.Group>

                            <Form.Group className="d-md-none register-sub-text">
                                <span className="mr-3">¿Ya te registraste?</span>
                                <Link to="/login" className="form-link">Iniciar sesión</Link>
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

            </Row>
        </Container>
    )
}

Register.propTypes = {

}

export default Register