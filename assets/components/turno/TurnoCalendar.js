import React, {useEffect, useState} from 'react';

import {Calendar} from "react-calendar";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import TurnoCalendarListTime from './TurnoCalendarListTime';
import LoaderLocalSpinner from '../LoaderLocal';
import {useDispatch, useSelector} from "react-redux";

const TurnoCalendar = ({ taller, handleDate, handleTime, onChangeDate, onChangeTime, setSeccionDelDia }) => {

    const [planningDays] = useState(35)
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const turnosDisponibles = useSelector(state=> state.turnoDisponible.list.turnosDisponibles);
    const error = useSelector(state=> state.turnoDisponible.list.error);
    const loading = useSelector(state=> state.turnoDisponible.list.loading);
    const dispatch = useDispatch();

    const [loadingCalendarTime, setLoadingCalendarTime] = useState(false)
    const [loadingCalendarDate, setLoadingCalendarDate] = useState(true)
    const [formatedDate, setFormatedDate] = useState("Seleccione una fecha")
    const [formatedYear, setFormatedYear] = useState(" ")
    const [formatedTime, setFormatedTime] = useState("Elija una hora")
    const [turnoTimes, setTurnoTimes] = useState([])
    const [valueDate, setValueDate] = useState(handleDate);
    const [optionTime, setOptionTime] = useState(0)
    const [valueTime, setValueTime] = useState(handleTime);
    const daysText = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const monthsText = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']


    //Cambia la fecha escogida en el componente padre
    useEffect(() => {
        onChangeDate(valueDate)
    }, [valueDate])

    //cambia la hora escogida en el componente padre
    useEffect(() => {
        onChangeTime(valueTime)
    }, [valueTime])

    useEffect(()=>{
        if(turnosDisponibles){
            let arrayOfTurnos = [];
            turnosDisponibles.map(item=>{
                if(isSameDay(item.date, valueDate)){
                    arrayOfTurnos.push(item.date['hora'] + ":" + item.date['minutos']);
                }
            });
            setTurnoTimes(arrayOfTurnos);
        }
    },[valueDate])


    useEffect(() => {
        if (turnosDisponibles){
            let array = [];
            turnosDisponibles.map(item=>{
                if(isSameDay(item.date, valueDate)){
                    array.push(item.date['hora'] + ':' + item.date['minutos']);
                }
            });
            setTurnoTimes(array);
        }
        setMinDate(new Date());
        let res = new Date()
        res.setDate(res.getDate() + planningDays)
        setMaxDate(res)
    }, [turnosDisponibles])

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
        if (valueTime) {
            let [hour, minutes] = valueTime.split(':');
            let hv = hour
            let ap = ""
            if (optionTime === 0) {
                if (hv > 12) {
                    hv -= 12
                    ap = " pm"
                }
                else ap = " am"
                if (hv === 0)
                    hv = 12
            }
            setSeccionDelDia(ap);
            let hs = hv.toString()
            let ms = minutes.toString()
            let h = hs.length === 1 ? `0${hs}` : hs
            let m = ms.length === 1 ? `0${ms}` : ms
            setFormatedTime(`${h}:${m}${ap}`)
        }
        else setFormatedTime("Elija una hora")
    }, [valueTime, optionTime])

    const isSameDay = (date_1, date_2) => {
        // console.log(date_1)
        // console.log(date_2)
        // console.log(date_1['year'], date_2.getFullYear())
        // console.log(date_1['mes'], date_2.getMonth())
        // console.log(date_1['dia'],  date_2.getDate())
        return date_1['year'] === date_2.getFullYear()
            && date_1['mes'] === date_2.getMonth()+1
            && date_1['dia'] === date_2.getDate();
    }

    const tileDisable = ({ date }) => {
        return !turnosDisponibles.some(_date => {
            return isSameDay(_date.date, date);
        });
    }

    return (

        <div className="row turno-calendar">
            {
                !turnosDisponibles
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

                            //activeStartDate={handleDate}

                            tileDisabled={tileDisable}
                            minDate={minDate}
                            maxDate={maxDate}
                            value={valueDate}
                            onChange={setValueDate}
                        />
                    </div>
            }
            {
                turnoTimes.length !== 0
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
                            loading
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