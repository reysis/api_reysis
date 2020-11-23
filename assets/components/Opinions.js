import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Carousel, CarouselItem, Image, Alert } from 'react-bootstrap';
import { opinionFetch } from '../redux/opinion/opinionActions';
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// hasta q se haga el system file
import user_opinion from '../assets/opinion-user-1.png';

import testimonialBackground from '../assets/testimonial.jpg';

const Opinions = () => {

    const loading = useSelector(state => state.opinion.loading)
    const opinions = useSelector(state => state.opinion.opinions)
    const error = useSelector(state => state.opinion.error)

    const [opinions1] = useState([
        { id: "1", reviewText: "A digital studio specialising in User Experience & eCommerce, we combine innovation with digital craftsmanship to help brands fulfill their potential." },
        { id: "2", reviewText: "A digital studio specialising in User  with digital craftsmanship to help brands fulfill their potential." }
    ])
 
    const distpach = useDispatch()

    useEffect(() => {
        distpach(opinionFetch())
    }, [])

    return (
        <section 
            id="opinions" 
            className="opinions-component section-padding"
            style={{ 
                backgroundImage: `url(${testimonialBackground})` 
            }}
        >
            <div className="overlay"></div>
            <div className="opinions-header">
                <h2 className="mx-4">¡Sus <span>opiniones</span> cuentan!</h2>
            </div>
            <div data-aos="fade-up" className="opinions-container container">
            {
                loading != undefined && !loading && error != undefined && !error && opinions.length > 0
                ? ( 
                  <Carousel>
                  {
                    opinions1.map(opinion => {
                        opinion.autor = "Pedrito Calvo"
                        opinion.image = user_opinion
                        return (
                            <CarouselItem key={opinion.id}>
                                <Carousel.Caption>
                                    <div className="image-shadow-container">
                                        <Image src={opinion.image} alt="Author de la frase" className="image-carousel" />
                                    </div>
                                    <h2 className="my-3 text-author">{opinion.autor}</h2>
                                    <p className="my-3">{opinion.reviewText}</p>
                                </Carousel.Caption>
                            </CarouselItem>
                        )
                    })
                  }
                  </Carousel>
                )
                : (
                  <div className="carousel-spinner animated-background">
                    <div className="left d-flex">
                      <div className="carousel-control-prev-icon m-auto"/>
                    </div>
                    <div className="content-data">
                      <div className="image bg"/>
                      <div className="author bg"/>
                      <div className="review bg"/>
                      <div className="indicators">
                        <div className="bg"/>
                        <div className="bg"/>
                      </div>
                    </div>
                    <div className="right d-flex">
                      <div className="carousel-control-next-icon m-auto"/>
                    </div>                    
                  </div>
                )
            }
            </div>
        </section>
    )
}

Opinions.propTypes = {
    loading: PropTypes.bool,
    opinions: PropTypes.array,
    error: PropTypes.string
}

export default Opinions