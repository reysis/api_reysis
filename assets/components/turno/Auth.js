import React, { useState, useEffect } from 'react';

import { Button, Form, InputGroup, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faAt, faPhone, faRedoAlt, faAddressBook, faExclamationTriangle, faUserTag, faTag } from '@fortawesome/free-solid-svg-icons';

const AuthCreateTurno = () => {

	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [passwordCheck, setPasswordCheck] = useState("")
	const [email, setEmail] = useState("")
	const [telephone, setTelephone] = useState("")
	const [address, setAddress] = useState("")

	const [arePasswordMatch, setArePasswordMatch] = useState(false)
	const [validEmail, setValidEmail] = useState(false)

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

	useEffect(() => {
		setArePasswordMatch(() => {
			return password.length > 0 && passwordCheck.length > 0 && password == passwordCheck
		})
	}, [password, passwordCheck])

	return (
		<Col className="create-turno__authenticated-auth px-0">
			<Form.Group>
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="username" >
							<FontAwesomeIcon icon={faUser} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="user" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
				</InputGroup>
			</Form.Group>

			<Form.Group>
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="email">
							<FontAwesomeIcon icon={faAt} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="email" placeholder="Correo Electrónico" isInvalid={email.length > 0 && !validEmail} isValid={email.length > 0 && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} ></Form.Control>
				</InputGroup>
			</Form.Group>

			<Form.Row>
				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="password">
								<FontAwesomeIcon icon={faLock} />
							</label>
						</InputGroup.Prepend>
						<Form.Control type="password" placeholder="Contraseña" isValid={arePasswordMatch} value={password} onChange={(e) => setPassword(e.target.value)} ></Form.Control>
					</InputGroup>
				</Form.Group>

				<Form.Group as={Col} md={6}>
					<InputGroup>
						<InputGroup.Prepend>
							<label className="input-group-text" htmlFor="passwordCheck">
								<FontAwesomeIcon icon={faRedoAlt} />
							</label>
						</InputGroup.Prepend>
						<Form.Control type="password" placeholder="Confirmar Contraseña" isValid={arePasswordMatch} value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)} ></Form.Control>
					</InputGroup>
				</Form.Group>
			</Form.Row>

			{/* <Form.Group>
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="passwordCheck">
							<FontAwesomeIcon icon={faTag} />
						</label>
					</InputGroup.Prepend>
					<Form.Control ref={tipoUsuarioSelect} className="custom-select" disabled={tipoUsuarioLoading || tipoUsuarioError} as="select" defaultValue={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} >
						<option value="" >Tipo de Usuario ...</option>
						{
							tipoUsuarioList.map(tu => (
								<option key={tu.id} value={tu.id}>{tu.tipo}</option>
							))
						}
					</Form.Control>
				</InputGroup>
			</Form.Group> */}

			<Form.Group>
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="telephone">
							<FontAwesomeIcon icon={faPhone} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="text" placeholder="Teléfono" value={telephone} onChange={(e) => setTelephone(e.target.value)} ></Form.Control>
				</InputGroup>
			</Form.Group>

			<Form.Group >
				<InputGroup>
					<InputGroup.Prepend>
						<label className="input-group-text" htmlFor="address">
							<FontAwesomeIcon icon={faAddressBook} />
						</label>
					</InputGroup.Prepend>
					<Form.Control type="text" placeholder="Dirección Particular" value={address} onChange={(e) => setAddress(e.target.value)} ></Form.Control>
				</InputGroup>
			</Form.Group>

			<Form.Group className="mb-0">
				<small id="fileHelp" className="form-text text-muted mb-2">Al registrarse estás aceptando nuestros <a href="#">Términos y Condiciones</a></small>
			</Form.Group>
		</Col>
	)
}

export default AuthCreateTurno;