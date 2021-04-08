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
import {getESFilters, getServiceFilters, getTallerBrindaServicios, getTDURLFilters} from "../../redux/requestFilters";
import {Horario, First, Last, Second, WizardHeader} from './stepComponents/Steps';
import {
	listTurnoDisponibleClearAll,
	listTurnoDisponibleFetch
} from "../../redux/turnoDisponible/list/listTurnoDisponibleActions";
import {servicesFetch} from "../../redux/service/list/serviceListActions";
import {listTBSClearAll, listTBSFetch} from "../../redux/tallerBrindaServicio/list/listTallerBrindaServicioActions";

const Create = ({ locations }) => {

	const equipo_servicio = useSelector(state=> state.equipoServicio.list.equipoServicio);
	const loadingES = useSelector(state=> state.equipoServicio.list.loading)
	const errorES = useSelector(state=> state.equipoServicio.list.error);

	/*Variables de Equipo*/
	const loadingEquipos = useSelector(state=> state.equipo.list.loading)
	const equipos = useSelector(state=> state.equipo.list.equipos);
	const [arrayEquipos, setArrayEquipos] = useState([]);
	const errorEquipos = useSelector(state=> state.equipo.list.error);

	/*Variables de Servicios*/
	const loadingServicios = useSelector(state=> state.service.list.loading);
	const services = useSelector(state=> state.service.list.services);
	const errorService = useSelector(state=> state.service.list.error);

	/*Variables de Talleres*/
	const talleresBS = useSelector(state=> state.tallerBrindaServicio.list.talleres)
	const errorTalleresBS = useSelector(state=> state.tallerBrindaServicio.list.error);
	const loadingTalleresBS = useSelector(state=> state.tallerBrindaServicio.list.loading);

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
	const [servicio, setServicio] = useState(null);
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

	const [equipo, setEquipo] = useState(null);
	const [idEquipo, setIdEquipo] = useState("");
	const [idServicio, setIdServicio] = useState("");
	const [idServicioEquipo, setIdServicioEquipo] = useState(null);
	const [defecto, setDefecto] = useState("");
	const [domicilio, setDomicilio] = useState(false);
	const [detalles, setDetalles] = useState(null);

	const dispatch = useDispatch();

	const [userAuth, setUserAuth] = useState(null)

	const setAllToInitialState = ()=>{
		setServicios([]);
		setServicio(null);
		setTaller("");
		setArrayTalleres([]);
		setDate(new Date())
		setTime(null)
		setSeccionDelDia("am");
		setDisabledForm(true)
		setDisableNext(true);
		setDisableNext2(true);
		setDisableNext3(true);
		setTallerToShow(null);
		setIdTallerBrindaServicio(null);
		setEquipo("");
		setIdEquipo("");
		setIdServicio("");
		setIdServicioEquipo(null);
		setDefecto("");
		setDomicilio(false);
		setDetalles(null);
		setUserAuth(null)
	}

	//Primera peticion
	useEffect(()=>{
		dispatch(listEquipoFetch())
	}, [])

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

	//Buscando los servicios en la BD
	useEffect(()=>{
		if(equipo){
			dispatch(servicesFetch(getServiceFilters(1, equipo)))
		}
	}, [equipo])

	//Poner los servicios que se asocian con ese equipo en el combobox de servicios
	useEffect(()=>{
		if(equipo && services){
			setServicios(
				services['hydra:member'].map((item, index)=>{
					return <option key={index} value={item['nombre']}>{item['nombre']}</option>
				})
			)
		}
	}, [equipo, services])

	//Manejar el cambio en la seleccion de equipo
	const handleChange = (e) => {
		setEquipo(e.target.value);
	}

	//Manejar el cambio de servicio
	const handleChangeServicio = (e) => {
		setServicio(e.target.value);
	}

	//Actualizar el id de Equipo cuando el usuario cambie
	useEffect(()=>{
		if(equipo && equipos){
			equipos.map((value)=>{
				if(value['nombre'] === equipo){
					setIdEquipo(value['@id'])
				}
			})
		}
	}, [equipo, equipos])

	//Actualizar el id de Servicio cuando el usuario cambie
	useEffect(()=>{
		if(servicio && services){
			services['hydra:member'].map((value)=>{
				if(value['nombre'] === servicio){
					setIdServicio(value['@id'])
				}
			})
		}
	}, [servicio, services])

	//Buscar exactamente los talleres que brindan servicio para ese equipo
	const handleNext1 =()=>{
		if(idServicio && idEquipo && !talleresBS){
			dispatch(listTBSFetch(getTallerBrindaServicios(1, idEquipo, idServicio)));
		}
	}

	//Comprobar que haya algun taller que preste ese servicio para ese equipo
	useEffect(()=>{
		if(talleresBS && talleresBS['totalItems'] === 0){
			Toast.info("Actualmente ninguno de nuestros tallers esta prestando este servicio. Perdone las molestias que esto pueda ocasionarle. Intente de nuevo en otra ocasión!")
		}
	}, [talleresBS])

	//Rellenar el combobox de taller
	useEffect(()=>{
		if(talleresBS){
			//guardando el ID del par equipo-servicio
			talleresBS.map((value, index)=>{
				if(value['servicioAEquipo']['servicio'] === idServicio && value['servicioAEquipo']['equipo'] === idEquipo){
					setIdServicioEquipo(value['@id'])
				}
			})
			console.log("Rellenando el combobox");
			setArrayTalleres(
				talleresBS.map((tallerBS, index)=>{
					return <option key={index} value={tallerBS['taller']['alias']}>{tallerBS['taller']['alias']}</option>
				})
			)
		}
	}, [talleresBS])

	const firstHandleGoBack = () =>{
		dispatch(listTBSClearAll());
		setTallerToShow(null);
		setTaller(null);
	}

	//Manejar el cambio del combobox de taller
	useEffect(()=>{
		if(taller){
			talleresBS.map((tallerBS, index)=>{
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
	const handleNext2=()=>{
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
	}

	const handleBack2=()=>{
		setTime(null);
		setDate(new Date());
		dispatch(listTurnoDisponibleClearAll());
	}

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
		setAllToInitialState();
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

    const transitions = {
        enterRight: 'animated enterRight',
        enterLeft: 'animated enterLeft',
        exitRight: 'animated exitRight',
        exitLeft: 'animated exitLeft',
        intro: 'animated intro',
    };

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
                            transitions={transitions}
                            nav={<WizardHeader/>}
						>
							<First
                                hashKey={'equipo'}
                                arrayEquipos={arrayEquipos}
                                servicios={servicios}
                                servicio={servicio}
                                handleChangeServicio={handleChangeServicio}
                                handleChange={handleChange}
								disabledNext={disableNext}
								loadingEquipos={loadingEquipos}
								loadingServicios={loadingServicios}
								handleNext={handleNext1}
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
								handleGoBack={firstHandleGoBack}
								loadingTalleres={loadingTalleresBS}
								handleNext={handleNext2}
                            />
							<Horario
                                hashKey={'horario'}
                                date={date}
                                time={time}
                                setDate={setDate}
                                setTime={setTime}
								disabledNext={disableNext3}
								setSeccionDelDia={setSeccionDelDia}
								handleNext={()=>{}}
								handleGoBack={handleBack2}
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