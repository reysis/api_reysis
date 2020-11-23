import React, { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Statistic = ({ title, value, img, aosDelay }) => {

	const counter = useRef(null)

	return (
		<div data-aos="fade-up" data-aos-delay={aosDelay} className="single-statistic">
			<div className="icon-o">
				<FontAwesomeIcon icon={img} />
			</div>
			<div className="single-statistic-count">
				<h3><span ref={counter} className="counter">{value}</span></h3>
				<p>{title}</p>
			</div>
		</div>
	)
}

export default Statistic;