import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { logoutFetch } from '../../redux/auth/authActions';
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { Col, Row, Alert } from 'react-bootstrap';

const Logout = () => {
    
    const loading = useSelector(state => state.auth.loading)
    const authenticated = useSelector(state => state.auth.authenticated)
    const user = useSelector(state => state.auth.user)
    const error = useSelector(state => state.auth.error)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(logoutFetch())
    }, [])

    if (!authenticated) 
        return <Redirect to='/' />
    return (
        <Row className="content-wrap login-page page">
            <Col className="content-wrap container" lg={6} >
                <Alert role={"status"} variant={"info"} show={authenticated}>
                    Cerrando sesión...
                </Alert>
                <Alert role={"status"} variant={"info"} show={!error && !authenticated}>
                    <p className="mb-0">
                        Sesión cerrada satisfactoriamente...
                    </p>
                    <p>
                        <Link to="">Haga <Alert.Link>click aqui</Alert.Link></Link> si no redirecciona automaicamente.
                    </p>
                </Alert>
            </Col>
        </Row>
    )
}

export default Logout