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
	const loadingTurnosDisponibles = useSelector(state=> state.turnoDisponible.list.loading)
	const errorLoadingTurnosDisponibles = useSelector(state=> state.turnoDisponible.list.error);

	const authenticated = useSelector(state => state.auth.login.authenticated)
	const user = useSelector(state => state.auth.token.authenticatedUser)
	const serverConfig = useSelector(state=> state.configuration.configurations)

	const dispatch = useDispatch();

	const [formState, setFormState] = useState({
		equipo: '',
		servicio: '',
		taller: '',
		date: new Date(),
		time: false,
		domicilio: serverConfig['domicilio'],
		defecto: '',
		amPm: ''
	})
	const [servicios, setServicios] = useState(null);
	const [idEquipo, setIdEquipo] = useState(null);
	const [idServicio, setIdServicio] = useState(null);
	const [idServicioEquipo, setIdServicioEquipo] = useState(null);
	const [idTallerBrindaServicio, setIdTallerBrindaServicio] = useState(null);
	const [arrayTalleres, setArrayTalleres] = useState([]);
	const [tallerToShow, setTallerToShow] = useState(null);
	const [detalles, setDetalles] = useState(null);
	const [domicilio, setDomicilio] = useState(false);
	const [disabledForm, setDisabledForm] = useState(false);

	useEffect(()=>{
		if(serverConfig){
			setDomicilio(serverConfig['domicilio'])
		}
	}, [serverConfig])

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
		if(formState.equipo){
			dispatch(servicesFetch(getServiceFilters(1, formState.equipo)))
		}
	}, [formState.equipo])

	//Poner los servicios que se asocian con ese equipo en el combobox de servicios
	useEffect(()=>{
	    if(formState.equipo === null || formState.equipo === '')
	        setServicios(null);
		if(formState.equipo && services){
			setServicios(
				services['hydra:member'].map((item, index)=>{
					return <option key={index} value={item['nombre']}>{item['nombre']}</option>
				})
			)
		}
	}, [formState.equipo, services])

	//Actualizar el id de Equipo cuando el usuario cambie
	useEffect(()=>{
		dispatch(listTBSClearAll());
		setFormState({...formState, servicio: ''})
		if(equipos){
			if(formState.equipo === "")
				setIdEquipo(null);
			else{
				equipos.map((value)=>{
					if(value['nombre'] === formState.equipo){
						setIdEquipo(value['@id'])
					}
				})
			}
		}
	}, [formState.equipo, equipos])

	//Actualizar el id de Servicio cuando el usuario cambie
	useEffect(()=>{
		dispatch(listTBSClearAll());
		setTallerToShow(null)
		if(services){
			if(formState.servicio === ""){
				setIdServicio(null);
			}
			else{
				services['hydra:member'].map((value)=>{
					if(value['nombre'] === formState.servicio){
						setIdServicio(value['@id'])
					}
				})
			}
		}
	}, [formState.servicio, services])

	//Buscar exactamente los talleres que brindan servicio para ese equipo
	useEffect(()=>{
		if(idServicio && idEquipo && !talleresBS){
			dispatch(listTBSFetch(getTallerBrindaServicios(1, idEquipo, idServicio)));
		}
	}, [idEquipo, idServicio, talleresBS])

	//Rellenar el combobox de taller
	useEffect(()=>{
		if(talleresBS){
			//guardando el ID del par equipo-servicio
			talleresBS.map((value, index)=>{
				if(value['servicioAEquipo']['servicio'] === idServicio && value['servicioAEquipo']['equipo'] === idEquipo){
					setIdServicioEquipo(value['servicioAEquipo']['@id'])
				}
			})
			setArrayTalleres(
				talleresBS.map((tallerBS, index)=>{
					return <option key={index} value={tallerBS['taller']['alias']}>{tallerBS['taller']['alias']}</option>
				})
			)
		}
	}, [talleresBS])

	//Manejar el cambio del combobox de taller
	useEffect(()=>{
		if(formState.taller === null || formState.taller === ""){
			setIdTallerBrindaServicio(null)
			setTallerToShow(null);
		}
		if(formState.taller){
			talleresBS.map((tallerBS, index)=>{
				if(tallerBS['taller']['alias'] === formState.taller){
					setIdTallerBrindaServicio(tallerBS['@id'])
					setTallerToShow(tallerBS['taller']);
				}
			})
		}
	}, [formState.taller, equipo_servicio])

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

	//carga las fechas disponibles al cargar el componente
	useEffect(()=>{
		setFormState({...formState, date: new Date(), time: null})
		if(formState.taller && idServicioEquipo && idTallerBrindaServicio){
			let date = new Date(); // Now
			date.setDate(date.getDate() + 30);
			date = date.getFullYear() + '-' + (date.getMonth()+1) + "-" +date.getDay();
			let today = new Date();
			today = today.getFullYear() + '-' + (today.getMonth()+1) + "-" +today.getDay();
			dispatch(listTurnoDisponibleFetch(
				getTDURLFilters(1, null,formState.date, null,today, idTallerBrindaServicio)
			))
		}
	}, [formState.taller, idServicioEquipo, idTallerBrindaServicio])

	useEffect(()=>{
		if(turnosDisponibles && idServicio && idEquipo && idTallerBrindaServicio && formState.date && formState.time){
			turnosDisponibles.map((item)=>{
				let timer = formState.time.split(":");
				if(item['servicioTaller']['@id'] === idTallerBrindaServicio
					&& item['servicioTaller']['servicioAEquipo']['servicio'] === idServicio
					&& item['servicioTaller']['servicioAEquipo']['equipo'] === idEquipo
					&& item['date']['dia'] === formState.date.getDate()
					&& item['date']['mes'] === formState.date.getMonth() + 1
					&& item['date']['year'] === formState.date.getFullYear()
					&& item['date']['hora'] === parseInt(timer[0])
					&& item['date']['minutos'] === parseInt(timer[1])
				){
					setDetalles(item['@id'])
				}
			})
		}
	}, [idTallerBrindaServicio, formState.servicio, formState.equipo, formState.date, formState.time, turnosDisponibles])

	const handleSubmit = (e) => {
		e.preventDefault();
		let [hour, minute] = formState.time.split(':');
		const fecha = new Date(formState.date.getFullYear(), formState.date.getMonth(), formState.date.getDate(), hour, minute);
		let domicilioValue = formState.domicilio === 'on';
		dispatch(createTurnoFetch({
			detalles: detalles,
			defecto: formState.defecto,
			domicilio: domicilioValue,
			user: user['@id']
		}))
		//setAllToInitialState();
	}

	useEffect(() => {
		setDisabledForm(() => {
			return !formState.date
				|| !formState.time
				|| !formState.defecto
				|| loading
				|| (!authenticated && !user)
		})
	}, [formState.date, formState.time, formState.defecto, user, loading])

    const transitions = {
        enterRight: 'animated enterRight',
        enterLeft: 'animated enterLeft',
        exitRight: 'animated exitRight',
        exitLeft: 'animated exitLeft',
        intro: 'animated intro',
    };

	if (redirect)
		return (
			<Redirect to="/turnos" />
		);
	return (
		<Container className="create-turno">
			<div className="shadow-container">
				<div className='row'>
					<div className={`col-12 col-sm-6}`}>
						{loadingEquipos ? (
							<Spinner
								animation="border"
								variant="primary"/>
							) : (
						<StepWizard
							isHashEnabled
                            transitions={transitions}
                            nav={<WizardHeader/>}
						>
							<First
                                hashKey={'equipo'}
                                arrayEquipos={arrayEquipos}
								arrayServicios={servicios}
                                setFormState={setFormState}
								currentStep={1}
                                formState={formState}
								loadingServicios={loadingServicios}
                            />
							<Second
                                hashKey={'taller'}
                                tallerToShow={tallerToShow}
                                arrayTallers={arrayTalleres}
								formState={formState}
								setFormState={setFormState}
								isActiveDomicilio={serverConfig['domicilio']}
								loadingTalleres={loadingTalleresBS}
                            />
							<Horario
                                hashKey={'horario'}
                                formState={formState}
								setFormState={setFormState}
								loadingTurnos={loadingTurnosDisponibles}
                            />
							<Last
								hashKey={'TheEnd!'}
								formState={formState}
								submit={handleSubmit}
								disableNext={formState.detalles}
								//seccionDelDia={seccionDelDia}
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