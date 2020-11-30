import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { serviceFetch } from '../redux/service/serviceActions';

import ServiceCard from '../components/ServiceCard';

const ServicesHome = () => {

	const loading = useSelector(state => state.service.loading)
	const services = useSelector(state => state.service.services)
	const error = useSelector(state => state.service.error)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(serviceFetch())
	}, [])

	return (
		<section id="services" className="services-component section-padding">
			<div className="container">
				<div className="services-header">
					<h2 className="mx-4 pb-2">Nuestros <span>servicios</span></h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis <br />atque explicabo rerum enim ullam?</p>
				</div>
				{
					loading != undefined && !loading && error != undefined && !error && services.length > 0
						? (
							<div className="row cards-container">
								{
									services.map((service, index) => {
										return (
											<ServiceCard key={service.id} nombre={service.nombre} descripcion={service.descripcion} image={service.image} aosDelay={300 * index} />
										)
									})
								}
							</div>
						)
						: (
							<div className="row services-spinner">
								{
									[1, 2].map(value => {
										return (
											<div key={value} className="col-md-6 col-lg-4 col-xs-12">
												<div className="card-spinner animated-background bg">
													<div className="title-spinner fg" />
													<div className="description-spinner" >
														<div className="fg" />
														<div className="fg" />
														<div className="fg" />
													</div>
													<div className="button-spinner fg" />
												</div>
											</div>
										)
									})
								}
							</div>
						)
				}
			</div>
		</section >
	)
}

ServicesHome.propTypes = {
	loading: PropTypes.bool,
	services: PropTypes.array,
	error: PropTypes.string
}

export default ServicesHome