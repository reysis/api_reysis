import React, { useEffect, useState } from 'react';
import { userLogout } from "../../redux/auth/login/authLoginActions";
import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";

import { Col, Row, Alert, Jumbotron } from 'react-bootstrap';
import {tokenClearState} from "../../redux/auth/token/authTokenActions";

const Logout = () => {

    const [redirect, setRedirect] = useState(false)

    const dispatch = useDispatch()

    let timeout = null;

    useEffect(() => {
        dispatch(userLogout())
        dispatch(tokenClearState())
        timeout = setTimeout(() => {
            setRedirect(true)
        }, 10000)
        return () => {
            timeout && clearTimeout(timeout)
        }
    }, [])

    if (redirect) {
        return <Redirect to='/' />
    }
    return (
        <div className="content-wrap page">
            <Jumbotron className="mt-4 col-md-10 col-sm-12 text-center mx-auto">
                <h1 className="display-4">Sesión cerrada satisfactoriamente</h1>
                <p className="lead">Con nosotros siempre encuentras solución, vuelva pronto</p>
                <div className="mx-4 my-4 separator">
                    <p className="mb-0">o</p>
                </div>
                <p className="mb-0">Haga <Link to="/">click aqui</Link> si no redirecciona automaticamente.</p>
            </Jumbotron>
        </div>
    )
}

export default Logout