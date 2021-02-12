import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhone, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import { messagePost } from '../redux/contact_message/messageActions'
import { Form, Button } from 'react-bootstrap'

// import Toast from "./layouts/Toast";

import Toast from './Utils/Toast'

const Contact = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [validEmail, setValidEmail] = useState(false)

	// const [toastType, setToastType] = useState(null);
	// const [toastList, setToastList] = useState([]);

	const loading = useSelector(state => state.contactMessage.loading)
	const error = useSelector(state => state.contactMessage.error)
	const messageResponse = useSelector(state => state.contactMessage.message);

	const [contactMessageButton, setContactMessageButton] = useState('Enviar Mensaje');
	const dispatch = useDispatch()

	useEffect(() => {
		if (loading) {
			setContactMessageButton("Enviando ...")
		}
		else if (error != null) {
			setContactMessageButton("Error")
		}

		if (!loading) {
			setTimeout(() => {
				setContactMessageButton("Enviar Mensaje")
			}, 2000);
		}
	}, [loading])

	var timeout = null

	useEffect(() => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			// RFC
			let reg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
			setValidEmail(() => reg.test(email))
		}, 1000);
	}, [email])

	useEffect(() => {
		console.log("it works")
		Toast.dark("it works")
	}, [])

	useEffect(() => {
		if (error) {
			// let toastProperties = {
			// 	id: Math.floor((Math.random() * 100) + 1),
			// 	type: 'danger-toast',
			// 	title: "Oh vaya :(!",
			// 	description: error,
			// 	icon: faTimes
			// };
			// setToastList([...toastList, toastProperties]);
			Toast.error(error)
		}
	}, [error])

	useEffect(() => {
		if (messageResponse) {
			// setToastType('success')
			// let toastProperties = {
			// 	id: Math.floor((Math.random() * 100) + 1),
			// 	type: 'success-toast',
			// 	title: "Excelente!",
			// 	description: "Su mensaje ha sido enviado correctamente!",
			// 	icon: faCheck
			// };
			// setToastList([...toastList, toastProperties]);
			Toast.success("Su mensaje ha sido enviado correctamente!")
		}
	}, [messageResponse])

	useEffect(() => {
		if (!loading && error == null) {
			setName('')
			setEmail('')
			setPhone('')
			setMessage('')
		}
	}, [loading])

	const handleContactMessage = (e) => {
		e.preventDefault()

		dispatch(messagePost({
			nombre: name,
			fromEmail: email,
			contactPhone: phone,
			message
		}))
	}

	return (
		<section id="contact-home" className="contact-component section-padding">
			<div data-aos="fade-up" className="container">
				<div className="contact-header">
					<h2><span>Contáctanos</span></h2>
					<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque</p>
				</div>
				<div className="row contact-info">
					<div className="col-md-4">
						<div className="single-contact contact-address">
							<div className="contact-icon">
								<FontAwesomeIcon icon={faMapMarkerAlt} />
							</div>
							<h3>Dirección</h3>
							<address>Calle 23 y M, La Habana, Cuba</address>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-contact contact-phone">
							<div className="contact-icon">
								<FontAwesomeIcon icon={faPhone} />
							</div>
							<h3>Teléfono</h3>
							<p><a href="tel:+5355555555">(+53) 555 555 55</a></p>
						</div>
					</div>
					<div className="col-md-4">
						<div className="single-contact contact-email">
							<div className="contact-icon">
								<FontAwesomeIcon icon={faEnvelope} />
							</div>
							<h3>Correo</h3>
							<p><a href="mailto:contact@reysis.cu">contact@reysis.cu</a></p>
						</div>
					</div>
				</div>
				<div className="form">
					<Form onSubmit={handleContactMessage} className="contact-form">
						<div className="form-group">
							<input type="text" className="form-control" id="name" name="name" placeholder="Nombre" required data-error="Por favor entre su nombre" value={name} onChange={(e) => setName(e.target.value)} />
							{/* <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" data-rule="minlen:4" data-msg="Please enter at least 4 chars" /> */}
							{/* <div class="validate"></div> */}
						</div>
						<div className="row">
							<div className="form-group col-md-6">
								<Form.Control type="email" id="email" placeholder="Correo" isInvalid={email.length && !validEmail} isValid={email.length && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} required data-error="Por favor entre su correo" />
								{/* <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" data-rule="email" data-msg="Please enter a valid email" /> */}
								{/* <div class="validate"></div> */}
							</div>
							<div className="form-group col-md-6">
								<input type="text" placeholder="Teléfono" id="phone" className="form-control" name="phone" required data-error="Por favor entre su teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
								{/* <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" data-rule="minlen:4" data-msg="Please enter at least 8 chars of subject" /> */}
								{/* <div class="validate"></div> */}
							</div>
						</div>
						<div className="form-group">
							<textarea className="form-control contact-home-message" id="message" placeholder="Su Mensaje" rows="5" data-error="Escriba un mensaje" required value={message} onChange={(e) => setMessage(e.target.value)} />
						</div>
						<Form.Group className="text-center submit-button mb-0">
							<Button disabled={loading} className="contact-button m-0" type="submit">{contactMessageButton}</Button>
						</Form.Group>
					</Form>
				</div>
			</div>
			{/* <Toast
				type={toastType}
				toastList={toastList}
				setToastList={setToastList}
				position="bottom-left"
				autoDelete={true}
				autoDeleteTime={4000}
			/> */}
		</section>
	)
}

export default Contact