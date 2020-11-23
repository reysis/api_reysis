import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faEnvelope,
    faPhone
} from '@fortawesome/free-solid-svg-icons';

const Contact = () => {

	return (
		<section className="contact-component section-padding">
			<div className="container">
				<div data-aos="fade-up" className="row contact-form-area">
					<div className="col-md-6 col-lg-6 col-sm-12">
						<div className="contact-block">
							<form id="contactForm">
								<div className="row">
							  		<div className="col-md-6"> 
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
							   		<div className="col-md-12">
							    		<div className="form-group">
							      			<input type="text" placeholder="Asunto" id="msg_subject" className="form-control" required data-error="Por favor entre el asunto" />
							      			<div className="help-block with-errors"></div>
							    		</div>
							  		</div>
							  		<div className="col-md-12">
							    		<div className="form-group"> 
							      			<textarea className="form-control" id="message" placeholder="Su Mensaje" rows="5" data-error="Escriba un mensaje" required></textarea>
							      			<div className="help-block with-errors"></div>
							    		</div>
							    		<Link className="submit-button" to="#">
					                        <button className="contact-button" type="submit">Enviar Mensaje</button>
					                    </Link>
							  		</div>
								</div>            
							</form>
						</div>
					</div>
					<div className="col-md-6 col-lg-6 col-sm-12">
						<div className="contact-right-area">
							<div className="contact-header">
								<h2>Contáctenos</h2>
							</div>
							<div className="contact-right">
								<div className="single-contact">
									<div className="contact-icon">
							    		<FontAwesomeIcon icon={faMapMarkerAlt} />
							  		</div>
							  		<p>Dirección: <span>23 y M, La Habana, Cuba</span></p>
								</div>
								<div className="single-contact">
							  		<div className="contact-icon">
							    		<FontAwesomeIcon icon={faEnvelope} />
							  		</div>
							  		<p>Correo: <span><a href="mailto:contact@reysis.su">contact@reysis.su</a></span></p>
								</div>
								<div className="single-contact">
							  		<div className="contact-icon">
							    		<FontAwesomeIcon icon={faPhone} />
							  		</div>
							  		<p>Teléfono: <span>(+53) 555 555 55</span></p>
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