import React, { useState, useEffect } from 'react'
import TurnoCalendarTime from './TurnoCalendarTime';

const TurnoCalendarListTime = ({ turnoTimes, value, onChange, optionTime, setOptionTime }) => {

    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        if (current !== -1)
            onChange(turnoTimes[current])
        else
            onChange(null)
    }, [current])

    const optionClick = (v) => {
        setOptionTime(v)
    }

    return (
        <div className="turno-calendar__list">
            <div className="turno-calendar__options">
                <span onClick={() => optionClick(0)} className={optionTime === 0 ? "current" : ""}>am/pm</span>
                <span>-</span>
                <span onClick={() => optionClick(1)} className={optionTime === 1 ? "current" : ""}>24h</span>
            </div>
            <div className="turno-calendar__items">
                {
                    turnoTimes.length !== 0
                        ? turnoTimes.map((value, index) => {
                            return (
                                <TurnoCalendarTime
                                    key={index}
                                    time={value}
                                    index={index}
                                    current={current}
                                    setCurrent={setCurrent}
                                    optionTime={optionTime}
                                />
                            )
                        })
                        : <div className="turno-calendar__items--not-availables">
                            <span>Ups! No hay turnos disponibles para esa fecha</span>
                        </div>
                }
            </div>
        </div>
    )
}

export default TurnoCalendarListTime