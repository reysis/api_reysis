import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircle, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'
import { notificationGet, notificationReadPut } from '../../redux/notification/notificationActions'

import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'

const NavUserNotification = ({ notificationShow, handleNotificationShow }) => {

    const [nonreadNotification, setNonreadNotification] = useState('')

    const loading = useSelector(state => state.notification.loading)
    const error = useSelector(state => state.notification.error)

    const notificationListRef = useRef(null)

    const navNotificationClick = () => {
        !error && handleNotificationShow(!notificationShow)
    }

    const loadMoreClick = () => {
        (currentPage < lastPage) &&
            dispatch(notificationGet(currentPage + 1))
    }

    const notificationsNonReaded = useSelector(state => state.notification.notifications).filter(({ readed }) => !readed)
    const notificationsReaded = useSelector(state => state.notification.notifications).filter(({ readed }) => readed)

    const dispatch = useDispatch()

    const currentPage = useSelector(state => state.notification.currentPage)
    const lastPage = useSelector(state => state.notification.lastPage)

    useEffect(() => {
        dispatch(notificationGet())
    }, [])

    useEffect(() => {
        const n = notificationsNonReaded.length
        if (n <= 20)
            setNonreadNotification(`${n}`)
        else setNonreadNotification(`${n}+`)
    }, [notificationsNonReaded])

    const readedClick = (e, id) => {
        console.log("readedClick", e)
        e.stopPropagation()
        dispatch(notificationReadPut(id))
    }

    const itemClick = (e, id) => {
        console.log("itemClick", e)
        // setShowNotification(true);
    }

    const markAll = () => {

    }

    const deleteAll = () => {

    }

    return (
        <div className="nav-notification">
            <div onClick={navNotificationClick} className={`nav-notification__icon ${notificationShow ? "show" : ""}`}>
                <FontAwesomeIcon icon={faBell} />
                {
                    nonreadNotification.length &&
                    <span>{nonreadNotification}</span>
                }
            </div>
            <div className={`nav-notification__menu-container ${notificationShow ? "show" : ""}`}>
                <div onClick={() => handleNotificationShow(false)} className={`nav-notification__menu-container--close ${notificationShow ? "show" : ""}`}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className={`nav-notification__menu ${notificationShow ? "show" : ""}`}>
                    <div className="nav-notification__menu--background">
                        <div className="nav-notification__menu-header">
                            <UncontrolledDropdown setActiveFromChild>
                                <DropdownToggle tag="span" className="" caret>
                                    Notificaciones
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={() => markAll()} tag="span">Marcar todas como leídas</DropdownItem>
                                    <DropdownItem onClick={() => deleteAll()} tag="span">Eliminar todas</DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            {/* <span className="nav-notification__menu-header--notification">Notificaciones</span>
                            <div className="nav-notification__menu-header--menu_button" onClick={() => notificationSubMenuShowClick()}>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </div>
                            <div className="nav-notification__menu-header--menu">
                                <ul className="nav-notification__menu-header--menu-list">
                                    <li className="nav-notification__menu-header--menu_list--item">Marcar todas como leídas</li>
                                    <li className="nav-notification__menu-header--menu_list--item">Eliminar todas</li>
                                </ul>
                            </div> */}
                        </div>
                        <ul ref={notificationListRef} className="nav-notification__menu-items">
                            {
                                !(notificationsReaded.length || notificationsNonReaded.length) && !loading &&
                                <li className="nav-notification__menu-items__caption">No tienes notificaciones</li>
                            }
                            {
                                !(notificationsReaded.length || notificationsNonReaded.length) && loading &&
                                <li className="nav-notification__menu-items__caption">Cargando ...</li>
                            }
                            {
                                !error && notificationsNonReaded.length > 0 &&
                                <li className="nav-notification__menu-items--subtitulo">Recientes</li>
                            }
                            {
                                !error &&
                                notificationsNonReaded.map(({ id, description, date, readed }) => {
                                    return (
                                        <li key={id} onClick={(e) => itemClick(e, id)} className="nav-notification__menu-items__item">
                                            <div className="nav-notification__menu-items__item-container" >
                                                <div className="nav-notification__menu-items__item-container-left" >
                                                    <span className={readed ? "nav-notification__menu-items__item-container-left--text" : "nav-notification__menu-items__item-container-left--text nonreaded"} >{description}</span>
                                                    <span className="nav-notification__menu-items__item-container-left--date">{moment(date).fromNow()}</span>
                                                </div>
                                                <div className={readed ? "nav-notification__menu-items__item-container-right" : "nav-notification__menu-items__item-container-right nonreaded"}>
                                                    {
                                                        readed
                                                            ? <FontAwesomeIcon icon={faCircle} />
                                                            : <FontAwesomeIcon onClick={(e) => readedClick(e, id)} icon={faCircle} />
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            {
                                !error && notificationsReaded.length > 0 &&
                                <li className="nav-notification__menu-items--subtitulo readed">Anteriores</li>
                            }
                            {
                                !error &&
                                notificationsReaded.map(({ id, description, date, readed }) => {
                                    return (
                                        <li key={id} onClick={(e) => itemClick(e, id)} className="nav-notification__menu-items__item">
                                            <div className="nav-notification__menu-items__item-container" >
                                                <div className="nav-notification__menu-items__item-container-left" >
                                                    <span className={readed ? "nav-notification__menu-items__item-container-left--text" : "nav-notification__menu-items__item-container-left--text nonreaded"} >{description}</span>
                                                    <span className="nav-notification__menu-items__item-container-left--date">{moment(date).fromNow()}</span>
                                                </div>
                                                <div className={readed ? "nav-notification__menu-items__item-container-right" : "nav-notification__menu-items__item-container-right nonreaded"}>
                                                    {/* {
                                                        readed
                                                            ? <FontAwesomeIcon icon={faCircle} />
                                                            : <FontAwesomeIcon onClick={(e) => readedClick(e, id)} icon={faCircle} />
                                                    } */}
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            {
                                !error && currentPage < lastPage &&
                                <li className="nav-notification__menu-items__load-more loading">
                                    <span onClick={loadMoreClick}>Cargar más</span>
                                    <FontAwesomeIcon className={loading ? "loading" : ""} icon={faEllipsisH} />
                                </li>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavUserNotification