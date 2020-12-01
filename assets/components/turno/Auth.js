import React, { useState, useEffect } from 'react';

import { Button, Form, InputGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faUserTag, faTag } from '@fortawesome/free-solid-svg-icons';

const AuthCreateTurno = () => {

	const [name, setName] = useState("")
	const [lastname, setLastname] = useState("")
	const [email, setEmail] = useState("")
	const [phoneType, setPhoneType] = useState("")
	const [phone, setPhone] = useState("")
	const [address, setAddress] = useState("")

	const [validEmail, setValidEmail] = useState(false)

	const [phoneTypes] = useState([
		"Casa",
		"Personal",
		"Trabajo"
	])

	var timeout = null;

	useEffect(() => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			let t = /[a-z](\.?[a-z0-9-_]+)*@[a-z0-9-_](\.?[a-z0-9-_]+)*\.[a-z]+/.exec(email);
			setValidEmail(() => {
				return t && email.length == t[0].length && t.index == 0
			})
		}, 1000);
	}, [email])

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