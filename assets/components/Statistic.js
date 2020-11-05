import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Statistic = ({ title, value, img, alt }) => {
    return (
        <div className="single-statistic">
            <FontAwesomeIcon className="single-statistic-img" icon={img} size="2x" />
            <h3 className="single-statistic-title">{title}</h3>
            <p className="single-statistic-value">{value}</p>
        </div>
    )
}

export default Statistic;