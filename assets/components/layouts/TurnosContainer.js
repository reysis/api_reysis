import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoaderLocalSpinner from "../LoaderLocal";
import TurnoCard from "./TurnoCard";
import {listTurnoFetch, listTurnoSuccess} from "../../redux/turno/list/listTurnoActions";
import {getFormatedDate, getHoursFromDate, getIdFromUrl, isoStringToDate} from "../../redux/utiles";
import Toast from '../../Toast';
import {toast} from "react-toastify";
import {turnoDelete} from "../../redux/turno/delete/deleteTurnoActions";

const TurnosContainer = () => {
    const turnos = useSelector(state=>state.turno.list.turnos);
    const loading = useSelector(state=>state.turno.list.loading);
    const error = useSelector(state=>state.turno.list.error);

    const [deleted, setDeleted] = useState(null);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listTurnoFetch());
    }, [])

    const handleDeleteTurno = (id) =>{
        dispatch(turnoDelete(id))
        dispatch(listTurnoSuccess(
            turnos.filter( (value)=>{
                return value['@id'] !== id
            }
        )))
    }

    return (
        <div className="container">
            {
                turnos && turnos.length === 0 &&
                    <p>No hay turnos que mostrar</p>
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
