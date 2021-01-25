import React from 'react';
import PropTypes from 'prop-types';
import UserProfile from "../components/user/UserProfile";

const UserProfilePage = ({match}) => {
    return (
        <main className="user-profile-page content-wrap page">
            <UserProfile />
        </main>
    )
}

UserProfilePage.propTypes = {};

export default UserProfilePage;