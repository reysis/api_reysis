import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import { Container, Form, Button, InputGroup, Alert } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHammer } from '@fortawesome/free-solid-svg-icons';

import TurnoCalendar from "./TurnoCalendar";
import TurnoAuth from './TurnoAuth';
import { createTurnoFetch, createTurnoClear} from '../../redux/turno/create/createTurnoActions';
import {changeTimeZone} from "../../redux/utiles";

const Create = ({ locations }) => {

	const loading = useSelector(state => state.turno.create.loading)
	const turno = useSelector(state => state.turno.create.turno)
	const error = useSelector(state => state.turno.create.error)
	const [redirect, setRedirect] = useState(false);

	const authenticated = useSelector(state => state.auth.authenticated)
	const user = useSelector(state => state.auth.user)

	const [disabledForm, setDisabledForm] = useState(true)

	const [defecto, setDefecto] = useState("");

	const dispatch = useDispatch();

	// const now = new Date()

	const [date, setDate] = useState(null)
	const [time, setTime] = useState(null)

	const [userAuth, setUserAuth] = useState(null)

	const toLogin = () => ({
		pathname: '/login',
		search: '?redirect',
		state: {
			redirect: '/turnos/create',
			date,
			time,
			defecto
		}
	})

	const location = useLocation()

	useEffect(()=>{
		if(turno){
			setRedirect(true);
			dispatch(createTurnoClear());
		}
	}, [turno])

	useEffect(() => {
		if (location && location.state) {
			//setDate(location.state.date)
			//setTime(location.state.time)
			location.state.defecto && setDefecto(location.state.defecto)
		}
	}, [location])

	const handleSubmit = (e) => {
		e.preventDefault();
		let [hour, minute] = time.split(':');

		const fecha = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
		dispatch(createTurnoFetch({
			fecha: fecha.toUTCString(),
			defecto,
			user: user.id
		}))
	}

	useEffect(() => {
		setDisabledForm(() => {
			return !date
				|| !time
				|| !defecto
				|| loading
				|| (!authenticated && !userAuth)
		})
	}, [date, time, defecto, userAuth, loading])

	if (redirect)
		return (
			//<Redirect to={`edit/${encodeURIComponent(turno['@id'])}`} />
				<Redirect to="/turnos" />
		);
	return (
		<Container className="create-turno">
			<Alert role={"status"} variant={"info"} show={loading}>Loading...</Alert>
			<Alert role={"alert"} variant={"danger"} show={error} >
				<FontAwesomeIcon icon={faExclamationTriangle} />{' '}
				{error}
			</Alert>
			<Form onSubmit={handleSubmit} className="create-turno__form" >

				<TurnoCalendar handleDate={date} onChangeDate={setDate} handleTime={time} onChangeTime={setTime} />

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
			{
				authenticated &&
				<div className="mx-3 mb-3 create-turno__separator">
					<p className="mb-3 hr">o</p>
					<Link to="/turnos" className="create-turno__link">
						<button className="create-turno__button">Mostrar mi lista</button>
					</Link>
				</div>
			}
		</Container>
	);
}

export default Create;