import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect, useLocation } from 'react-router-dom';
import {
	Container,
	Form,
	Button,
	InputGroup,
	Alert,
	Row,
	Col,
	ProgressBar,
	Dropdown,
	FormControl, Card, Spinner
} from 'react-bootstrap';
import StepWizard from 'react-step-wizard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faExclamationTriangle, faHammer, faTruckLoading} from '@fortawesome/free-solid-svg-icons';

import TurnoCalendar from "./TurnoCalendar";
import TurnoAuth from './TurnoAuth';
import { createTurnoFetch, createTurnoClear} from '../../redux/turno/create/createTurnoActions';
import {changeTimeZone} from "../../redux/utiles";
import Toast from "../Utils/Toast";
import {listEquipoFetch} from "../../redux/equipo/list/equipoListActions";
import {listESFetch} from "../../redux/equipoServicio/list/listEquipoServicioActions";
import {getESFilters, getTDURLFilters} from "../../redux/requestFilters";
import {Horario, First, Last, Second} from './stepComponents/Steps';
import {listTurnoDisponibleFetch} from "../../redux/turnoDisponible/list/listTurnoDisponibleActions";

const Create = ({ locations }) => {

	const equipo_servicio = useSelector(state=> state.equipoServicio.list.equipoServicio);
	const loadingES = useSelector(state=> state.equipoServicio.list.loading)
	const errorES = useSelector(state=> state.equipoServicio.list.error);

	/*Variables de Equipo*/
	const loadingEquipos = useSelector(state=> state.equipo.list.loading)
	const equipos = useSelector(state=> state.equipo.list.equipos);
	const [arrayEquipos, setArrayEquipos] = useState([]);
	const errorEquipos = useSelector(state=> state.equipo.list.error);

	/*Variables de Turno */
	const loading = useSelector(state => state.turno.create.loading)
	const turno = useSelector(state => state.turno.create.turno)
	const error = useSelector(state => state.turno.create.error)
	const [redirect, setRedirect] = useState(false);

	const turnosDisponibles = useSelector(state =>state.turnoDisponible.list.turnosDisponibles);

	const authenticated = useSelector(state => state.auth.login.authenticated)
	const user = useSelector(state => state.auth.token.authenticatedUser)
	const serverConfig = useSelector(state=> state.configuration.configurations)
	const [servicios, setServicios] = useState([]);
	const [servicio, setServicio] = useState("");
	const [taller, setTaller] = useState("");
	const [arrayTallers, setArrayTalleres] = useState([]);
	const [date, setDate] = useState(new Date())
	const [time, setTime] = useState(null)
	const [seccionDelDia, setSeccionDelDia] = useState("am");
	const [disabledForm, setDisabledForm] = useState(true)
	const [disableNext, setDisableNext] = useState(true);
	const [disableNext2, setDisableNext2] = useState(true);
	const [disableNext3, setDisableNext3] = useState(true);
	const [tallerToShow, setTallerToShow] = useState(null);
	const [idTallerBrindaServicio, setIdTallerBrindaServicio] = useState(null);

	const [equipo, setEquipo] = useState("");
	const [idEquipo, setIdEquipo] = useState("");
	const [idServicio, setIdServicio] = useState("");
	const [idServicioEquipo, setIdServicioEquipo] = useState(null);
	const [defecto, setDefecto] = useState("");
	const [domicilio, setDomicilio] = useState(false);
	const [detalles, setDetalles] = useState(null);

	const dispatch = useDispatch();

	const [userAuth, setUserAuth] = useState(null)

	//Primera peticion
	useEffect(()=>{
		dispatch(listEquipoFetch())
	}, [])

	//Cargar los equipos al renderizar
	useEffect(()=>{
		if(equipo){
			dispatch(listESFetch(getESFilters(1, null, equipo['@id'])));
		}
	}, [equipo])

	//Cuando carguen los equipos ponerlos en el combobox
	useEffect(()=>{
		if(equipos){
			setArrayEquipos(
				equipos.map((value, index)=> {
					return <option key={index} value={value['nombre']}>{value['nombre']}</option>
				})
			)
		}
	}, [equipos])

	//Poner los servicios que se asocian con ese equipo en el combobox de servicios
	useEffect(()=>{
		if(equipos){
			equipos.map((item)=>{
				if(item['nombre'] === equipo){
					setServicios(
						item['reciveServicios'].map((service, index)=>{
							return <option key={index} value={service['servicio']['nombre']}>{service['servicio']['nombre']}</option>
						})
					)
				}
			})
		}
	}, [equipo, equipos])

	//Manejar el cambio en la seleccion de equipo
	const handleChange = (e) => {
		setEquipo(e.target.value);
	}

	useEffect(()=>{
		if(equipo){
			equipos.map((value)=>{
				if(value['nombre'] === equipo){
					setIdEquipo(value['@id'])
				}
			})
		}
	}, [equipo])

	useEffect(()=>{
		if(servicio && equipo_servicio){
			equipo_servicio['hydra:member'].map((value)=>{
				if(value['servicio']['nombre'] === servicio){
					setIdServicio(value['servicio']['@id'])
				}
			})
		}
	}, [servicio, equipo_servicio])

	//Manejar el cambio de servicio
	const handleChangeServicio = (e) => {
		setServicio(e.target.value);
	}

	//Buscar exactamente los talleres que brindan servicio para ese equipo
	useEffect(()=>{
		if(equipo && servicio ){
			dispatch(listESFetch(getESFilters(1, idServicio, idEquipo)));
		}
	}, [equipo, servicio])

	//Comprobar que haya algun taller que preste ese servicio para ese equipo
	useEffect(()=>{
		if(equipo_servicio && equipo_servicio['hydra:member'][0]['tallerBrindaServicios'].length === 0){
			Toast.info("Actualmente ninguno de nuestros tallers esta prestando este servicio. Perdone las molestias que esto pueda ocasionarle. Intente de nuevo en otra ocasión!")
		}
	}, [equipo_servicio])

	//Rellenar el combobox de taller
	useEffect(()=>{
		if(equipo_servicio){
			setArrayTalleres(
				equipo_servicio['hydra:member'][0]['tallerBrindaServicios'].map((tallerBS, index)=>{
					return <option key={index} value={tallerBS['taller']['alias']}>{tallerBS['taller']['alias']}</option>
				})
			)
		}
	}, [equipo_servicio])

	//Manejar el cambio del combobox de taller
	useEffect(()=>{
		if(taller && equipo_servicio){
			setIdServicioEquipo(equipo_servicio['hydra:member'][0]['@id'])
			equipo_servicio['hydra:member'][0]['tallerBrindaServicios'].map((tallerBS, index)=>{
				if(tallerBS['taller']['alias'] === taller){
					setIdTallerBrindaServicio(tallerBS['@id'])
					setTallerToShow(tallerBS['taller']);
				}
			})
		}
	}, [taller, equipo_servicio])

	const location = useLocation()

	useEffect(()=>{
		if(turno){
			setRedirect(true);
			Toast.success("Su cita se ha programado satisfactoriamente. Nos veremos pronto!")
			dispatch(createTurnoClear());
		}
	}, [turno])

	useEffect(()=>{
		if(error){
			Toast.error(error)
		}
	}, [error])

	useEffect(() => {
		if (location && location.state) {
			//setDate(location.state.date)
			//setTime(location.state.time)
			location.state.defecto && setDefecto(location.state.defecto)
		}
	}, [location])

	useEffect(()=>{
		if(!servicio ||
			!equipo ||
			(equipo_servicio && equipo_servicio['hydra:member'].length !== 0 && equipo_servicio['hydra:member'][0]['tallerBrindaServicios'].length === 0)
		){
			setDisableNext(true);
		}
		else{
			setDisableNext(false);
		}
	}, [servicio, equipo, equipo_servicio])

	useEffect(()=>{
		if(!taller || !defecto){
			setDisableNext2(true);
		}
		else{
			setDisableNext2(false);
		}
	}, [taller, defecto])

	useEffect(()=>{
		if(time === null){
			setDisableNext3(true);
		}
		else{
			setDisableNext3(false);
		}
	}, [time])

	//carga las fechas disponibles al cargar el componente
	useEffect(()=>{
		if(taller && idServicioEquipo){
			let date = new Date(); // Now
			date.setDate(date.getDate() + 30);
			date = date.getFullYear() + '-' + (date.getMonth()+1) + "-" +date.getDay();
			let today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth()+1) + "-" +today.getDay();
			dispatch(listTurnoDisponibleFetch(
				getTDURLFilters(1, null,date, null,today, idTallerBrindaServicio)
			))
		}
	}, [taller, idServicioEquipo]);

	useEffect(()=>{
		if(turnosDisponibles && idServicio && idEquipo && idTallerBrindaServicio && date && time){
			turnosDisponibles.map((turno)=>{
				let timer = time.split(":");
				if(turno['servicioTaller']['@id'] === idTallerBrindaServicio
					&& turno['servicioTaller']['servicio'] === servicio['@id']
					&& turno['servicioTaller']['equipo'] === equipo['@id']
					&& turno['date']['dia'] === date.getDate()
					&& turno['date']['mes'] === date.getMonth() + 1
					&& turno['date']['year'] === date.getFullYear()
					&& turno['date']['hora'] === parseInt(timer[0])
					&& turno['date']['minutos'] === parseInt(timer[1])
				){
					setDetalles(turno['@id'])
				}
			})
		}
	}, [idTallerBrindaServicio, servicio, equipo, date, time, turnosDisponibles])

	const handleSubmit = (e) => {
		e.preventDefault();
		let [hour, minute] = time.split(':');
		const fecha = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute);
		let domicilioValue = domicilio === 'on';
		dispatch(createTurnoFetch({
			detalles: detalles,
			defecto,
			domicilio: domicilioValue,
			user: user['@id']
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
			<div className="shadow-container">
				<div className='row'>
					<div className={`col-12 col-sm-6}`}>
						{loadingEquipos ? (
							<Spinner>Loading...</Spinner>
							) : (
						<StepWizard
							isHashEnabled
						>
							<First
                                hashKey={'equipo'}
                                arrayEquipos={arrayEquipos}
                                servicios={servicios}
                                servicio={servicio}
                                handleChangeServicio={handleChangeServicio}
                                handleChange={handleChange}
								disabledNext={disableNext}
                            />
							<Second
                                hashKey={'taller'}
                                taller={taller}
                                tallerToShow={tallerToShow}
                                arrayTallers={arrayTallers}
                                setTaller={setTaller}
								disabledNext={disableNext2}
								domicilio={domicilio}
								setDomicilio={setDomicilio}
								defecto={defecto}
								setDefecto={setDefecto}
								isActiveDomicilio={serverConfig['domicilio']}
                            />
							<Horario
                                hashKey={'horario'}
                                date={date}
                                time={time}
                                setDate={setDate}
                                setTime={setTime}
								disabledNext={disableNext3}
								setSeccionDelDia={setSeccionDelDia}
                            />
							<Last
								hashKey={'TheEnd!'}
								taller={taller}
								servicio={servicio}
								fecha={date}
								time={time}
								equipo={equipo}
								submit={handleSubmit}
								disableNext={detalles}
								seccionDelDia={seccionDelDia}
							/>
						</StepWizard>)
						}
					</div>
				</div>
			</div>
		</Container>
	);
}

export default Create;