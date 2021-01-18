import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const TurnoCalendarTime = ({ time, index, current, setCurrent, optionTime }) => {

    const itemClick = () => {
        setCurrent(index)
    }

    const [formatedTime, setFormatedTime] = useState("")

    useEffect(() => {
        if (time) {
            let [hour, minuts] = time.split(':');
            let hv = parseInt(hour), ap = "";
            if (optionTime === 0) {
                if (parseInt(hour) > 12) {
                    hv -= 12
                    ap = " pm"
                }
                else ap = " am"
                if (hv == 0)
                    hv = 12
            }
            let hs = hv.toString()
            let ms = minuts.toString()
            let h = hs.length === 1 ? `0${hs}` : hs
            let m = ms.length === 1 ? `0${ms}` : ms
            setFormatedTime(`${h}:${m}${ap}`)
        }
        else setFormatedTime("")
    }, [time, optionTime])

    return (
        <div onClick={itemClick} className="turno-calendar__item">
            <div className={`turno-calendar__item-icon ${current === index ? "current" : ""}`}>
                {
                    current === index && <FontAwesomeIcon icon={faCheck} />
                }
            </div>
            <label className="turno-calendar__item-label">{formatedTime}</label>
        </div>
    )
}

export default TurnoCalendarTime