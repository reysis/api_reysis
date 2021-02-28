import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Carousel, CarouselItem, Image, Alert } from 'react-bootstrap';
import { opinionListFetch } from '../redux/opinion/list/opinionListActions';
import PropTypes from "prop-types";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import defaultUserProfile from '../assets/default-user.png'

// hasta q se haga el system file
import user_opinion from '../assets/opinion-user-1.png';

import testimonialBackground from '../assets/testimonial.jpg';

import OpinionsItem from './OpinionsItem'
import {getOpinionsFiltersURL} from "../redux/requestFilters";
import {Link} from "react-router-dom";

const Opinions = () => {

	const loading = useSelector(state => state.opinion.list.loading)
	const opinions = useSelector(state => state.opinion.list.opinions)
	const error = useSelector(state => state.opinion.list.error)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(opinionListFetch(getOpinionsFiltersURL(1)))
	}, [])

	return (
		<section
			data-aos="fade-up"
			data-aos-delay="500"
			id="opinions"
			className="opinions-component section-padding"
			style={{
				backgroundImage: `url(${testimonialBackground})`
			}}
		>
			<div className="overlay"></div>
			<div className="opinions-header">
				<h2 className="mx-4 pb-2">¡Sus opiniones <span>cuentan!</span></h2>
				<p>Cada una de ellas nos ha hecho crecer y su satisfacción<br /> es nuestro principal objetivo</p>
			</div>
			<div data-aos="fade-up" className="opinions-container container">
				{
					loading !== undefined && !loading && error !== undefined && !error && opinions
						? (
							<Carousel>
								{
									opinions['hydra:member'].map(item => {
										return (
											<Carousel.Item key={item['@id']}>
												<OpinionsItem
													// autor={autor}
													id={item['@id']}
													image={item['user']['profilePicture'] ? item['user']['profilePicture']['contentUrl'] : defaultUserPicture}
													reviewText={item['reviewText']}
													stars={item['stars']}
													likes={item['likes']}
													datePublished={item['datePublished']}
													alreadyLiked={item['likedByMe']}
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
				<div className="opinions-button__container">
					<Link to="/reviews">
						<button className="opinions-button__see-all">Ver todas</button>
					</Link>
				</div>
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