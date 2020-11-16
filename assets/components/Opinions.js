import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Carousel, CarouselItem, Image, Alert } from 'react-bootstrap';
import { opinionFetch } from '../redux/opinion/opinionActions';
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

// hasta q se haga el system file
import user_opinion from '../assets/opinion-img-1.jpg';

const Opinions = () => {

    const loading = useSelector(state => state.opinion.loading)
    const opinions = useSelector(state => state.opinion.opinions)
    const error = useSelector(state => state.opinion.error)

    const distpach = useDispatch()

    useEffect(() => {
        distpach(opinionFetch())
    }, [])

    const prevIcon = <span aria-hidden="true" className="carousel-prev-icon-mod"></span>
    const nextIcon = <span aria-hidden="true" className="carousel-next-icon-mod"></span>

    return (
        <section data-aos="fade-up" id="opinions" className="opinions-component">
            <div className="opinions-header">
                <h2 className="mx-4">¡Sus <span>opiniones</span> cuentan!</h2>
            </div>
            <Alert role={"status"} variant={"info"} show={loading}>
                Loading...
            </Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            {
                loading != undefined && !loading && error != undefined && !error &&
                <Carousel className="opinions-container container" prevIcon={prevIcon} nextIcon={nextIcon}>
                {
                    opinions.map(opinion => {
                        opinion.autor = "Pedrito Calvo"
                        opinion.image = user_opinion
                        return (
                            <CarouselItem key={opinion.id}>
                                <Carousel.Caption>
                                    <div className="image-shadow-container">
                                        <Image src={opinion.image} alt="Author de la frase" className="image-carousel" />
                                    </div>
                                    <p className="mt-3 mb-2">{opinion.reviewText}</p>
                                    <p className="my-2 text-muted">{opinion.autor}</p>
                                </Carousel.Caption>
                            </CarouselItem>
                        )
                    })
                }
                </Carousel>
            }
        </section>
    )
}

Opinions.propTypes = {
    loading: PropTypes.bool,
    opinions: PropTypes.array,
    error: PropTypes.string
}

export default Opinions