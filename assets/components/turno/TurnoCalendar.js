import React, { useState, useEffect } from 'react';

import { Calendar } from "react-calendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { Form, Button, Col, Row } from 'react-bootstrap';
import TurnoCalendarTime from './TurnoCalendarTime';
import TurnoCalendarListTime from './TurnoCalendarListTime';

const TurnoCalendar = () => {

    const [now] = useState(new Date())
    const [planningDays] = useState(15)

    const [availableDates, setAvailableDates] = useState([
        new Date(2020, 10, 26),
        new Date(2020, 10, 27),
        new Date(2020, 11, 1),
        new Date(2020, 11, 2),
        new Date(2020, 11, 3),
        new Date(2020, 11, 4),
        new Date(2020, 11, 7),
        new Date(2020, 11, 8),
        new Date(2020, 11, 9),
        new Date(2020, 11, 10),
        new Date(2020, 11, 11)
    ])

    const [turnoTimes, setTurnoTimes] = useState([
        '08:30 am',
        '09:00 am',
        '10:00 am',
        '10:30 am',
        '11:30 am',
        '01:30 pm',
        '02:00 pm',
        '03:00 pm',
        '03:30 pm'
    ])

    const [valueDate, setValueDate] = useState(() => {
        if (availableDates.length)
            return availableDates[0];
        else return null;
    });

    const [valueTime, setValueTime] = useState(null);

    const [minDate] = useState(() => {
        if (availableDates.length)
            return availableDates[0];
        else return new Date(now);
    });

    const [maxDate] = useState(() => {
        let res = new Date(now)
        res.setDate(res.getDate() + planningDays)
        return res
    });

    const [formatedDate, setFormatedDate] = useState("Diciembre 25, 2020")

    const [formatedYear, setFormatedYear] = useState("2020")

    const [formatedTime, setFormatedTime] = useState("Elija una hora")

    useEffect(() => {
        const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        if (valueDate) {
            setFormatedDate(`${days[valueDate.getDay()]}, ${months[valueDate.getMonth()]} ${valueDate.getDate()}`)
            setFormatedYear(valueDate.getFullYear())
        }
        else {
            setFormatedDate("Seleccione una fecha")
            setFormatedYear(" ")
        }
    }, [valueDate])

    useEffect(() => {
        if (valueTime)
            setFormatedTime(valueTime)
        else setFormatedTime("Elija una hora")
    }, [valueTime])

    const isSameDay = (date_1, date_2) => {
        return date_1.getFullYear() === date_2.getFullYear()
            && date_1.getMonth() === date_2.getMonth()
            && date_1.getDate() === date_2.getDate();
    }

    const isWeekEnd = (date) => {
        return date.getDay() === 0 || date.getDay() === 6;
    }

    const tileDisable = ({ date }) => {
        return !availableDates.find(_date => isSameDay(_date, date));
    }

    return (

        <div className="row turno-calendar">
            <div className="col-md-6 m-auto turno-calendar__date">
                <div className="turno-calendar__formated-date">
                    <span>{formatedYear}</span>
                    <h3 className="p-0">{formatedDate}</h3>
                </div>
                <Calendar
                    calendarType="US"
                    maxDetail="month"
                    minDetail="month"
                    showFixedNumberOfWeeks={true}
                    next2Label={null}
                    prev2Label={null}
                    nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
                    prevLabel={<FontAwesomeIcon icon={faAngleLeft} />}

                    tileDisabled={tileDisable}
                    minDate={minDate}
                    maxDate={maxDate}
                    value={valueDate}
                    onChange={setValueDate}
                />
            </div>
            <div className="col-md-6 m-auto turno-calendar__time">
                <div className="turno-calendar__formated-time">
                    <h3 className="p-0">{formatedTime}</h3>
                </div>
                <TurnoCalendarListTime
                    turnoTimes={turnoTimes}
                    value={valueTime}
                    onChange={setValueTime}
                />
            </div>
        </div>
    )
}

export default TurnoCalendar;