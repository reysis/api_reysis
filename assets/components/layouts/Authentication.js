import React from 'react';
import {NavLink, Link} from "react-router-dom";
import { connect } from 'react-redux'
import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

const Authentication = (props) =>{
    return (
        <div className="authentication-container ml-auto">
            {!props.loggedUser && (
                <div className="authentication-links-group">
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/authentication">ENTRAR</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/register">REGISTRARSE</NavLink>
                    </Nav.Item>
                </div>)
            }
            {props.loggedUser && (
                <Nav.Item>
                    <NavLink className="nav-item-link"  to="/logout">Salir</NavLink>
                </Nav.Item>
            )}
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        loggedUser: state.user.login.logged
    }
}

export default connect(mapStateToProps)(Authentication);