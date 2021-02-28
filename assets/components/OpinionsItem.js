import React, { useState, useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowStars from "./layouts/ShowStars";
import Moment from 'react-moment'
import LikeReviewSystem from "./layouts/LikeReviewSystem";

const OpinionsItem = ({
    id,
    image,
    autor,
    reviewText,
    stars,
    likes,
    datePublished,
    alreadyLiked
}) => {
    return (
        <Carousel.Caption>
            <div className="image-shadow-container">
                <Image src={image}
                       alt="Author de la frase"
                       className="image-carousel"
                       roundedCircle
                       fluid
                />
            </div>
            <h2 className="my-3 text-author">{autor}</h2>
            <p className="my-3">{reviewText}</p>
            <div className="carousel-detail">
                <Moment fromNow className="carousel-published">{datePublished}</Moment>
                <div className="carousel-stars">
                    <ShowStars times={stars}/>
                </div>
                <LikeReviewSystem likes={likes} alreadyLiked={alreadyLiked} idReview={id}/>
            </div>
        </Carousel.Caption>
    )
}

export default OpinionsItem;