import React, {useEffect, useState} from 'react';
import TurnoCalendar from "./TurnoCalendar";
import {Button, Form, InputGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHammer} from "@fortawesome/free-solid-svg-icons";
import {updateTurnoFetch} from "../../redux/turno/update/updateTurnoActions";
import {useDispatch, useSelector} from "react-redux";
import { useParams } from 'react-router-dom';
import {showTurnoFetch} from "../../redux/turno/show/showTurnoActions";
import LoaderLocalSpinner from "../LoaderLocal";

const Update = () => {
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);
    const [defecto, setDefecto] = useState("");
    const [disabledForm, setDisabledForm] = useState(true)

    const turno = useSelector(state=> state.turno.show.turno);
    const loading = useSelector(state=> state.turno.show.loading);
    const error = useSelector(state=> state.turno.show.error);

    const dispatch = useDispatch();
    const {id} = useParams();
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(id);
        dispatch(updateTurnoFetch(1))
    }

    useEffect(()=>{
        dispatch(showTurnoFetch(id));
    },[])

    useEffect(() => {
        setDisabledForm(() => {
            return !date
                || !time
                || !defecto
        })
    }, [date, time, defecto])

    return (
        <div>
            {
                turno ? (
                    <Form onSubmit={handleSubmit} className="create-turno__form" >
                        <TurnoCalendar
                            handleDate={date}
                            handleTime={time}
                            onChangeDate={setDate}
                            onChangeTime={setTime}
                        />
                        <Form.Group>
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <label className="input-group-text" htmlFor="defecto" >
                                        <FontAwesomeIcon icon={faHammer} />
                                    </label>
                                </InputGroup.Prepend>
                                <Form.Control type="text" placeholder="Defecto del equipo" value={defecto} onChange={(e) => setDefecto(e.target.value)} />
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Button variant="primary" block type="submit" disabled={disabledForm}>Crear Turno</Button>
                        </Form.Group>
                    </Form>
                ):(
                    <LoaderLocalSpinner />
                )
            }
        </div>
    );
};

export default Update;
