import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Image } from 'react-bootstrap'
import {
    faCaretDown
} from '@fortawesome/free-solid-svg-icons';

import userProfile from '../../assets/default-user.png';
import { useSelector } from 'react-redux';

const NavUserProfile = ({ name, profileShow }) => {

    const authenticated = useSelector(state => state.auth.login.authenticated)
    const loading = useSelector(state => state.auth.login.loading)
    const user = useSelector(state => state.auth.token.authenticatedUser);

    return (
        <>
            <div className={`nav-user__perfil--nav-photo ${profileShow ? "show" : ""} ${loading ? "loading" : ""}`}>
                {
                    user
                        ? <Image src={user['profilePicture'] ? user['profilePicture']['contentUrl'] : userProfile} />
                        : <FontAwesomeIcon icon={faCaretDown} />
                }
                <div className={`nav-user__perfil--nav-photo__loading ${loading ? "loading" : ""}`} />
                <div className={`nav-user__perfil--nav-photo__overlay ${loading ? "loading" : ""}`} />
            </div>
            {
                authenticated &&
                <div className="nav-user__perfil-header">
                    <span>{name.split(' ')[0]}</span>
                </div>
            }
        </>
    )
}

export default NavUserProfile