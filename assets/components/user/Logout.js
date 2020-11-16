import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { logoutFetch } from '../../redux/auth/authActions';
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { Col, Row, Alert } from 'react-bootstrap';

const Logout = () => {
    
    const loading = useSelector(state => state.auth.loading)
    const authenticated = useSelector(state => state.auth.authenticated)
    const error = useSelector(state => state.auth.error)

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(logoutFetch())
    }, [])

    if (!authenticated) 
        return <Redirect to='/' />
    return (
        <Row className="content-wrap login-page page">
            <Col className="content-wrap container" md={8} >
                <Alert role={"status"} variant={"info"} show={loading || authenticated}>
                    Cerrando sesión...
                </Alert>
                <Alert role={"status"} variant={"info"} show={!error && !authenticated}>
                    <div className="mb-0">
                        Sesión cerrada satisfactoriamente...
                    </div>
                    <div>
                        Haga <Link to="/"><Alert.Link href="/">click aqui</Alert.Link></Link> si no redirecciona automaticamente.
                    </div>
                </Alert>
            </Col>
        </Row>
    )
}

export default Logout