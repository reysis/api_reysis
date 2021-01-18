import React from 'react';
import {Image} from "react-bootstrap";

const ProfilePicture = ({img}) => {
    return (
        <div className="user-profile-picture">
            <Image src={img} roundedCircle/>
        </div>
    );
};

export default ProfilePicture;
