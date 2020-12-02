import React, { useState, useEffect } from 'react';

import { Calendar } from "react-calendar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import TurnoCalendarListTime from './TurnoCalendarListTime';
import LoaderLocalSpinner from '../LoaderLocal';
import { Form } from 'react-bootstrap';

const TurnoCalendar = ({ handleDate, handleTime, onChangeDate, onChangeTime }) => {

    const [now] = useState(new Date())
    const [planningDays] = useState(15)

    const [availableDates, setAvailableDates] = useState([])

    const availableDatesBag = [
        new Date(2020, 10, 26),
        new Date(2020, 10, 27),
        new Date(2020, 10, 30),
        new Date(2020, 11, 1),
        new Date(2020, 11, 2),
        new Date(2020, 11, 3),
        new Date(2020, 11, 4),
        new Date(2020, 11, 7),
        new Date(2020, 11, 8),
        new Date(2020, 11, 9),
        new Date(2020, 11, 10),
        new Date(2020, 11, 11)
    ]

    const turnoTimesBag = [
        { hour: 8, minute: 30 },
        { hour: 9, minute: 0 },
        { hour: 10, minute: 0 },
        { hour: 10, minute: 30 },
        { hour: 11, minute: 30 },
        { hour: 13, minute: 30 },
        { hour: 14, minute: 0 },
        { hour: 15, minute: 0 },
        { hour: 15, minute: 30 }
    ]

    const [turnoTimes, setTurnoTimes] = useState(null)

    const [valueDate, setValueDate] = useState(null);

    const [valueTime, setValueTime] = useState(handleTime);

    useEffect(() => {
        onChangeDate(valueDate)
    }, [valueDate])

    useEffect(() => {
        onChangeTime(valueTime)
    }, [valueTime])

    const [minDate, setMinDate] = useState(null);

    const [maxDate, setMaxDate] = useState(null);

    useEffect(() => {
        if (availableDates.length)
            setMinDate(availableDates[0]);
        setMinDate(new Date(now));

        let res = new Date(now)
        res.setDate(res.getDate() + planningDays)
        setMaxDate(res)
    }, [availableDates])

    const [loadingCalendarTime, setLoadingCalendarTime] = useState(false)

    const [loadingCalendarDate, setLoadingCalendarDate] = useState(true)

    const [formatedDate, setFormatedDate] = useState("Seleccione una fecha")

    const [formatedYear, setFormatedYear] = useState(" ")

    const [formatedTime, setFormatedTime] = useState("Elija una hora")

    const daysText = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const monthsText = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

    useEffect(() => {
        if (valueDate) {
            setFormatedDate(`${daysText[valueDate.getDay()]}, ${monthsText[valueDate.getMonth()]} ${valueDate.getDate()}`)
            setFormatedYear(valueDate.getFullYear())
        }
        else {
            setFormatedDate("Seleccione una fecha")
            setFormatedYear(" ")
        }
    }, [valueDate])

    useEffect(() => {
        if (!valueDate) return;
        // loading times availables
        // simulating delay time
        setTurnoTimes(null)
        setLoadingCalendarTime(true)
        setTimeout(() => {
            setTurnoTimes([...turnoTimesBag])
            setLoadingCalendarTime(false)
        }, 3000)
    }, [valueDate])

    const [optionTime, setOptionTime] = useState(0)

    useEffect(() => {
        if (valueTime) {
            let hv = valueTime.hour
            let ap = ""
            if (optionTime == 0) {
                if (hv > 12) {
                    hv -= 12
                    ap = " pm"
                }
                else ap = " am"
                if (hv == 0)
                    hv = 12
            }
            let hs = hv.toString()
            let ms = valueTime.minute.toString()
            let h = hs.length == 1 ? `0${hs}` : hs
            let m = ms.length == 1 ? `0${ms}` : ms
            setFormatedTime(`${h}:${m}${ap}`)
        }
        else setFormatedTime("Elija una hora")
    }, [valueTime, optionTime])

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

    useEffect(() => {
        // loading available dates
        // simulating delay time
        setTimeout(() => {
            setAvailableDates(availableDatesBag)
            setLoadingCalendarDate(false)
        }, 3000);
    }, [])

    return (

        <div className="row turno-calendar">
            {
                loadingCalendarDate
                    ? <div className="col-md-6 m-auto turno-calendar__date-block">
                        <div><LoaderLocalSpinner /></div>
                    </div>
                    : <div className="col-md-6 m-auto turno-calendar__date">
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

                            activeStartDate={handleDate}

                            tileDisabled={tileDisable}
                            minDate={minDate}
                            maxDate={maxDate}
                            value={valueDate}
                            onChange={setValueDate}
                        />
                    </div>
            }
            {
                turnoTimes
                    ? <div className="col-md-6 m-auto turno-calendar__time">
                        <div className="turno-calendar__formated-time">
                            <h3 className="p-0">{formatedTime}</h3>
                        </div>
                        <TurnoCalendarListTime
                            turnoTimes={turnoTimes}
                            value={valueTime}
                            onChange={setValueTime}
                            optionTime={optionTime}
                            setOptionTime={setOptionTime}
                        />
                    </div>
                    : <div className="col-md-6 m-auto turno-calendar__time-block">
                        {
                            loadingCalendarTime
                                ? <div><LoaderLocalSpinner /></div>
                                : <div className="turno-calendar__time-block__label">
                                    <h3>Seleccione una fecha</h3>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default TurnoCalendar;