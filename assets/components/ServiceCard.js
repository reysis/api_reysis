import React, { useEffect, useRef } from 'react';
import { Card } from 'reactstrap';

import serviceImage from '../assets/service1.png';

const ServiceCard = ({ layout, title, text, img }) => {

    /* using react hooks */
    const card_button = useRef(null);
    const card = useRef(null);

    /* is the same that componentWillMount */
    useEffect(() => {
        if (document.head.parentNode.classList.contains("touch")) {

            card_button.current.addEventListener('touchstart', function (e) {
                e.stopPropagation();
            }, false);

            card.current.addEventListener('touchstart', function (e) {
                this.classList.toggle('cs-hover');
            }, false);
        }
    }, []);

    return (
        <Card data-aos="fade-up" className={`service-card ${layout ? "service-white-card" : "service-grey-card"}`}>
            <figure ref={card}>
                <div><img src={serviceImage} alt={"Servicio " + { title }} /></div>
                <figcaption>
                    <h3>{title}</h3>
                    <p>{text}</p>
                    <a ref={card_button} href="#">Leer más</a>
                </figcaption>
            </figure>
        </Card>
    )
}

export default ServiceCard;