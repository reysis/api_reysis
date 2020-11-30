import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import TurnoCalendar from "./TurnoCalendar";
import AuthCreateTurno from './Auth';

const Create = ({ locations }) => {

	const loading = useSelector(state => state.turno.createTurno.request)
	const turno = useSelector(state => state.turno.createTurno.turno)
	const error = useSelector(state => state.turno.createTurno.error)

	const authenticated = useSelector(state => state.auth.authenticated)
	const user = useSelector(state => state.auth.user)

	const [disabledForm, setDisabledForm] = useState(true)

	const [defecto, setDefecto] = useState("");

	const dispatch = useDispatch();

	const now = new Date()

	const [date, setDate] = useState(() => {
		return {
			day: 1,
			month: 1,
			year: 2020
		}
	})
	const [time, setTime] = useState(() => {
		return {
			hour: 0,
			minute: 0
		}
	})

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

	useEffect(() => {

	}, [])

	const onSubmit = () => {

	}

	const onChangeDate = (date) => {

	}

	const onChangeTime = (time) => {

	}

	if (turno)
		return (
			<Redirect to={`edit/${encodeURIComponent(turno['@id'])}`} />
		);
	return (
		<Container className="create-turno">
			{
				loading &&
				<div className="alert alert-info" role="status">
					Loading...
          		</div>
			}
			{
				error &&
				<div className="alert alert-danger" role="alert">
					{error}
				</div>
			}
			<Form onSubmit={onSubmit} className="create-turno__form" >
				<Form.Group>
					<TurnoCalendar onChangeDate={onChangeDate} onChangeTime={onChangeTime} />
				</Form.Group>

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

				{
					!authenticated &&
					<Form.Group className="create-turno__auth-bg">
						<div className="create-turno__authenticated">
							<div className="create-turno__authenticated-header">
								<h2>Debe estar autenticado para continuar</h2>
							</div>
							<div className="create-turno__authenticated-options">
								<p className="mb-0"><Link to={toLogin}>Ya tengo cuenta</Link></p>
								<div className="mb-3 mx-4 create-turno__separator">
									<p className="mt-2 mb-2 hr">o</p>
									<p>Entre los siguientes datos para continuar</p>
								</div>
							</div>
							<AuthCreateTurno />
						</div>
					</Form.Group>
				}
				<Form.Group>
					<Button variant="primary" block type="submit" disabled={disabledForm}>Crear Turno</Button>
				</Form.Group>
			</Form>
			{
				authenticated &&
				<Link to="/turnos" className="create-turno__link">
					<button className="create-turno__button">Mostrar mi lista</button>
				</Link>
			}
		</Container>
	);
}

export default Create;