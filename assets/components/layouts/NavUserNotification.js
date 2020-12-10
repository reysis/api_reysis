import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircle, faEllipsisH, faTimes } from '@fortawesome/free-solid-svg-icons'
import { notificationFetch } from '../../redux/notification/notificationActions'

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
            dispatch(notificationFetch(currentPage + 1))
    }

    const notifications = useSelector(state => state.notification.notifications)

    const dispatch = useDispatch()

    const currentPage = useSelector(state => state.notification.currentPage)
    const lastPage = useSelector(state => state.notification.lastPage)

    useEffect(() => {
        dispatch(notificationFetch())
    }, [])

    useEffect(() => {
        const n = notifications.filter(({ readed }) => !readed).length
        if (n <= 20)
            setNonreadNotification(n)
        else setNonreadNotification(n + '+')
    }, [notifications])

    // useEffect(() => {
    //     if (notificationListRef) {
    //         notificationListRef.current.addEventListener("scroll", () => {

    //         });
    //     }
    // }, [notificationListRef])

    return (
        <div className="nav-notification">
            <div onClick={navNotificationClick} className={`nav-notification__icon ${notificationShow ? "show" : ""}`}>
                <FontAwesomeIcon icon={faBell} />
                {
                    notifications.length > 0 &&
                    <span>{nonreadNotification}</span>
                }
            </div>
            <div className={`nav-notification__menu-container ${notificationShow ? "show" : ""}`}>
                <div onClick={() => handleNotificationShow(false)} className={`nav-notification__menu-container--close ${notificationShow ? "show" : ""}`}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <div className={`nav-notification__menu ${notificationShow ? "show" : ""}`}>
                    <div className="nav-notification__menu--background">
                        {/* <div className="nav-notification__menu-header">
                            <span>Notificaciones</span>
                            <div>
                                <FontAwesomeIcon icon={faEllipsisH} />
                            </div>
                        </div> */}
                        <ul ref={notificationListRef} className="nav-notification__menu-items">
                            {/* <li className="nav-notification__menu-items--subtitulo">Recientes</li> */}
                            {
                                !error && notifications.map(({ id, description, date, readed }) => {
                                    return (
                                        <li key={id} className="nav-notification__menu-items__item">
                                            <div className="nav-notification__menu-items__item-container" >
                                                <div className="nav-notification__menu-items__item-container-left" >
                                                    <span className={readed ? "nav-notification__menu-items__item-container-left--text" : "nav-notification__menu-items__item-container-left--text nonreaded"} >{description}</span>
                                                    <span className="nav-notification__menu-items__item-container-left--date">{moment(date).fromNow()}</span>
                                                </div>
                                                <div className={readed ? "nav-notification__menu-items__item-container-right" : "nav-notification__menu-items__item-container-right nonreaded"}>
                                                    {
                                                        readed
                                                            ? <FontAwesomeIcon icon={faCircle} />
                                                            : <FontAwesomeIcon onClick={() => readedClick(id)} icon={faCircle} />
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                            {
                                !notifications.length && !loading &&
                                <li className="nav-notification__menu-items__caption">No tienes notificaciones</li>
                            }
                            {
                                !notifications.length && loading &&
                                <li className="nav-notification__menu-items__caption">Cargando ...</li>
                            }
                            {
                                !error && currentPage < lastPage &&
                                <li className="nav-notification__menu-items__load-more loading">
                                    <span onClick={loadMoreClick}>Cargar más</span>
                                    <FontAwesomeIcon className={loading ? "loading" : ""} icon={faEllipsisH} />
                                </li>
                            }
                            {/* <li className="nav-notification__menu-items--subtitulo">Anteriores</li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavUserNotification