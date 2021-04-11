import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"

import LogoFoter from '../../assets/logo-footer.png'

const NavigationBar = ({ authenticated, username, pathname }) => {

    const [showMenu, setShowMenu] = useState(false)

    // useEffect(() => {
    //     showMenu
    //         ? document.body.classList.add("open-menu-modal")
    //         : document.body.classList.remove("open-menu-modal")
    // }, [showMenu])

    return (
        <>
            <div onClick={() => setShowMenu(!showMenu)} className={showMenu ? "menu-btn menu-close" : "menu-btn"}>
                <div className="btn-line" />
                <div className="btn-line" />
                <div className="btn-line" />
            </div>
            <nav className={showMenu ? "menu menu-show" : "menu"}>
                <div className={showMenu ? "menu-branding menu-show" : "menu-branding"}>
                    <NavLink to={{ pathname: '/', hash: '#landing' }}>
                        <div className="portrait" style={{ backgroundImage: `url(${LogoFoter})` }} />
                    </NavLink>
                </div>
                <ul className={showMenu ? "menu-nav menu-show" : "menu-nav"}>
                    {/* 
                        authenticated && username && 
                        <li className={showMenu ? "nav-item menu-show" : "nav-item"}>
                            <a className="menu-user">
                                <span>Bienvenido {username}</span>
                            </a>
                        </li>
                    */}
                    <li className={`nav-item ${pathname == "/" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                        <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/">
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li className={`nav-item ${pathname == "/turnos/create" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                        <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/turnos/create">
                            <span>Hacer Cita</span>
                        </NavLink>
                    </li>
                    <li className={`nav-item ${pathname == "/#contact-home" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                        <NavLink onClick={() => setShowMenu(false)} className="nav-link" to={{ pathname: '/', hash: '#contact-home' }}>
                            <span>Contáctenos</span>
                        </NavLink>
                    </li>
                    <li className={`nav-item ${pathname == "/about" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                        <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/about">
                            <span>Acerca de</span>
                        </NavLink>
                    </li>
                    <li className={`nav-item ${pathname == "/faq" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                        <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/faq">
                            <span>FAQ</span>
                        </NavLink>
                    </li>
                    {/* {
                        !authenticated &&
                        <li className={`nav-item auth-nav-item ${pathname == "/login" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                            <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/login">
                                <span>Entrar</span>
                            </NavLink>
                        </li>
                    }
                    {
                        !authenticated &&
                        <li className={`nav-item auth-nav-item ${pathname == "/register" ? "current" : ""} ${showMenu ? "menu-show" : ""}`}>
                            <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/register">
                                <span>Registrarse</span>
                            </NavLink>
                        </li>
                    }
                    {
                        authenticated &&
                        <li className={`nav-item auth-nav-item ${showMenu ? "menu-show" : ""}`}>
                            <NavLink onClick={() => setShowMenu(false)} className="nav-link" to="/logout">
                                <span>Salir</span>
                            </NavLink>
                        </li>
                    } */}
                </ul>
            </nav>
        </>
    )
}

export default NavigationBar;