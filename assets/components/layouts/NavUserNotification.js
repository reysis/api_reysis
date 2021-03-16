import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faBell, faCircle, faEllipsisH, faEye, faEyeSlash, faTimes, faTrash} from '@fortawesome/free-solid-svg-icons'
import {
    notificationAssign,
    notificationGet,
    notificationReadPut,
    notificationSuccess
} from '../../redux/notification/list/notificationListActions'

import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap'
import Moment from 'react-moment'
import {notificationDelete} from "../../redux/notification/delete/notificationDeleteAction";
import ModalNotification from "./ModalNotification";

const NavUserNotification = ({ notificationShow, handleNotificationShow }) => {

    const [nonreadNotification, setNonreadNotification] = useState('')
    const [showModal, setShowModal] = useState(false);
    const [valuesModal, setValuesModal] = useState({});

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

    const notificationsNonReaded = useSelector(state => state.notification.list.notifications).filter(({ readed }) => !readed)
    const notificationsReaded = useSelector(state => state.notification.list.notifications).filter(({ readed }) => readed)
    const notifications = useSelector(state=> state.notification.list.notifications);
    const dispatch = useDispatch()

    const totalItems = useSelector(state=> state.notification.list.totalItems);
    const currentPage = useSelector(state => state.notification.list.currentPage)
    const lastPage = useSelector(state => state.notification.list.lastPage)

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

    const handleShowNotification = (values) => {
        setValuesModal(values);
        setShowModal(true);
        dispatch(notificationReadPut(values['id'], true))
    }

    const handleUnshowNotification = (id) => {
        dispatch(notificationReadPut(id, false))
    }

    const handleHideModal = () => {
        setShowModal(false);
    }

    const handleDeleteNotification = (idNotification, readed) => {
        dispatch(notificationDelete(idNotification));
        let arrayOfNotifications = notifications.filter(({id})=>id !== idNotification)
        dispatch(notificationAssign(arrayOfNotifications));
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
                                        <li key={id} className="nav-notification__menu-items__item">
                                            <div className="nav-notification__menu-items__item-container" >
                                                <div className="nav-notification__menu-items__item-container-left" >
                                                    <span className={readed ? "nav-notification__menu-items__item-container-left--text" : "nav-notification__menu-items__item-container-left--text nonreaded"} >{description}</span>
                                                    <Moment fromNow className="nav-notification__menu-items__item-container-left--date">{date}</Moment>
                                                </div>
                                                <div className={readed ? "nav-notification__menu-items__item-container-right" : "nav-notification__menu-items__item-container-right nonreaded"}>
                                                    <div className="flex-centered-container">
                                                        <FontAwesomeIcon
                                                            icon={faEye}
                                                            className="font-awesome-icon"
                                                            onClick={()=>handleShowNotification({id, description, date, readed})}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="font-awesome-icon"
                                                            onClick={()=>handleDeleteNotification(id, readed)}
                                                        />
                                                    </div>
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
                                        <li key={id} className="nav-notification__menu-items__item">
                                            <div className="nav-notification__menu-items__item-container" >
                                                <div className="nav-notification__menu-items__item-container-left" >
                                                    <span className={readed ? "nav-notification__menu-items__item-container-left--text" : "nav-notification__menu-items__item-container-left--text nonreaded"} >{description}</span>
                                                    <Moment fromNow className="nav-notification__menu-items__item-container-left--date">{date}</Moment>
                                                </div>
                                                <div className={readed ? "nav-notification__menu-items__item-container-right" : "nav-notification__menu-items__item-container-right nonreaded"}>
                                                    <div className="flex-centered-container">
                                                        <FontAwesomeIcon
                                                            icon={faEyeSlash}
                                                            className="font-awesome-icon"
                                                            onClick={()=>handleUnshowNotification(id)}
                                                        />
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            className="font-awesome-icon"
                                                            onClick={()=>handleDeleteNotification(id, readed)}
                                                        />
                                                    </div>
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
            <ModalNotification show={showModal} onHide={handleHideModal} values={valuesModal}/>
        </div>
    )
}

export default NavUserNotification