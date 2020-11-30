import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const TurnoCalendarTime = ({ time, index, current, setCurrent }) => {

    const itemClick = () => {
        setCurrent(index)
    }

    return (
        <div onClick={itemClick} className="turno-calendar__item">
            <div className={`turno-calendar__item-icon ${current == index ? "current" : ""}`}>
                {
                    current == index && <FontAwesomeIcon icon={faCheck} />
                }
            </div>
            <label className="turno-calendar__item-label">{time}</label>
        </div>
    )
}

export default TurnoCalendarTime