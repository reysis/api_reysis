import React, { useState, useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ShowStars from "./layouts/ShowStars";

const OpinionsItem = ({ image, autor, reviewText, stars, likes, datePublished }) => {

    const [like, setLike] = useState(likes)

    const likeClick = () => {
        setLike(like => like + 1)
    }

    return (
        <Carousel.Caption>
            <div className="image-shadow-container">
                <Image src={image} alt="Author de la frase" className="image-carousel" />
            </div>
            <h2 className="my-3 text-author">{autor}</h2>
            <p className="my-3">{reviewText}</p>
            <div className="carousel-detail">
                <span className="carousel-published">{moment(datePublished).fromNow()}</span>
                <div className="carousel-stars">
                    <ShowStars times={stars}/>
                </div>
                <div onClick={likeClick} className="carousel-likes">
                    <FontAwesomeIcon icon={faThumbsUp} />
                    <span>{like} Likes</span>
                </div>
            </div>
        </Carousel.Caption>
    )
}

export default OpinionsItem;