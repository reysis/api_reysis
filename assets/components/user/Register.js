import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearError, registerFetch } from "../../redux/auth/authActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Row, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faIdCard, faBars } from '@fortawesome/free-solid-svg-icons';
import Phones from "../Phones";

const Register = () => {

    const [name, setName] = useState("")
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
    // const [validPhone, setValidPhone] = useState(false)

    var timeout = null,
        timeout2 = null,
        timeout3 = null,
        timeout4 = null,
        timeout5 = null

    const authLoading = useSelector(state => state.auth.loading)
    const authAuthenticated = useSelector(state => state.auth.authenticated)
    const authError = useSelector(state => state.auth.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearError())
    }, [])

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
            || authLoading) return;


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
            profilePicture:{
                data: "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",
                filename: "user-default.png"
            },
            username,
            email,
            password,
            nationality
        }
        console.log(request);

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

    // useEffect(() => {
    //     if (timeout4) clearTimeout(timeout4)
    //     timeout4 = setTimeout(() => {
    //         let reg = new RegExp("^[0-9 \+\(\)]+$");
    //         setValidPhone(() => reg.test(phone))
    //     }, 1000);
    // }, [phone])

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
            console.log("TODO:",!username.length
                || (!name.length && !lastname.length)
                || !password.length
                || !validPassword
                || !arePasswordMatch
                || !email.length
                || !validEmail
                || !phones.length
                || !address.length);
            console.log("USERNAME:",!username.length)
            console.log("NAME:",(!name.length && !lastname.length))
            console.log("PASSWORD:",!password.length)
            console.log("VALID PASSWORD:",!validPassword)
            console.log("PASSWORD MATCH: ",!arePasswordMatch)
            console.log("EMAIL: ",!email.length)
            console.log("VALID EMAIL: ",!validEmail)
            console.log("PHONES",!phones.length)
            console.log("ADDRESS: ",!address.length)
            console.log("CI:", !cid.length);
            console.log("CI:", !validCid);

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

    if (authAuthenticated)
        return <Redirect to='/' />
    return (
        <Container>
            <Alert role={"status"} variant={"info"} show={authLoading}>Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={authError} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {authError}
            </Alert>
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
                                        <Form.Control type="name" id="register-name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} required={true} />
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
                                    <Form.Control type="id" id="register-cid" placeholder="Carner Identidad" title="El carnet de identidad tiene 11 números" value={cid} isValid={cid.length && validCid} isInvalid={cid.length && !validCid} onChange={(e) => setCid(e.target.value)} required={true} />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-0">
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
                                        <Form.Control type="password" id="register-password" title="Mínimo 6 caracteres, al menos 1 mayúscula, minúscula y número" placeholder="Contraseña" isValid={password.length && arePasswordMatch && validPassword} isInvalid={password.length >= 6 && !validPassword} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
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
                            <Phones phones={phones} setPhones={setPhones} enableEdit={true} />

                            <Form.Group className="register-condition-term">
                                <span className="form-text text-muted mx-5">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></span>
                            </Form.Group>

                            <Form.Group className="register-submit">
                                <Button variant="primary" block disabled={disabledForm} type="submit">Registrarse</Button>
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