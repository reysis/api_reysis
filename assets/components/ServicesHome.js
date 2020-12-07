import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { serviceFetch } from '../redux/service/serviceActions';

import ServiceCard from '../components/ServiceCard';

import { Row, Pagination } from 'react-bootstrap';

const ServicesHome = () => {

	const loading = useSelector(state => state.service.loading)
	const services = useSelector(state => state.service.services)
	const totalItems = useSelector(state => state.service.totalItems)
	const currentPage = useSelector(state => state.service.currentPage)
	const lastPage = useSelector(state => state.service.lastPage)
	const error = useSelector(state => state.service.error)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(serviceFetch())
	}, [])

	const [paginations, setPaginations] = useState([])

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

	const getPagination = () => {
		const items = []

		if (currentPage > 1)
			items.push(
				<Pagination.Ellipsis
					key={"pagination-n1"}
					disabled
					className="d-sm-none"
				/>
			)

		items.push(
			<Pagination.Item
				key={"pagination" + 1}
				active={1 === currentPage}
				disabled={loading}
				onClick={() => goToPage(1)}
				className={1 !== currentPage ? "d-none d-sm-block" : ""}
			>
				{1}
			</Pagination.Item>
		)

		if (services && services.length) {
			if (currentPage >= 5)
				items.push(
					<Pagination.Ellipsis
						key={"pagination-d1"}
						disabled
						className="d-none d-sm-block"
					/>
				)

			for (let i = Math.max(2, currentPage - 2); i <= Math.min(lastPage - 1, currentPage + 2); i++)
				items.push(
					<Pagination.Item
						key={"pagination" + i}
						active={i === currentPage}
						disabled={loading}
						onClick={() => goToPage(i)}
						className={i !== currentPage ? "d-none d-sm-block" : ""}
					>
						{i}
					</Pagination.Item>
				);

			if (currentPage <= lastPage - 4)
				items.push(
					<Pagination.Ellipsis
						key={"pagination-d2"}
						disabled
						className="d-none d-sm-block"
					/>
				)

			if (lastPage > 1)
				items.push(
					<Pagination.Item
						key={"pagination" + lastPage}
						active={lastPage === currentPage}
						disabled={loading}
						onClick={() => goToPage(lastPage)}
						className={lastPage !== currentPage ? "d-none d-sm-block" : ""}
					>
						{lastPage}
					</Pagination.Item>)
		}

		if (currentPage < lastPage)
			items.push(
				<Pagination.Ellipsis
					key={"pagination-n2"}
					disabled
					className="d-sm-none"
				/>
			)

		return items
	}

	useEffect(() => {
		setPaginations(getPagination)
	}, [loading])

	const goToPage = (pag) => {
		let page = Math.max(1, Math.min(pag, lastPage))
		page != currentPage
			&& dispatch(serviceFetch(page))
	}

	return (
		<section id="services" className="services-component section-padding">
			<div className="container">
				<div className="services-header">
					<h2 className="mx-4 pb-2">Nuestros <span>servicios</span></h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis <br />atque explicabo rerum enim ullam?</p>
				</div>
				<div className="cards-container">
					<Row>
						{
							!error && services && services.length
								? services.map((service, index) => {
									return (
										<ServiceCard
											key={service.id}
											id={service.id}
											nombre={service.nombre}
											descripcion={service.descripcion}
											image={service.image}
											loading={loading}
										/>
									)
								})
								: serviceSpinners
						}
					</Row>
				</div>
				<Row>
					<Pagination className="services-pagniation mx-auto my-3">
						<Pagination.First disabled={loading} onClick={() => goToPage(1)} />
						<Pagination.Prev disabled={loading} onClick={() => goToPage(currentPage - 1)} />
						{paginations}
						<Pagination.Next disabled={loading} onClick={() => goToPage(currentPage + 1)} />
						<Pagination.Last disabled={loading} onClick={() => goToPage(lastPage)} />
					</Pagination>
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