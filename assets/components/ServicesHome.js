import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { servicesFetch } from '../redux/service/list/serviceListActions';

import ServiceCard from '../components/ServiceCard';

import { Row, Pagination } from 'react-bootstrap';
import PaginationSystem from "./PaginationSystem";
import {getServiceFilters} from "../redux/requestFilters";
import {changePageNumberFromURL, decodeLastPage} from "../redux/utiles";

const ServicesHome = () => {

	const loading = useSelector(state => state.service.list.loading)
	const response = useSelector(state => state.service.list.services)
	const error = useSelector(state => state.service.list.error)
	const [totalItems, setTotalItems] = useState(0);
	const [currentPage, setCurrentPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(servicesFetch(getServiceFilters(currentPage)))
	}, [])

	useEffect(()=>{
		if(response){
			if(response['hydra:view']){
				setLastPage(decodeLastPage(response['hydra:view']['hydra:last']));
			}else{
				setLastPage(1);
			}
		}
	},[response])

	const goToPage = (pageNumber)=>{
		if(pageNumber !== currentPage){
			if(response['hydra:view']){
				dispatch(
					servicesFetch(
						changePageNumberFromURL(response['hydra:view']['@id'], pageNumber)
					)
				);
			}else{
				dispatch(
					servicesFetch()
				);
			}
		}
	}

	const [serviceSpinners] = useState(() => {
		const items = []
		for (let i = 0; i < 12; i++) {
			/* items.push(
				<div key={"service-spinner" + i} className="col-md-6 col-lg-4 col-xs-12 text-center">
					<div data-aos="fade" data-aos-delay={150} className="card-spinner animated-background bg">
						<div className="title-spinner fg" />
						<div className="description-spinner" >
							<div className="fg" />
							<div className="fg" />
							<div className="fg" />
						</div>
						<div className="button-spinner fg" />
					</div>
				</div>
			) */
			items.push(<ServiceCard key={"service-spinner" + i} loading={true} />)
		}
		return items
	})

	return (
		<section id="services" className="services-component section-padding">
			<div className="container">
				<div className="services-header">
					<h2 id="servicios-title" className="mx-4 pb-2">Nuestros <span>servicios</span></h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis <br />atque explicabo rerum enim ullam?</p>
				</div>
			<div className="cards-container">
					<Row>
						{
							response
								? response['hydra:member'].map((service, index) => {
									return (
										<ServiceCard
											key={index}
											id={service['@id']}
											nombre={service['nombre']}
											descripcion={service['shortDescription']}
											images={service['serviceImages']}
											loading={false}
										/>
									)
								})

								: serviceSpinners
						}
					</Row>
				</div>
				<Row>
					<PaginationSystem
						goToPage={goToPage}
						currentPage={currentPage}
						lastPage={lastPage}
						loading={loading}
						totalItems={totalItems}
					/>
					{/*<Pagination className="services-pagniation mx-auto my-3">*/}
					{/*	<Pagination.First disabled={loading} onClick={() => goToPage(1)} />*/}
					{/*	<Pagination.Prev disabled={loading} onClick={() => goToPage(currentPage - 1)} />*/}
					{/*	{paginations}*/}
					{/*	<Pagination.Next disabled={loading} onClick={() => goToPage(currentPage + 1)} />*/}
					{/*	<Pagination.Last disabled={loading} onClick={() => goToPage(lastPage)} />*/}
					{/*</Pagination>*/}
				</Row>
			</div>
		</section>
	)
}

ServicesHome.propTypes = {
	loading: PropTypes.bool,
	services: PropTypes.array,
	error: PropTypes.string
}

export default ServicesHome