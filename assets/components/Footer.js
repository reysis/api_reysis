import React from 'react';
import { Image } from 'react-bootstrap';
import LogoFoter from '../assets/logo-footer.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope, faQuestionCircle, faUserSecret,
    faSitemap, faEye, faBullseye,
    faUsers, faArrowCircleUp
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-component">
            <div className="footer-container container">
                <div data-aos="zoom-in" className="logo-menu menu-footer mb-4">
                    <a href="#landing">
                        <Image className="logo-footer" src={LogoFoter} alt="Variante de Logo Reysis" />
                    </a>
                </div>
                <div data-aos="fade-up" className="learn-more-menu menu-footer">
                    <h3 className="menu-title">Aprenda más</h3>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faEnvelope} /></div>
                        Contáctenos
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faQuestionCircle} /></div>
                        Preguntas frecuentes
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faUserSecret} /></div>
                        Terminos y privacidad
                    </Link>
                </div>
                <div data-aos="fade-up" className="our-company-menu menu-footer">
                    <h3 className="menu-title">Nuestra compañía</h3>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faUsers} /></div>
                        Nuestro Equipo
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faBullseye} /></div>
                        Misión
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faEye} /></div>
                        Visión
                    </Link>
                </div>
                <div data-aos="fade-up" className="contact-menu menu-footer">
                    <h3 className="menu-title">Conecte con nosotros</h3>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2 li"><FontAwesomeIcon icon={faLinkedin} /></div>
                        Linkedin
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2 fb"><FontAwesomeIcon icon={faFacebook} /></div>
                        Facebook
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2 ig"><FontAwesomeIcon icon={faInstagram} /></div>
                        Instagram
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2 wa"><FontAwesomeIcon icon={faWhatsapp} /></div>
                        Whatsapp
                    </Link>
                </div>
                <div data-aos="fade-up" className="website-menu menu-footer">
                    <h3 className="menu-title">Sitio web</h3>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faSitemap} /></div>
                        Mapa del sitio
                    </Link>
                    <Link className="menu-item d-flex flex-row">
                        <div className="pr-2"><FontAwesomeIcon icon={faArrowCircleUp} /></div>
                        Regresar al inicio
                    </Link>
                </div>
            </div>
            <div className="copyright-container p-4">
                <div className="copyright pb-2">
                    <span>©Reysis 2020. Todos los derechos reservados</span>
                </div>
                <div className="developed-container">
                    <span className="mr-1">Developed by:</span>
                    <a href="https://www.github.com/MarlonAEC">Marlon A. Espinosa Castañeiras</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;