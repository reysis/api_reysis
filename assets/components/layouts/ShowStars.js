import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faStar as faStarFull} from "@fortawesome/free-solid-svg-icons";
import {faStar as faStarEmpty} from "@fortawesome/free-regular-svg-icons";

const ShowStars = (props) => {
    const getStars = () =>{
        const res = []
        for (let i = 0; i < props.times; i++)
            res.push(<FontAwesomeIcon key={"stars" + i} icon={faStarFull} />)
        for (let i = props.times; i < 5; i++)
            res.push(<FontAwesomeIcon key={"stars" + i} icon={faStarEmpty} />)
        return res;
    }
    return (
        <div className="carousel-stars">
            {
                getStars()
            }
        </div>
    );
};

export default ShowStars;
