import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import LoaderLocalSpinner from "../LoaderLocal";
import TurnoCard from "./TurnoCard";
import {listTurnoFetch} from "../../redux/turno/list/listTurnoActions";
import {getFormatedDate, getHoursFromDate, isoStringToDate} from "../../redux/utiles";

const TurnosContainer = () => {
    const turnos = useSelector(state=>state.turno.list.turnos);
    const loading = useSelector(state=>state.turno.list.loading);
    const error = useSelector(state=>state.turno.list.error);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listTurnoFetch());
    }, [])

    return (
        <div className="container">
            {turnos
                ?(
                    turnos['hydra:member'].map((item, index)=>{
                        return <TurnoCard
                            key={index}
                            id={item['@id']}
                            defecto={item['defecto']}
                            date={getFormatedDate(isoStringToDate(item['fecha']))}
                            time={getHoursFromDate(isoStringToDate(item['fecha']))}
                            index={index + 1}
                        />
                    })
                ):
                <LoaderLocalSpinner/>
            }
        </div>
    );
};

export default TurnosContainer;
