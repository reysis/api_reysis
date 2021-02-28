import React, {useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useDispatch} from "react-redux";

const LikeReviewSystem = ({likes, idReview, alreadyLiked}) => {
    const [like, setLike] = useState(likes)


    const dispatch = useDispatch();

    const likeClick = () =>{
        setLike(like + 1);
    }
    return (
        <div onClick={likeClick} className="carousel-likes">
            {
                alreadyLiked &&
                <FontAwesomeIcon icon={faThumbsUp} />
            }
            <FontAwesomeIcon icon={faThumbsUp} />
            <span>{like} Likes</span>
        </div>
    );
};

export default LikeReviewSystem;
