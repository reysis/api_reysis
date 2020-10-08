import React from 'react';
import {NavLink, Link} from "react-router-dom";
import { connect } from 'react-redux'
import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

const NavigationBar = (props) =>{
    return (
        <Navbar expand="md" id="bt-menu" className="bt-menu">
            <Navbar.Toggle  aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/">Home</NavLink>
                    </Nav.Item>
                    {/* <NavDropdown title="Servicios" id="basic-nav-dropdown">
                    </NavDropdown> */}
                    <NavDropdown title="Comprobar">
                        <NavDropdown.Item>
                            <Link className="nav-item-link" to="#">Garantía</Link>
                        </NavDropdown.Item>
                        <NavDropdown.Item>
                            <Link className="nav-item-link"  to="#">Estado de la Reparación</Link>
                        </NavDropdown.Item>
                    </NavDropdown>
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/contact">Contáctenos</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/about">Acerca de...</NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink className="nav-item-link"  to="/faq">FAQ</NavLink>
                    </Nav.Item>
                    {!props.loggedUser && (
                        <div>
                            <Nav.Item>
                                <NavLink className="nav-item-link"  to="/login">Entrar</NavLink>
                            </Nav.Item>
                            <Nav.Item>
                                <NavLink className="nav-item-link"  to="/register">Registrarse</NavLink>
                            </Nav.Item>
                        </div>)
                    }
                    {props.loggedUser && (
                        <Nav.Item>
                            <NavLink className="nav-item-link"  to="/logout">Salir</NavLink>
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

const mapStateToProps = (state)=>{
    return {
        loggedUser: state.user.login.logged
    }
}

export default connect(mapStateToProps)(NavigationBar);