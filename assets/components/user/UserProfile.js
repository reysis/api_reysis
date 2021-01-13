import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import MyDropzone from '../layouts/MyDropzone'
import {useDispatch, useSelector} from "react-redux";
import {userShow} from "../../redux/user/show/userShowActions";
import {Container, Jumbotron} from "react-bootstrap";
import TabUserProfile from "../layouts/TabUserProfile";
import ProfilePicture from "../layouts/ProfilePicture";

const UserProfile = ({userID}) => {
    const user = useSelector(state => state.auth.user);

    return (
        <div>
            {
                user &&
                <div>
                    <Jumbotron fluid>
                        <ProfilePicture img={user['profilePicture']['contentUrl']}/>
                        <h1>Perfil del Usuario {user['persona']['nombre']}</h1>
                    </Jumbotron>
                    <Container>
                        <TabUserProfile user={user}/>
                    </Container>
                </div>
            }
            {/*<MyDropzone />*/}
        </div>
    );
}

export default UserProfile;