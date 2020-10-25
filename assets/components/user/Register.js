import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from "react-router-dom";
import { register, reset } from "../../actions/user/authentication";
import { connect } from 'react-redux';

import { Button, Form, InputGroup, Col, Alert } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faUserTag, faTag } from '@fortawesome/free-solid-svg-icons';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            arePasswordMatch: false,
            invalidEmail: false,
            validEmail: false
        }

        this.timeout = null;

        this.refSelect = React.createRef();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let iriTipoUsuario;
        if (this.state.tipoUsuario == "persona-natural")
            iriTipoUsuario = "/api/tipo_usuarios/1";
        else if (this.state.tipoUsuario == "empresa")
            iriTipoUsuario = "/api/tipo_usuarios/2";

        this.props.registerUser({
            username: this.state.username,
            password: this.state.password,
            email: this.state.email,
            tipoUsuario: iriTipoUsuario,
            telephone: this.state.telephone,
            address: this.state.address
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    emailChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            if (this.timeout)
                clearTimeout(this.timeout)
            this.timeout = setTimeout(() => {
                let check = false;
                let t;
                if (this.state.email) {
                    t = /[a-z](\.?[a-z0-9-_]+)*@[a-z0-9-_](\.?[a-z0-9-_]+)*\.[a-z]+/.exec(this.state.email);
                    if (t && this.state.email.length == t[0].length && t.index == 0)
                        check = true;
                }
                this.setState({
                    invalidEmail: this.state.email != undefined && this.state.email.length > 0 && !check,
                    validEmail: this.state.email != undefined && this.state.email.length > 0 && check
                })
            }, 1000);
        })
    }

    passwordCheckChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        }, () => {
            this.setState({
                arePasswordMatch: this.state.password && this.state.passwordCheck && this.state.password == this.state.passwordCheck
            })
        })
    }

    selectChange = (e) => {
        this.setState({
            [e.target.id]: this.refSelect.current.value
        })
    }

    render() {
        if (this.props.logged) {
            return (
                <Redirect to={"/"} />
            );
        }
        return (
            <Col className="content-wrap container" lg={6} >
                <Alert role={"status"} variant={"info"} show={this.props.loading}>Loading...</Alert>
                <Alert role={"alert"} variant={"danger"} show={this.props.error} >
                    <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                    {this.props.error}
                </Alert>
                <Form onSubmit={this.handleSubmit} className="form-register wrapper">
                    <Form.Group className="form-header form-in-center">
                        <h2>Súmese a nosotros!</h2>
                        <p>Entre todos los datos para completar el registro</p>
                    </Form.Group>

                    <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="username" >
                                    <FontAwesomeIcon icon={faUser} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id='username' type="user" placeholder="Usuario" onChange={this.handleChange} />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="email-group">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="email">
                                    <FontAwesomeIcon icon={faAt} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id="email" type="email" placeholder="Correo Electrónico" isInvalid={this.state.invalidEmail} isValid={this.state.validEmail} onChange={this.emailChange}></Form.Control>
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
                                <Form.Control id="password" type="password" placeholder="Contraseña" isValid={this.state.arePasswordMatch} onChange={this.passwordCheckChange}></Form.Control>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group className="password-group-2">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="passwordCheck">
                                        <FontAwesomeIcon icon={faRedoAlt} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control id="passwordCheck" type="password" placeholder="Confirmar Contraseña" isValid={this.state.arePasswordMatch} onChange={this.passwordCheckChange}></Form.Control>
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
                            {/* <Form.Label className="mt-0" htmlFor="tipoUsuario">Tipo de Usuario</Form.Label> */}
                            <Form.Control ref={this.refSelect} className="custom-select" id="tipoUsuario" as="select" onChange={this.selectChange} >
                                <option value="" selected >Tipo de Usuario ...</option>
                                <option value="persona-natural" >Persona Natural</option>
                                <option value="empresa" >Empresa</option>
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
                            <Form.Control id="telephone" type="text" placeholder="Teléfono" onChange={this.handleChange}></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="address-group">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <label className="input-group-text" htmlFor="address">
                                    <FontAwesomeIcon icon={faAddressBook} />
                                </label>
                            </InputGroup.Prepend>
                            <Form.Control id="address" type="text" placeholder="Dirección Particular" onChange={this.handleChange}></Form.Control>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group>
                        <small id="fileHelp" className="form-text text-muted mb-2">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></small>
                        <Button variant="primary" block type="submit">Registrarse</Button>
                    </Form.Group>

                    <Form.Group className="form-in-center">
                        <div className="mb-3 mx-4 register-separator">
                            <p className="mt-2 mb-3 hr">o</p>
                            <Link to="/login" className="form-link">Iniciar Sesión</Link>
                        </div>
                    </Form.Group>

                </Form>
            </Col>
        );
    }
}

Register.propTypes = {};

const mapStateToProps = (state) => {
    const {
        error,
        loading,
        logged
    } = state.user.auth

    return { error, loading, logged };
}

const mapDispatchToProps = dispatch => ({
    registerUser: user => dispatch(register(user)),
    reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);