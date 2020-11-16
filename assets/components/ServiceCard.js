import React, { useEffect, useRef } from 'react';
import { Card } from 'reactstrap';

import serviceImage from '../assets/service1.png';

const ServiceCard = ({ nombre, descripcion, imaage }) => {

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
        <Card data-aos="fade-up" className="service-card" >
            <figure ref={card}>
                <div><img src={serviceImage} alt={"Servicio " + { nombre }} /></div>
                <figcaption>
                    <h3>{nombre}</h3>
                    <p>{descripcion}</p>
                    <a ref={card_button} href="#">Leer más</a>
                </figcaption>
            </figure>
        </Card>
    )
}

export default ServiceCard;