import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Statistic = ({ title, value, img, alt }) => {
    return (
        <div data-aos="fade-up" className="single-statistic">
            <div className="icon-o">
          		<FontAwesomeIcon icon={img} />
          	</div>
          	<div className="single-statistic-count">
            	<h3><span className="counter">{value}</span></h3>
            	<p>{title}</p>
          	</div>
        </div>
    )
}

export default Statistic;