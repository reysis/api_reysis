import React, { useState, useEffect } from 'react';

import { Button, Form, InputGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faUserTag, faTag, faIdCard } from '@fortawesome/free-solid-svg-icons';

const AuthCreateTurno = ({ setUserAuth }) => {

	const [name, setName] = useState("")
	const [lastname, setLastname] = useState("")
	const [cid, setCid] = useState("")
	const [email, setEmail] = useState("")
	const [phoneType, setPhoneType] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")

	const [validEmail, setValidEmail] = useState(false)
	const [validCid, setValidCid] = useState(false)

	const [phoneTypes] = useState([
		"Casa",
		"Personal",
		"Trabajo"
	])

	var timeout = null,
		timeout2 = null

	useEffect(() => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			// RFC
			let reg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
			setValidEmail(() => reg.test(email))
		}, 1000);
	}, [email])

	useEffect(() => {
		if (timeout2) clearTimeout(timeout2)
		timeout2 = setTimeout(() => {
			let reg = /^[0-9]{11,11}$/
			setValidCid(() => reg.test(cid))
		}, 1000);
	}, [cid])

	useEffect(() => {

		if (!phone.length
			|| (!name.length && !lastname.length)
			|| !address.length
			|| !email.length
			|| !validEmail) {
			setUserAuth(null)
			return;
		}

		const phoneNumbers = [{
			phoneType,
			number: phone
		}]
		const persona = {
			nombre: [name, lastname].join(' '),
			ci: cid
		}
		const nationality = "Cubano"
		const username = `user__rand-auth__${Math.round(Math.random() * 1000000) + 1000000}`
		const password = "engage" // change this
		setUserAuth({
			persona,
			phoneNumbers,
			address: {
				postAddress: address,
				indications: address
			},
			username,
			email,
			password,
			nationality
		})
	}, [name, lastname, cid, email, phoneType, phone, address])

	return (
		<Col className="col-md-8 col-lg-6 m-auto create-turno__authenticated-auth px-0">
			<Form.Row>
				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="create-turno-name" >
								<FontAwesomeIcon icon={faUser} />
							</label>
						</InputGroup.Prepend>
						<Form.Control type="name" id="create-turno-name" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} />
					</InputGroup>
				</Form.Group>
				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="create-turno-lastname" >
								<FontAwesomeIcon icon={faUser} />
							</label>
						</InputGroup.Prepend>
						<Form.Control type="lastname" id="create-turno-lastname" placeholder="Apellidos" value={lastname} onChange={(e) => setLastname(e.target.value)} />
					</InputGroup>
				</Form.Group>
			</Form.Row>

			<Form.Group >
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="create-turno-cid" >
							<FontAwesomeIcon icon={faIdCard} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="id" id="create-turno-cid" placeholder="Carner Identidad" title="El carnet de identidad tiene 11 números" value={cid} isValid={cid.length && validCid} isInvalid={cid.length && !validCid} onChange={(e) => setCid(e.target.value)} />
				</InputGroup>
			</Form.Group>

			<Form.Group>
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="create-turno-email">
							<FontAwesomeIcon icon={faAt} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="email" id="create-turno-email" placeholder="Correo Electrónico" isInvalid={email.length && !validEmail} isValid={email.length && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
				</InputGroup>
			</Form.Group>

			<Form.Row>
				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="create-turno-phone">
								<FontAwesomeIcon icon={faPhone} />
							</label>
						</InputGroup.Prepend>
						<Form.Control type="phone" id="create-turno-phone" placeholder="Número de Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} ></Form.Control>
					</InputGroup>
				</Form.Group>
				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="create-turno-phone-type">
								<FontAwesomeIcon icon={faPhone} />
							</label>
						</InputGroup.Prepend>
						<Form.Control as="select" id="create-turno-phone-type" className="custom-select" as="select" defaultValue={phoneType} onChange={(e) => setPhoneType(e.target.value)} >
							<option value="" >Tipo de Télefono ...</option>
							{
								phoneTypes.map((value, index) => (
									<option key={index} value={value}>{value}</option>
								))
							}
						</Form.Control>
					</InputGroup>
				</Form.Group>
			</Form.Row>

			<Form.Group >
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="create-turno-address">
							<FontAwesomeIcon icon={faAddressBook} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="text" id="create-turno-address" placeholder="Dirección Particular" value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
				</InputGroup>
			</Form.Group>

			<Form.Group className="mb-0">
				<small id="fileHelp" className="form-text text-muted mb-2">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></small>
			</Form.Group>
		</Col>
	)
}

export default AuthCreateTurno;