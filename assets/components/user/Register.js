import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from "react-router-dom";
import {Button, Form} from "react-bootstrap";
import {register, reset} from "../../actions/user/authentication";
import {connect} from 'react-redux';

class Register extends Component {
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.login({
            'username': this.state.username,
            'password': this.state.password
        })
    }
    render() {
        if (this.props.logged){
            return (
                <Redirect to={"/"}
                />
            );
        }
        return (
            <div className="content-wrap container">
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
                <Form onSubmit={this.handleSubmit} className="form-register wrapper">
                    <div className="header">
                        <h1><span>Súmese a nosotros!</span></h1>
                    </div>
                    <Form.Group className="user-group">
                        <Form.Label>Nombre de usuario</Form.Label>
                        <Form.Control id='username' type="user" placeholder="Entre su Usuario" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group className="password-group-1 form-control-small">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Entre su contraseña" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="password-group-2 form-control-small">
                        <Form.Label>Repita la contraseña</Form.Label>
                        <Form.Control id="passwordCheck" type="password" placeholder="Entre su contraseña" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="tipo-usuario-group form-control-small">
                        <Form.Label>Tipo de Usuario</Form.Label>
                        <Form.Control id="tipoUsuario" as = "select">
                            <option>Persona Natural</option>
                            <option>Empresa</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="telephone-group form-control-small">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control id="telephone" type="text" placeholder="Entre su número telefónico" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    {/*<Form.Group className="email-group form-control-small">
                        <Form.Label>Email</Form.Label>
                        <Form.Control id="email" type="email" placeholder="Entre su correo electrónico" onChange={this.handleChange}></Form.Control>
                    </Form.Group>*/}
                    <Form.Group className="address-group">
                        <Form.Label>Dirección</Form.Label>
                        <Form.Control id="address" type="text" placeholder="Entre su dirección" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group className="button-group">
                        <Button variant="primary" type="submit">Registrarse</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

Register.propTypes = {};

const mapStateToProps = (state) =>{
    const{
        error,
        loading,
        logged
    } = state.user.auth

    return {error, loading, logged};
}

const mapDispatchToProps = dispatch => ({
    registerUser: user => dispatch( register(user) ),
    reset: () => dispatch(reset()),
});

export default connect(mapStateToProps,mapDispatchToProps)(Register);