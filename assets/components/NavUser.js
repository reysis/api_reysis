import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image } from 'react-bootstrap'
import { faBell, faTimes } from '@fortawesome/free-solid-svg-icons';

import userProfile from '../assets/opinion-img-1.jpg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NavUser = () => {

    const authenticated = true
    const name = "Frank Siret"

    const [profileShow, setProfileShow] = useState(false)

    const closeClick = () => {
        setProfileShow(false)
    }

    const openClick = () => {
        setProfileShow(true)
    }

    return (
        <>
            <div className={`nav-user ${profileShow ? "show" : ""}`}>
                <div className={`nav-user__perfil ${profileShow ? "show" : ""}`}>
                    <Image onClick={openClick} className={`nav-user__perfil-photo ${profileShow ? "show" : ""}`} src={userProfile} />
                    <div className={`nav-user__perfil-header ${profileShow ? "show" : ""}`}>
                        {
                            authenticated
                                ? <span>{name}</span>
                                : <span>Inicie Sesión o Regístrese</span>
                        }
                    </div>
                    <div onClick={closeClick} className={`nav-user__perfil-close ${profileShow ? "show" : ""}`}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <div className={`nav-user__menu ${profileShow ? "show" : ""}`}>
                    <ul className={`nav-user__menu-items ${profileShow ? "show" : ""}`}>
                        {
                            authenticated &&
                            <li className={`nav-user__menu-items__item ${profileShow ? "show" : ""}`}>
                                <Link to='/'>Perfil</Link>
                            </li>
                        }
                        {
                            authenticated &&
                            <li className={`nav-user__menu-items__item ${profileShow ? "show" : ""}`}>
                                <Link to='/'>Mis Turnos</Link>
                            </li>
                        }
                        {
                            !authenticated &&
                            <li className={`nav-user__menu-items__item ${profileShow ? "show" : ""}`}>
                                <Link to='/login'>Iniciar Sesión</Link>
                            </li>
                        }
                        {
                            !authenticated &&
                            <li className={`nav-user__menu-items__item ${profileShow ? "show" : ""}`}>
                                <Link to='/register'>Registrarse</Link>
                            </li>
                        }
                        {
                            authenticated &&
                            <li className={`nav-user__menu-items__item ${profileShow ? "show" : ""}`}>
                                <Link to='/logout'>Salir</Link>
                            </li>
                        }
                    </ul>
                </div>
            </div>
            {
                authenticated &&
                <div className="nav-notification">
                    <FontAwesomeIcon icon={faBell} />
                    <span>15</span>
                </div>
            }
        </>
    )
}

export default NavUser