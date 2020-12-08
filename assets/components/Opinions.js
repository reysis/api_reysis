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

import OpinionsItem from './OpinionsItem'

const Opinions = () => {

	const loading = useSelector(state => state.opinion.loading)
	const opinions = useSelector(state => state.opinion.opinions)
	const error = useSelector(state => state.opinion.error)

	const distpach = useDispatch()

	const [toMaxHeigth, setToMaxHeigth] = useState(-1)
	const [maxHeight, setMaxHeight] = useState(0)
	const [reviewCount, setReviewCount] = useState(0)

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
				<h2 className="mx-4 pb-2">¡Sus <span>opiniones</span> cuentan!</h2>
				<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis <br />atque explicabo rerum enim ullam?</p>
			</div>
			<div data-aos="fade-up" className="opinions-container container">
				{
					loading != undefined && !loading && error != undefined && !error && opinions.length > 0
						? (
							<Carousel>
								{
									opinions.map(({ id, autor, reviewText, stars, likes, datePublished }) => {
										const image = user_opinion
										return (
											<Carousel.Item key={id}>
												<OpinionsItem
													autor={autor}
													image={image}
													reviewText={reviewText}
													stars={stars}
													likes={likes}
													datePublished={datePublished}
												/>
											</Carousel.Item>
										)
									})
								}
							</Carousel>
						)
						: (
							<div className="carousel-spinner animated-background">
								<div className="left-spinner d-flex">
									<div className="carousel-control-prev-icon m-auto" />
								</div>
								<div className="content-data-spinner">
									<div className="image-spinner bg" />
									<div className="author-spinner bg" />
									<div className="review-spinner bg" />
									<div className="indicators-spinner">
										<div className="bg" />
										<div className="bg" />
									</div>
								</div>
								<div className="right-spinner d-flex">
									<div className="carousel-control-next-icon m-auto" />
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