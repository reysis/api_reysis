import React, {Component, useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Form} from "react-bootstrap";
import { login } from "../../actions/user/login";
import { connect } from 'react-redux';
import {Redirect} from "react-router-dom";
import {reset} from "../../actions/turno/create";

class Login extends Component {
    static propTypes = {
        logged: PropTypes.object,
        loading: PropTypes.bool.isRequired,
        error: PropTypes.string,
        login: PropTypes.func.isRequired,
        reset: PropTypes.func.isRequired,
        loadUserData: PropTypes.func.isRequired,
        username: PropTypes.string,
        password: PropTypes.string
    };
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.login({
            'username': this.state.username,
            'password': this.state.password
        })
    }
    handleChange = (e) =>{
        this.setState({
            [e.target.id]: e.target.value
        })
    }
    render() {
        if (this.props.logged){
            return (
                <Redirect to='/'
                />
            );
        }
        return (
            <div className="login-page page container">
                <h1 className="page-title">Formulario para Loguearse</h1>
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
                <Form onSubmit={this.handleSubmit} className="form-login">
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control id='username' type="user" placeholder="Entre su Usuario" onChange={this.handleChange}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control id="password" type="password" placeholder="Entre su password" onChange={this.handleChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">Entrar</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const{
        logged,
        loading,
        error,
    } = state.user.login;
    return {logged, loading, error};
}

const mapDispatchToProps = dispatch => ({
    login: user => dispatch( login(user) ),
    reset: () => dispatch(reset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);