import React, { useState, useEffect } from 'react'
import { Carousel, Image } from 'react-bootstrap'
import { faStar as faStarFull, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'

const OpinionsItem = ({ image, autor, reviewText, stars, likes, datePublished }) => {

    const getStars = (s) => {
        const res = []
        for (let i = 0; i < s; i++)
            res.push(<FontAwesomeIcon key={"stars" + i} icon={faStarFull} />)
        for (let i = s; i < 5; i++)
            res.push(<FontAwesomeIcon key={"stars" + i} icon={faStarEmpty} />)
        return res;
    }

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
                    {/* <span>{stars}</span> */}
                    {
                        getStars(stars)
                    }
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