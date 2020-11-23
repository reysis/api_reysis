import React, { useEffect, useRef } from 'react';
import { Card } from 'reactstrap';

import serviceImage from '../assets/service1.png';

const ServiceCard = ({ nombre, descripcion, image, aosDelay }) => {

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
		<div className="col-md-6 col-lg-4 col-xs-12 card-tile">
			<Card data-aos="fade-up" data-aos-delay={aosDelay} className="cards-style service-card" >
				<figure ref={card}>
					<div><img src={serviceImage} alt={"Servicio " + { nombre }} /></div>
					<figcaption>
						<h3>{nombre}</h3>
						<p>{descripcion}</p>
						<a ref={card_button} href="#">Leer más</a>
					</figcaption>
				</figure>
			</Card>
		</div>
	)
}

export default ServiceCard;