import React from 'react';
import {NavLink, Link} from "react-router-dom";
import { connect } from 'react-redux'
import LogoLetras from '../../assets/logo-letras.png'
import {
    Navbar,
    Nav,
    NavDropdown, Image,
} from "react-bootstrap";

const NavigationBar = (props) =>{
    return (
        <React.Fragment>
            <div className={props.scrolled ? "fixed-top menu-wrap": "menu-wrap"}>
                <nav expand="md" className="menu">
                    <div className="icon-list">
                        <NavLink to="/"><span>HOME</span></NavLink>
                        <NavLink to="/contact"><span>CONTÁCTENOS</span></NavLink>
                        <NavLink to="/about"><span>ACERCA DE</span></NavLink>
                        <NavLink to="/faq"><span>FAQ</span></NavLink>
                        { !props.loggedUser &&  <NavLink to="/login" className="authentication-link"><span>ENTRAR</span></NavLink>}
                        { !props.loggedUser &&  <NavLink to="/register" className="authentication-link"><span>REGISTRARSE</span></NavLink> }
                        { props.loggedUser && <NavLink to="/logout" className="authentication-link"><span>SALIR</span></NavLink> }
                    </div>
                </nav>
                <button className="close-button" id="close-button"></button>
                <div className="morph-shape" id="morph-shape" data-morph-open="M-7.312,0H15c0,0,66,113.339,66,399.5C81,664.006,15,800,15,800H-7.312V0z;M-7.312,0H100c0,0,0,113.839,0,400c0,264.506,0,400,0,400H-7.312V0z">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 800"
                         preserveAspectRatio="none">
                        <path d="M-7.312,0H0c0,0,0,113.839,0,400c0,264.506,0,400,0,400h-7.312V0z"/>
                    </svg>
                </div>
            </div>
            <button className="menu-button" id="open-button"></button>
        </React.Fragment>
    )
}

const mapStateToProps = (state)=>{
    return {
        loggedUser: state.user.login.logged
    }
}

export default connect(mapStateToProps)(NavigationBar);