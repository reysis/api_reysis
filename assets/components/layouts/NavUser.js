import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Image, Modal } from 'react-bootstrap'
import {
    faBell,
    faCalendarAlt,
    faCaretDown,
    faCommentAlt,
    faSignInAlt,
    faSignOutAlt,
    faTimes,
    faUser,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';

import userProfile from '../../assets/opinion-img-1.jpg';
import { useLocation, useHistory } from 'react-router-dom';
import ModalOpinion from './ModalOpinion';

const NavUser = () => {

    const authenticated = useSelector(state => state.auth.authenticated)
    const user = useSelector(state => state.auth.user);

    const history = useHistory()

    const { pathname } = useLocation()

    const [name, setName] = useState("")
    const [profileShow, setProfileShow] = useState(false)

    const [showComentarioModal, setShowComentarioModal] = useState(false)

    const closeNavUser = () => {
        setProfileShow(false)
    }

    const navUserClick = () => {
        setProfileShow(!profileShow)
    }

    useEffect(() => {
        closeNavUser()
    }, [pathname])

    useEffect(() => {
        if (authenticated && user.persona && user.persona.nombre) {
            setName(user.persona.nombre)
        }
        else {
            setName("")
        }
    }, [authenticated])

    const perfilClick = () => {
        history.push('/cuenta')
    }

    const comentariosClick = () => {
        closeNavUser()
        setShowComentarioModal(true)
    }

    const handleCloseComentarioModal = () => {
        setShowComentarioModal(false)
    }

    const turnosClick = () => {
        closeNavUser()
        history.push('/turnos')
    }

    const loginClick = () => {
        closeNavUser()
        history.push('/login')
    }

    const signupClick = () => {
        closeNavUser()
        history.push('/register')
    }

    const logoutClick = () => {
        closeNavUser()
        history.push('/logout')
    }

    return (
        <>
            <div className="nav-user">
                <div onClick={navUserClick} className={`nav-user__perfil ${profileShow ? "show" : ""}`}>
                    <div className={`nav-user__perfil--nav-photo ${profileShow ? "show" : ""}`}>
                        {
                            authenticated
                                ? <Image src={userProfile} />
                                : <FontAwesomeIcon icon={faCaretDown} />
                        }
                    </div>
                    {
                        authenticated &&
                        <div className="nav-user__perfil-header">
                            <span>{name.split(' ')[0]}</span>
                        </div>
                    }
                </div>
                <div className={`nav-user__menu-container ${profileShow ? "show" : ""}`}>
                    <div onClick={closeNavUser} className={`nav-user__menu-container--close ${profileShow ? "show" : ""}`}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className={`nav-user__menu ${profileShow ? "show" : ""}`}>
                        <ul className="nav-user__menu-items">
                            {
                                authenticated
                                    ? <li onClick={perfilClick} className="nav-user__menu-items__item nav-user__item-perfil">
                                        <div className="nav-user__item--photo">
                                            <Image src={userProfile} />
                                        </div>
                                        <div className="nav-user__item--right">
                                            <span className="title">{name}</span>
                                            <span className="subtitle">Ver tu perfil</span>
                                        </div>
                                    </li>
                                    : <li className="nav-user__menu-items__item nav-user__item-no-perfil">
                                        <div className="nav-user__item--icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <div className="nav-user__item--right">
                                            <span className="title">Inicie sesión o regístrese</span>
                                            {/* <span className="subtitle"></span> */}
                                        </div>
                                    </li>
                            }
                            {
                                authenticated &&
                                <li onClick={comentariosClick} className="nav-user__menu-items__item nav-user__item-opinion">
                                    <div className="nav-user__item--icon">
                                        <FontAwesomeIcon icon={faCommentAlt} />
                                    </div>
                                    <div className="nav-user__item--right">
                                        <span className="title">Enviar comentarios</span>
                                        <span className="subtitle">Ayúdanos a mejorar</span>
                                    </div>
                                </li>
                            }
                            {
                                authenticated &&
                                <li onClick={turnosClick} className="nav-user__menu-items__item nav-user__turnos">
                                    <div className="nav-user__item--icon">
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                    </div>
                                    <div className="nav-user__item--right">
                                        <span className="title">Mis Turnos</span>
                                    </div>
                                </li>
                            }
                            {
                                !authenticated &&
                                <li onClick={loginClick} className="nav-user__menu-items__item nav-user__login">
                                    <div className="nav-user__item--icon">
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                    </div>
                                    <div className="nav-user__item--right">
                                        <span className="title">Iniciar sesión</span>
                                    </div>
                                </li>
                            }
                            {
                                !authenticated &&
                                <li onClick={signupClick} className="nav-user__menu-items__item nav-user__signup">
                                    <div className="nav-user__item--icon">
                                        <FontAwesomeIcon icon={faUserPlus} />
                                    </div>
                                    <div className="nav-user__item--right">
                                        <span className="title">Registrarse</span>
                                    </div>
                                </li>
                            }
                            {
                                authenticated &&
                                <li onClick={logoutClick} className="nav-user__menu-items__item nav-user__logout">
                                    <div className="nav-user__item--icon">
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                    </div>
                                    <div className="nav-user__item--right">
                                        <span className="title">Salir</span>
                                    </div>
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
            {
                authenticated &&
                <div className="nav-notification">
                    <FontAwesomeIcon icon={faBell} />
                    <span>15</span>
                </div>
            }
            <ModalOpinion
                show={showComentarioModal}
                onHide={handleCloseComentarioModal}
            />
        </>
    )
}

export default NavUser