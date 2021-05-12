import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux'

import useMediaQuery from '@restart/hooks/useMediaQuery/'

import { Link } from 'react-router-dom';

import { Image, CarouselItem, Carousel } from 'react-bootstrap';
import { UncontrolledTooltip, UncontrolledCarousel } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope, faQuestionCircle, faUserSecret,
    faSitemap, faEye, faBullseye,
    faUsers, faArrowCircleUp, faCheck, faUserTie
} from '@fortawesome/free-solid-svg-icons';

import LogoFoter from '../assets/logo-footer.png';
import userProfile from '../assets/default-user.png';

const Footer = () => {

    const pathName = useSelector(state => state.router.location.pathname)

    const [numberView, setNumberView] = useState(5);

    const [currentProfile, setCurrentProfile] = useState(0);

    const [linkedinProfiles, setLinkedinProfiles] = useState([
        { id: 1, name: "Frank", profession: "Entrepreneur", website: "https://www.linkedin.com/frank-siret" },
        { id: 2, name: "Frank", profession: "Front-End Development", website: "https://www.linkedin.com/frank-siret" },
        { id: 3, name: "Marlon", profession: "Head of Team", website: "https://www.github.com/MarlonAEC" },
        { id: 4, name: "Mark", profession: "Musician", website: "https://www.facebook.com/markantonyoficial" },
        { id: 5, name: "Elpidio", profession: "Rebelde", website: "http://www.elpidio.cu/" }
    ]);

    const profileList = useRef(null);

    const isWide = useMediaQuery('(max-width: 860px)');

    useEffect(() => {
        setNumberView(isWide ? 3 : 5);
    }, [isWide])

    const upClick = () => {
        document.getElementById('root').scrollIntoView({ behavior: 'smooth' })
    }

    const footerPhrase = useSelector(state => state.configuration.configurations.footerPhrase)

    return (
        <footer className="footer-component">
            {
                pathName == "/" &&
                <div className="phrase-container container">
                    {
                        footerPhrase != undefined &&
                        <blockquote data-aos="fade-up" className="blockquote text-center">
                            <div>
                                <svg className="background" width="50" height="42" viewBox="0 0 447 376"><path d="M0 93.406c0 45.628 25.929 81.896 73.071 81.896 15.322 0 29.465-4.68 40.072-11.7l1.029 6.13c.75 4.716 1.328 9.548 1.328 16.1 0 47.91-25.769 99.155-56.551 139.64l-2.378 3.093c-7.071 9.36-10.607 19.89-1.178 26.91l33 23.398c9.428 5.85 17.678 8.19 24.75-1.17l4.387-5.872C158.447 316.43 198 244.37 198 147.224 198 55.968 149.679 8 91.929 8 38.893 8 0 44.268 0 93.406zm249 0C249 44.268 287.893 8 340.929 8 398.679 8 447 55.968 447 147.224c0 100.615-42.429 174.322-84.857 230.48-7.072 9.359-15.322 7.019-24.75 1.17l-33-23.4c-9.066-6.75-6.146-16.744.379-25.824l.8-1.085c31.82-40.948 58.928-93.595 58.928-142.733 0-9.36-1.179-15.21-2.357-22.23-10.607 7.02-24.75 11.7-40.072 11.7-47.142 0-73.071-36.268-73.071-81.896z" fill="#A0CED1" opacity="0.221"></path></svg>
                            </div>
                            <cite className="phrase mb-0"><q>{footerPhrase}</q></cite>
                        </blockquote>
                    }
                </div>
            }
            {
                pathName == "/" &&
                <div className="profiles-container container">
                    <div data-aos="zoom-in" className="slider--teams" >
                        <div className="slider--teams__team">
                            <ul
                                ref={profileList}
                                className="cf profile-list"
                                style={{
                                    marginLeft: `${~~(100 / numberView * (numberView - 1) / 2)}%`,
                                    width: `${~~(100 * linkedinProfiles.length / numberView)}%`,
                                    transform: `translateX(${~~((-(100 / linkedinProfiles.length)) * currentProfile) + '%'})`
                                }}
                            >
                                {
                                    linkedinProfiles.map(profile => {
                                        return (
                                            <li
                                                key={profile.id}
                                                onClick={() => setCurrentProfile(profile.id - 1)}
                                                style={{
                                                    width: `${100 / linkedinProfiles.length}%`
                                                }}
                                            >
                                                <figure className={profile.id - 1 == currentProfile ? "active" : ""}>
                                                    <div>
                                                        <Image src={userProfile} alt={profile.name} />
                                                    </div>
                                                    <figcaption>
                                                        <h2>{profile.name}</h2>
                                                        <p>{profile.profession}</p>
                                                    </figcaption>
                                                </figure>
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            }
            <div className="footer-container container">
                <div data-aos="zoom-in" className="logo-menu menu-footer mb-4">
                    <Link to={{ pathname: '/', hash: '#landing' }}>
                        <Image className="logo-footer" src={LogoFoter} alt="Variante de Logo Reysis" />
                    </Link>
                </div>
                <div data-aos="fade-up" className="learn-more-menu menu-footer">
                    <h3 className="menu-title">Aprenda más</h3>
                    <Link className="menu-item d-flex flex-row" to="/#contact-title">
                        <div className="pr-2"><FontAwesomeIcon icon={faEnvelope} /></div>
                        Contáctenos
                    </Link>
                    <Link className="menu-item d-flex flex-row" to="/faq">
                        <div className="pr-2"><FontAwesomeIcon icon={faQuestionCircle} /></div>
                        Preguntas frecuentes
                    </Link>
                    <Link className="menu-item d-flex flex-row" to="/terms-condition">
                        <div className="pr-2"><FontAwesomeIcon icon={faUserSecret} /></div>
                        Terminos y privacidad
                    </Link>
                    <Link className="menu-item d-flex flex-row" to="/garanty">
                        <div className="pr-2"><FontAwesomeIcon icon={faCheck} /></div>
                        Garantías
                    </Link>
                </div>
                <div data-aos="fade-up" className="our-company-menu menu-footer">
                    <h3 className="menu-title">Nuestra compañía</h3>
                    <Link className="menu-item d-flex flex-row" to="/about">
                        <div className="pr-2"><FontAwesomeIcon icon={faUsers} /></div>
                        Nuestro Equipo
                    </Link>
                    <Link className="menu-item d-flex flex-row" to="/mission">
                        <div className="pr-2"><FontAwesomeIcon icon={faBullseye} /></div>
                        Misión y Visión
                    </Link>
                    <Link className="menu-item d-flex flex-row" to="/valores">
                        <div className="pr-2"><FontAwesomeIcon icon={faEye} /></div>
                        Valores
                    </Link>
                </div>
                <div data-aos="fade-up" className="website-menu menu-footer">
                    <h3 className="menu-title">Sitio web</h3>
                    <Link className="menu-item d-flex flex-row" to="/about">
                        <div className="pr-2"><FontAwesomeIcon icon={faSitemap} /></div>
                        Mapa del sitio
                    </Link>
                    <a className="menu-item d-flex flex-row" onClick={upClick}>
                        <div className="pr-2"><FontAwesomeIcon icon={faArrowCircleUp} /></div>
                        Regresar al inicio
                    </a>
                </div>
                <div data-aos="fade-up" className="contact-menu menu-footer">
                    <h3 className="menu-title">Conecte con nosotros</h3>
                    <div className="contact-items d-flex flex-row">
                        <a
                            target="_blank"
                            href="#"
                            className="item li"
                            id="linkedin-tooltip"
                        ><FontAwesomeIcon icon={faLinkedin} /></a>
                        <UncontrolledTooltip placement="bottom" target="linkedin-tooltip">
                            Linkedin
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="#"
                            className="item fb"
                            id="facebook-tooltip"
                        ><FontAwesomeIcon icon={faFacebook} /></a>
                        <UncontrolledTooltip placement="bottom" target="facebook-tooltip">
                            Facebook
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="#"
                            className="item ig"
                            id="instagram-tooltip"
                        ><FontAwesomeIcon icon={faInstagram} /></a>
                        <UncontrolledTooltip placement="bottom" target="instagram-tooltip">
                            Instagram
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="#"
                            className="item wa"
                            id="whatsapp-tooltip"
                        ><FontAwesomeIcon icon={faWhatsapp} /></a>
                        <UncontrolledTooltip placement="bottom" target="whatsapp-tooltip">
                            Whatsapp
                        </UncontrolledTooltip>
                    </div>
                </div>
            </div>
            <div className="copyright-container p-4">
                <div className="copyright pb-2">
                    <span>Reysis. Copyright © 2020. Todos los derechos reservados.</span>
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