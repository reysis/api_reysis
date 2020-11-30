import React, { useState, useEffect } from 'react'
import TurnoCalendarTime from './TurnoCalendarTime';

const TurnoCalendarListTime = ({ turnoTimes, value, onChange }) => {

    const [current, setCurrent] = useState(-1);

    useEffect(() => {
        if (current != -1)
            onChange(turnoTimes[current])
        else
            onChange(null)
    }, [current])

    return (
        <div className="turno-calendar__list">
            <div className="turno-calendar__options">
            </div>
            <div className="turno-calendar__items">
                {
                    turnoTimes.map((value, index) => {
                        return (
                            <TurnoCalendarTime
                                key={index}
                                time={value}
                                index={index}
                                current={current}
                                setCurrent={setCurrent}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default TurnoCalendarListTime