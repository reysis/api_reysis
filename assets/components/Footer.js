import React, { Component } from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Image} from 'react-bootstrap';
import LogoFoter from '../assets/logo-footer.png';

class Footer extends Component {
    render() {
        return (
            <footer className="footer-component">
                <div className="footer-container container">
                    <div data-aos="zoom-in" className="logo-menu menu-footer">
                        <a href="#landing">
                            <Image className="logo-footer" src={LogoFoter} alt="Variante de Logo Reysis"/>
                        </a>
                    </div>
                    <div data-aos="fade-up" className="learn-more-menu menu-footer">
                        <h3 className="menu-title">Aprenda más</h3>
                        <ul className="footer-menu-list">
                            <li className="menu-item">Contáctenos</li>
                            <li className="menu-item">Preguntas frecuentes</li>
                            <li className="menu-item">Terminos y políticas de privacidad</li>
                        </ul>
                    </div>
                    <div data-aos="fade-up" className="our-company-menu menu-footer">
                        <h3 className="menu-title">Nuestra compañía</h3>
                        <ul className="footer-menu-list">
                            <li className="menu-item">Nuestro Equipo</li>
                            <li className="menu-item">Misión</li>
                            <li className="menu-item">Visión</li>
                        </ul>
                    </div>
                    <div data-aos="fade-up" className="contact-menu menu-footer">
                        <h3 className="menu-title">Conecte con nosotros</h3>
                        <ul className="footer-menu-list">
                            <li className="menu-item">
                                <span>Linkedin</span>
                                <FontAwesomeIcon icon={['fab', 'linkedin']} />
                            </li>
                            <li className="menu-item">
                                <span>Facebook</span>
                                <FontAwesomeIcon icon={['fab', 'facebook']} />
                            </li>
                            <li className="menu-item">
                                <span>Instagram</span>
                                <FontAwesomeIcon icon={['fab', 'instagram']} />
                            </li>
                            <li className="menu-item">
                                <span>Whatsapp</span>
                                <FontAwesomeIcon icon={['fab', 'whatsapp']} />
                            </li>
                        </ul>
                    </div>
                    <div data-aos="fade-up" className="website-menu menu-footer">
                        <h3 className="menu-title">Sitio web</h3>
                        <ul className="footer-menu-list">
                            <li className="menu-item">Mapa del sitio</li>
                            <li className="menu-item">Regresar al inicio</li>
                        </ul>
                    </div>
                </div>
                <div className="copyright-container container">
                    <div className="copyright menu-footer">
                        <span>©Reysis 2020. Todos los derechos reservados</span>
                    </div>
                    <div className="developed-container">
                        <span>Developed by: </span>
                        <a href="https://www.github.com/MarlonAEC">Marlon A. Espinosa Castañeiras</a>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer;