import React from 'react';
import {Image} from "react-bootstrap";

const ProfilePicture = ({img}) => {
    return (
        <div>
            <Image src={img} rounded/>
        </div>
    );
};

export default ProfilePicture;
