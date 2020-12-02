import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { Container, Form, Button, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import TurnoCalendar from "./TurnoCalendar";
import AuthCreateTurno from './Auth';
import { createTurnoFetch } from '../../redux/turno/create/createTurnoActions';
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

const Create = ({ locations }) => {

	const loading = useSelector(state => state.turno.createTurno.request)
	const turno = useSelector(state => state.turno.createTurno.turno)
	const error = useSelector(state => state.turno.createTurno.error)

	const authenticated = useSelector(state => state.auth.authenticated)
	const user = useSelector(state => state.auth.user)

	const [disabledForm, setDisabledForm] = useState(false)

	const [defecto, setDefecto] = useState("");

	const dispatch = useDispatch();

	const now = new Date()

	const [date, setDate] = useState(null)
	const [time, setTime] = useState(null)

	const [userAuth, setUserAuth] = useState({})

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

	useEffect(() => {
		if (location && location.state) {
			setDate(location.state.date)
			setTime(location.state.time)
			setDefecto(location.state.defecto)
		}
	}, [location])

	const handleSubmit = (e) => {
		e.preventDefault();

		console.log(date, time)

		const fecha = new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.hour, time.minute)
		let userTurno = null
		if (authenticated)
			userTurno = user.id
		else userTurno = userAuth

		dispatch(createTurnoFetch({
			fecha,
			defecto,
			user: userTurno
		}))
	}

	// useEffect(() => {
	// 	// disable form
	// }, [])

	if (turno)
		return (
			//<Redirect to={`edit/${encodeURIComponent(turno['@id'])}`} />
			<Redirect to='/' />
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

				{
					!authenticated &&
					<Form.Group className="create-turno__auth-bg">
						<div className="p-3 create-turno__authenticated">
							<div className="create-turno__authenticated-header">
								<h2>Debe estar autenticado para continuar</h2>
							</div>
							<div className="col-md-8 col-lg-6 m-auto create-turno__authenticated-options">
								<p className="mb-0"><Link to={toLogin}>Ya tengo cuenta</Link></p>
								<div className="mb-3 mx-4 create-turno__separator">
									<p className="mt-2 mb-2 hr">o</p>
									<p>Entre los siguientes datos</p>
								</div>
							</div>
							<AuthCreateTurno setUserAuth={setUserAuth} />
						</div>
					</Form.Group>
				}
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