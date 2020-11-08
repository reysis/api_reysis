import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Image, CarouselItem, Carousel } from 'react-bootstrap';
import { UncontrolledTooltip, UncontrolledCarousel } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelope, faQuestionCircle, faUserSecret,
    faSitemap, faEye, faBullseye,
    faUsers, faArrowCircleUp
} from '@fortawesome/free-solid-svg-icons';

import LogoFoter from '../assets/logo-footer.png';
import userProfile from '../assets/opinion-img-1.jpg';

const Footer = () => {

    const [currentProfile, setCurrentProfile] = useState(3);

    const [linkedinProfiles, setLinkedinProfiles] = useState([
        { id: 1, name: "Frank Rodriguez", profession: "Entrepreneur", website: "https://www.linkedin.com/frank-siret" },
        { id: 2, name: "Frank Siret", profession: "Entrepreneur", website: "https://www.linkedin.com/frank-siret" },
        { id: 3, name: "Marlon Espinosa", profession: "Freelancer", website: "https://www.github.com/MarlonAEC" },
        { id: 4, name: "Mark Antony", profession: "Musician", website: "https://www.facebook.com/markantonyoficial" },
        { id: 5, name: "Elpidio Valdes", profession: "Rebelde", website: "http://www.elpidio.cu/" }
    ]);

    const profileItems = useRef(null);
    const profileCaption = useRef(null);

    useEffect(() => {
        profileItems.current.children.forEach(profile => {
            profile.addEventListener('mouseenter', function (e) {
                const index = Number.parseInt(this.attributes.aria_key.value);
                profileCaption.current.textContent =
                    `${linkedinProfiles[index - 1].name}, ${linkedinProfiles[index - 1].profession}`;
            }, false);
        })
    }, [])

    useEffect(() => {
        profileItems.current.children.forEach(profile => {
            profile.addEventListener('mouseleave', function (e) {
                profileCaption.current.textContent =
                    `${linkedinProfiles[currentProfile - 1].name}, ${linkedinProfiles[currentProfile - 1].profession}`;
            }, false);
        })
    }, [currentProfile])

    const profileClicked = (id, website) => {
        if (id != currentProfile)
            setCurrentProfile(id);
        else
            open(website);
    }

    return (
        <footer className="footer-component">
            <div className="phrase-container container">
                <blockquote data-aos="zoom-in" className="blockquote text-center">
                    {/* <div className="background"><FontAwesomeIcon icon={faQuoteRight} /></div> */}
                    <svg className="background" width="50" height="42" viewBox="0 0 447 376"><path d="M0 93.406c0 45.628 25.929 81.896 73.071 81.896 15.322 0 29.465-4.68 40.072-11.7l1.029 6.13c.75 4.716 1.328 9.548 1.328 16.1 0 47.91-25.769 99.155-56.551 139.64l-2.378 3.093c-7.071 9.36-10.607 19.89-1.178 26.91l33 23.398c9.428 5.85 17.678 8.19 24.75-1.17l4.387-5.872C158.447 316.43 198 244.37 198 147.224 198 55.968 149.679 8 91.929 8 38.893 8 0 44.268 0 93.406zm249 0C249 44.268 287.893 8 340.929 8 398.679 8 447 55.968 447 147.224c0 100.615-42.429 174.322-84.857 230.48-7.072 9.359-15.322 7.019-24.75 1.17l-33-23.4c-9.066-6.75-6.146-16.744.379-25.824l.8-1.085c31.82-40.948 58.928-93.595 58.928-142.733 0-9.36-1.179-15.21-2.357-22.23-10.607 7.02-24.75 11.7-40.072 11.7-47.142 0-73.071-36.268-73.071-81.896z" fill="#A0CED1" opacity="0.221"></path></svg>
                    <cite className="phrase mb-0">"Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo laboriosam facilis magni pariatur, expedita autem."</cite>
                    {/* <footer className="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer> */}
                </blockquote>
            </div>
            <div className="profiles-container container">
                <div ref={profileItems} className="profiles">
                    {
                        linkedinProfiles.map(profile => {
                            return (
                                <a
                                    key={profile.id}
                                    data-aos="zoom-in"
                                    aria_key={profile.id}
                                    className={`profile-item ${profile.id == currentProfile ? "current-item" : "min-item"}`}
                                    onClick={() => profileClicked(profile.id, profile.website)}
                                >
                                    <Image src={userProfile} alt={profile.name} className="profile-image" />
                                </a>
                            );
                        })
                    }
                </div>
                <h3 ref={profileCaption} data-aos="zoom-in" className="profile-caption">
                    {`${linkedinProfiles[currentProfile - 1].name}, ${linkedinProfiles[currentProfile - 1].profession}`}
                </h3>
            </div>
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
                <div data-aos="fade-up" className="contact-menu menu-footer">
                    <h3 className="menu-title">Conecte con nosotros</h3>
                    <div className="contact-items d-flex flex-row">
                        <a
                            target="_blank"
                            href="https://www.linkedin.com/"
                            className="item li"
                            id="linkedin-tooltip"
                        ><FontAwesomeIcon icon={faLinkedin} /></a>
                        <UncontrolledTooltip placement="bottom" target="linkedin-tooltip">
                            Linkedin
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="https://www.facebook.com/"
                            className="item fb"
                            id="facebook-tooltip"
                        ><FontAwesomeIcon icon={faFacebook} /></a>
                        <UncontrolledTooltip placement="bottom" target="facebook-tooltip">
                            Facebook
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="https://www.instagram.com/"
                            className="item ig"
                            id="instagram-tooltip"
                        ><FontAwesomeIcon icon={faInstagram} /></a>
                        <UncontrolledTooltip placement="bottom" target="instagram-tooltip">
                            Instagram
                        </UncontrolledTooltip>
                        <a
                            target="_blank"
                            href="https://web.whatsapp.com/"
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