import React, { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'
import { useDispatch, useSelector } from 'react-redux'

import { messagePost } from '../redux/contact_message/messageActions'
import { Form, Button } from 'react-bootstrap'

const Contact = () => {

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [message, setMessage] = useState('')
	const [validEmail, setValidEmail] = useState(false)

	const loading = useSelector(state => state.contactMessage.loading)

	var timeout = null

	useEffect(() => {
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(() => {
			// RFC
			let reg = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
			setValidEmail(() => reg.test(email))
		}, 1000);
	}, [email])

	const dispatch = useDispatch()

	const handleContactMessage = (e) => {
		e.preventDefault()

		dispatch(messagePost({
			nombre: name,
			fromEmail: email,
			contactPhone: phone,
			message
		}))
	}

	useEffect(() => {
		if (!loading) {
			setName('')
			setEmail('')
			setPhone('')
			setMessage('')
		}
	}, [loading])

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
							{/* <textarea class="form-control" name="message" rows="5" data-rule="required" data-msg="Please write something for us" placeholder="Message"></textarea> */}
							{/* <div class="validate"></div> */}
						</div>
						{/* <div class="mb-3">
							<div class="loading">Loading</div>
							<div class="error-message"></div>
							<div class="sent-message">Your message has been sent. Thank you!</div>
						</div> */}
						<Form.Group className="text-center submit-button mb-0">
							<Button disabled={loading} className="contact-button m-0" type="submit">{loading ? "Enviando ..." : "Enviar Mensaje"}</Button>
						</Form.Group>
					</Form>
				</div>
			</div>
		</section>
	)

	return (
		<section id="contact-home" className="contact-component section-padding">
			<div className="container">
				<div data-aos="fade-up" className="row contact-form-area">
					<div className="col-md-6 col-lg-6 col-sm-12">
						<div className="contact-block">
							<div className="contact-title">
								<h2>Send us <span>a message</span></h2>
							</div>
							<Form onSubmit={handleContactMessage} id="contactForm">
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<input type="text" className="form-control" id="name" name="name" placeholder="Nombre" required data-error="Por favor entre su nombre" value={name} onChange={(e) => setName(e.target.value)} />
											<div className="help-block with-errors"></div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<Form.Control type="email" id="email" placeholder="Correo" isInvalid={email.length && !validEmail} isValid={email.length && validEmail} value={email} onChange={(e) => setEmail(e.target.value)} required data-error="Por favor entre su correo" />
											{/* <input type="text" placeholder="Correo" className="form-control" name="email" required data-error="Por favor entre su correo" /> */}
											<div className="help-block with-errors"></div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" placeholder="Teléfono" id="phone" className="form-control" name="phone" required data-error="Por favor entre su teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} />
											<div className="help-block with-errors"></div>
										</div>
									</div>
									<div className="col-md-12">
										<div className="form-group">
											<textarea className="form-control contact-home-message" id="message" placeholder="Su Mensaje" rows="5" data-error="Escriba un mensaje" required value={message} onChange={(e) => setMessage(e.target.value)} />
											<div className="help-block with-errors"></div>
										</div>
										<Form.Group className="submit-button">
											<Button disabled={loading} className="contact-button" type="submit">{loading ? "Enviando..." : "Enviar Mensaje"}</Button>
										</Form.Group>
									</div>
								</div>
							</Form>
						</div>
					</div>
					<div className="col-md-6 col-lg-6 col-sm-12">
						<div data-aos="fade-up" className="contact-right-area">
							<div className="contact-title">
								<h2 className="pb-4">Get in <span>touch</span></h2>
								<p>We’re very approachable and would love to speak to you. Feel free to call, send us an email, Tweet us or simply complete the enquiry form.</p>
							</div>
							{/* <div className="contact-header">
								<h2>Contáctenos</h2>
							</div> */}
							<div className="row contact-right">
								<div className="col-lg-12 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faMapMarkerAlt} />
									</div>
									<p><span>Calle 23 y M, La Habana, Cuba</span></p>
								</div>
								<div className="col-lg-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faEnvelope} />
									</div>
									<p><span><a href="mailto:contact@reysis.su" target="_blank">contact@reysis.su</a></span></p>
								</div>
								<div className="col-lg-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faPhone} />
									</div>
									<p><span><a href="tel:5355555555" target="_blank">(+53) 555 555 55</a></span></p>
								</div>
								<div className="col-lg-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faTwitter} />
									</div>
									<p><span><a href="https://www.twitter.com/reysis" target="_blank">@reysis</a></span></p>
								</div>
								<div className="col-lg-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faFacebookF} />
									</div>
									<p><span><a href="https://www.facebook.com/reysis" target="_blank">/reysis</a></span></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Contact