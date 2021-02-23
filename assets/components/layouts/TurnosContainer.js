import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoaderLocalSpinner from "../LoaderLocal";
import TurnoCard from "./TurnoCard";
import {listTurnoFetch, listTurnoSuccess} from "../../redux/turno/list/listTurnoActions";
import {getFormatedDate, getHoursFromDate, getIdFromUrl, isoStringToDate} from "../../redux/utiles";
import {turnoDelete} from "../../redux/turno/delete/deleteTurnoActions";
import {Button, Row} from "react-bootstrap";
import Toast from "../Utils/Toast";
import {Link} from "react-router-dom";

const TurnosContainer = () => {
    const turnos = useSelector(state=>state.turno.list.turnos);
    const loading = useSelector(state=>state.turno.list.loading);
    const error = useSelector(state=>state.turno.list.error);
    const turnoDeleted = useSelector(state=> state.turno.del.deleted);
    const turnoDeleteError = useSelector(state=> state.turno.del.error);

    const [deleted, setDeleted] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listTurnoFetch());
    }, [])

    const handleDeleteTurno = (id) =>{
        dispatch(turnoDelete(id))
        setDeleted(id);
    }

    useEffect(()=>{
        if(turnoDeleted){
            dispatch(listTurnoSuccess(
                turnos.filter( (value)=>{
                        return value['@id'] !== deleted
                    }
                ))
            )
            Toast.success("Su cita ha sido eliminada! Siempre que quiera puede reprogramarla")
        }
    }, [turnoDeleted])

    useEffect(()=>{
        if(turnoDeleteError){
            Toast.error(turnoDeleteError);
        }
    }, [turnoDeleteError])

    return (
        <div id="turnos" className="container turno-list__container shadow-container">
            {
                turnos && turnos.length === 0 &&
                    <div className="turno-list__nothing-to-display">
                        <p>No hay turnos que mostrar</p>
                        <Link to="/turnos/create">
                            <button className="turno-card_make-appointment-button">Hacer cita</button>
                        </Link>
                    </div>
            }
            {turnos &&
                turnos.map((item, index)=>{
                    return <TurnoCard
                        key={index}
                        id={item['@id']}
                        defecto={item['defecto']}
                        date={getFormatedDate(isoStringToDate(item['fecha']))}
                        time={getHoursFromDate(isoStringToDate(item['fecha']))}
                        index={index + 1}
                        deleteTurno={()=>handleDeleteTurno(item['@id'])}
                    />
                })
            }
            {
                loading &&
                <LoaderLocalSpinner/>
            }
        </div>
    );
};

export default TurnosContainer;
