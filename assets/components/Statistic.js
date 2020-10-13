import React from 'react'
import {
    Image
} from 'react-bootstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';

const Statistic = ({title, value, img, alt})=> {
    return (
        <div className="single-statistic">
            <FontAwesomeIcon className="single-statistic-img" icon={img}/>
            <h2 className="single-statistic-title">{title}</h2>
            <p className="single-statistic-value">{value}</p>            
        </div>
    )
}

export default Statistic;