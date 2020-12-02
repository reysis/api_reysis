import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { clearError, registerFetch } from "../../redux/auth/authActions";

import { Redirect, Link } from "react-router-dom";

import { Button, Form, InputGroup, Col, Alert, Container } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faIdCard, faBars } from '@fortawesome/free-solid-svg-icons';

const Register = () => {

    const [name, setName] = useState("")
    const [lastname, setLastname] = useState("")
    const [cid, setCid] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [passwordCheck, setPasswordCheck] = useState("")
    const [email, setEmail] = useState("")

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
            || !phone.length
            || !phoneType.length
            || !address.length
            || authLoading) return;

        const phoneNumbers = [{
            phoneType,
            number: phone
        }]

        const persona = {
            nombre: [name, lastname].join(' '),
            ci: cid
        }

        const nationality = "Cubano"

        dispatch(registerFetch({
            persona,
            phoneNumbers,
            address: {
                postAddress: address,
                indications: address
            },
            username,
            email,
            password,
            nationality
        }))
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

        setDisabledForm(() => {
            return !username.length
                || (!name.length && !lastname.length)
                || !password.length
                || !validPassword
                || !arePasswordMatch
                || !email.length
                || !validEmail
                || !phone.length
                || !phoneType.length
                || !address.length
                || authLoading
        })

    }, [username, name, lastname, password, arePasswordMatch, validPassword, email, validEmail, phone, phoneType, address, authLoading])

    if (authAuthenticated)
        return <Redirect to='/' />
    return (
        <Container>
            <Alert role={"status"} variant={"info"} show={authLoading}>Loading...</Alert>
            <Alert role={"alert"} variant={"danger"} show={authError} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {authError}
            </Alert>
            <Col lg={6} className="mx-auto my-3">
                <Form onSubmit={handleSubmit} className="form-register p-3">
                    <Form.Group className="form-header text-center mb-4">
                        <h2 className="mb-0"><span>Súmese</span> a nosotros</h2>
                        <span>Entre todos los datos para completar el registro</span>
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} md={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="register-name" >
                                        <FontAwesomeIcon icon={faUser} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control type="name" id="register-name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="register-lastname" >
                                        <FontAwesomeIcon icon={faUser} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control type="lastname" id="register-lastname" placeholder="Apellidos" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Row>
                        <Form.Group as={Col} md={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="register-phone">
                                        <FontAwesomeIcon icon={faPhone} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control type="phone" id="register-phone" placeholder="Número de Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} ></Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="register-phone-type">
                                        <FontAwesomeIcon icon={faBars} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control as="select" id="register-phone-type" className="custom-select" as="select" defaultValue={phoneType} onChange={(e) => setPhoneType(e.target.value)} >
                                    <option value="" >Tipo de Télefono ...</option>
                                    {
                                        phoneTypes.map((value, index) => (
                                            <option key={index} value={value}>{value}</option>
                                        ))
                                    }
                                </Form.Control>
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
                            <Form.Control type="id" id="register-cid" placeholder="Carner Identidad" title="11 números" value={cid} isValid={cid.length && validCid} isInvalid={cid.length && !validCid} onChange={(e) => setCid(e.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-0">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="register-address">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="text" id="register-address" placeholder="Dirección Particular" value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <div className="mx-4 my-2 register-separator">
                        <p className="mb-0 hr">o</p>
                    </div>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="register-username" >
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="user" id="register-username" placeholder="Usuario" title="Solo letras, números and guión bajo" isValid={username.length && validUsername} isInvalid={username.length >= 3 && !validUsername} value={username} onChange={(e) => setUsername(e.target.value)} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="register-email">
                                    <FontAwesomeIcon icon={faAt} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control type="email" id="register-email" placeholder="Correo Electrónico" isInvalid={email.length && !validEmail} isValid={email.length && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
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
                                <Form.Control type="password" id="register-password" title="Mínimo 6 caracteres, al menos 1 mayúscula, minúscula y número" placeholder="Contraseña" isValid={password.length && arePasswordMatch && validPassword} isInvalid={password.length >= 6 && !validPassword} value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} md={6}>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="register-passwordCheck">
                                        <FontAwesomeIcon icon={faRedoAlt} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control type="password" id="register-passwordCheck" placeholder="Confirmar Contraseña" isValid={arePasswordMatch && validPassword} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} ></Form.Control>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>

                    <Form.Group>
                        <small id="fileHelp" className="form-text text-muted mb-2">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></small>
                        <Button variant="primary" block disabled={disabledForm} type="submit">Registrarse</Button>
                    </Form.Group>

                    <Form.Group className="mb-0">
                        <div className="mx-4 register-separator">
                            <p className="mt-2 mb-3 hr">o</p>
                            <Link to="/login" className="form-link">Iniciar Sesión</Link>
                        </div>
                    </Form.Group>

                </Form>
            </Col>

        </Container>
    )
}

Register.propTypes = {

}

export default Register