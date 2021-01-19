import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Image, Modal } from 'react-bootstrap'
import {
    faCalendarAlt,
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
import NavUserProfile from './NavUserProfile';
import NavUserNotification from './NavUserNotification';

const NavUser = () => {

    const authenticated = useSelector(state => state.auth.authenticated)
    const user = useSelector(state => state.auth.user);

    const history = useHistory()

    const { pathname } = useLocation()

    const [name, setName] = useState("")

    const [profileShow, setProfileShow] = useState(false)
    const [showComentarioModal, setShowComentarioModal] = useState(false)
    const [notificationShow, setNotificationShow] = useState(false)

    const handleNotificationShow = value => {
        setNotificationShow(value)
        if (value) {
            setProfileShow(false)
        }
    }

    const handleProfileShow = value => {
        setProfileShow(value)
        if (value) {
            setNotificationShow(false)
        }
    }

    useEffect(() => {
        handleProfileShow(false)
        handleNotificationShow(false)
    }, [pathname])

    useEffect(() => {
        if (authenticated && user.persona && user.persona.nombre) {
            setName(user.persona.nombre)
        }
        else {
            setName("")
        }
    }, [authenticated])

    const perfilClick = () => history.push('/profile')

    const comentariosClick = () => {
        handleProfileShow(false)
        setShowComentarioModal(true)
    }

    const handleCloseComentarioModal = () => {
        setShowComentarioModal(false)
    }

    const turnosClick = () => {
        handleProfileShow(false)
        history.push('/turnos')
    }

    const loginClick = () => {
        handleProfileShow(false)
        history.push('/login')
    }

    const signupClick = () => {
        handleProfileShow(false)
        history.push('/register')
    }

    const logoutClick = () => {
        handleProfileShow(false)
        history.push('/logout')
    }

    return (
        <>
            <div className="nav-user">
                <div onClick={() => handleProfileShow(!profileShow)} className={`nav-user__perfil ${profileShow ? "show" : ""}`}>
                    <NavUserProfile name={name} profileShow={profileShow} />
                </div>
                <div className={`nav-user__menu-container ${profileShow ? "show" : ""}`}>
                    <div onClick={() => handleProfileShow(false)} className={`nav-user__menu-container--close ${profileShow ? "show" : ""}`}>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                    <div className={`nav-user__menu ${profileShow ? "show" : ""}`}>
                        <ul className="nav-user__menu-items">
                            {
                                authenticated
                                    ? <li key={1} onClick={perfilClick} className="nav-user__menu-items__item item-selectionable nav-user__item-perfil">
                                        <div className="nav-user__item--photo">
                                            <Image src={userProfile} />
                                        </div>
                                        <div className="nav-user__item--right">
                                            <span className="title">{name}</span>
                                            <span className="subtitle">Ver tu perfil</span>
                                        </div>
                                    </li>
                                    : <li key={2} className="nav-user__menu-items__item nav-user__item-no-perfil">
                                        <div className="nav-user__item--icon">
                                            <FontAwesomeIcon icon={faUser} />
                                        </div>
                                        <div className="nav-user__item--right">
                                            <span className="title">Inicie sesión o regístrese</span>
                                            {/* <span className="subtitle"></span> */}
                                        </div>
                                    </li>
                            }
                            <li key={3} className="nav-user__menu-items__item--separator" />
                            {
                                authenticated &&
                                <>
                                    <li onClick={comentariosClick} className="nav-user__menu-items__item item-selectionable nav-user__item-opinion">
                                        <div className="nav-user__item--icon">
                                            <FontAwesomeIcon icon={faCommentAlt} />
                                        </div>
                                        <div className="nav-user__item--right">
                                            <span className="title">Enviar comentarios</span>
                                            <span className="subtitle">Ayúdanos a mejorar</span>
                                        </div>
                                    </li>
                                    <li className="nav-user__menu-items__item--separator" />
                                </>
                            }
                            {
                                authenticated &&
                                <li onClick={turnosClick} className="nav-user__menu-items__item item-selectionable nav-user__turnos">
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
                                <li onClick={loginClick} className="nav-user__menu-items__item item-selectionable nav-user__login">
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
                                <li onClick={signupClick} className="nav-user__menu-items__item item-selectionable nav-user__signup">
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
                                <li onClick={logoutClick} className="nav-user__menu-items__item item-selectionable nav-user__logout">
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
                <NavUserNotification notificationShow={notificationShow} handleNotificationShow={handleNotificationShow} />
            }
            <ModalOpinion
                show={showComentarioModal}
                onHide={handleCloseComentarioModal}
            />
        </>
    )
}

export default NavUser