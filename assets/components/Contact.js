import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faMapMarkerAlt,
	faEnvelope,
	faPhone
} from '@fortawesome/free-solid-svg-icons'
import {
	faTwitter,
	faFacebookF
} from '@fortawesome/free-brands-svg-icons'

const Contact = () => {

	return (
		<section id="contact-home" className="contact-component section-padding">
			<div className="container">
				<div data-aos="fade-up" className="row contact-form-area">
					<div className="col-md-6 col-lg-6 col-sm-12">
						<div className="contact-block">
							<div className="contact-title">
								<h2>Send us <span>a message</span></h2>
							</div>
							<form id="contactForm">
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<input type="text" className="form-control" id="name" name="name" placeholder="Nombre" required data-error="Por favor entre su nombre" />
											<div className="help-block with-errors"></div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" placeholder="Correo" id="email" className="form-control" name="email" required data-error="Por favor entre su correo" />
											<div className="help-block with-errors"></div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="form-group">
											<input type="text" placeholder="Teléfono" id="phone" className="form-control" name="phone" required data-error="Por favor entre su teléfono" />
											<div className="help-block with-errors"></div>
										</div>
									</div>
									{/* <div className="col-md-12">
										<div className="form-group">
											<input type="text" placeholder="Asunto" id="msg_subject" className="form-control" required data-error="Por favor entre el asunto" />
											<div className="help-block with-errors"></div>
										</div>
									</div> */}
									<div className="col-md-12">
										<div className="form-group">
											<textarea className="form-control" id="message" placeholder="Su Mensaje" rows="5" data-error="Escriba un mensaje" required></textarea>
											<div className="help-block with-errors"></div>
										</div>
										<a href="#" className="submit-button">
											<button className="contact-button" type="submit">Enviar Mensaje</button>
										</a>
									</div>
								</div>
							</form>
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
								<div className="col-md-12 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faMapMarkerAlt} />
									</div>
									<p><span>Calle 23 y M, La Habana, Cuba</span></p>
								</div>
								<div className="col-md-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faEnvelope} />
									</div>
									<p><span><a href="mailto:contact@reysis.su" target="_blank">contact@reysis.su</a></span></p>
								</div>
								<div className="col-md-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faPhone} />
									</div>
									<p><span><a href="tel:5355555555" target="_blank">(+53) 555 555 55</a></span></p>
								</div>
								<div className="col-md-6 single-contact">
									<div className="contact-icon">
										<FontAwesomeIcon icon={faTwitter} />
									</div>
									<p><span><a href="https://www.twitter.com/reysis" target="_blank">@reysis</a></span></p>
								</div>
								<div className="col-md-6 single-contact">
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