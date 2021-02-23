import React, {useState} from 'react';
import {Button, Image} from "react-bootstrap";
import {faCamera, faUndo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ModalProfilePicture from "./ModalProfilePicture";

const ProfilePicture = ({img}) => {
    const [show, setShow] = useState(false);
    const handleOnClick = () =>{
        setShow(!show);
    }

    return (
        <div className="user-profile-picture">
            <div className="user-profile-picture__image-container">
                <Image src={img} roundedCircle fluid className="user-profile-picture__image"/>
                <Button
                    className="user-profile-picture__button"
                    onClick={handleOnClick}
                    variant="primary"
                >
                    <FontAwesomeIcon icon={faCamera} />
                </Button>
            </div>
            <ModalProfilePicture show={show} setShow={setShow}/>
        </div>
    );
};

export default ProfilePicture;
