import React, {useEffect, useRef, useState} from 'react';
import { Card } from 'reactstrap';

import LoaderLocal from './LoaderLocal';

import { Link } from 'react-router-dom'
import {getIdFromUrl} from "../redux/utiles";

const ServiceCard = ({ id, nombre, descripcion, images, loading }) => {

	/* using react hooks */
	const card_button = useRef(null);
	const card = useRef(null);
	const [imageIndex, setImageIndex] = useState(0);

	/*useEffect(()=>{
		const interval = setInterval( () =>{
			if(images){
				if(imageIndex === images.length - 1){
					setImageIndex(0);
				}
				else{
					setImageIndex(imageIndex + 1);
				}
			}
		}, 4000);
		return () => clearInterval(interval);
	})*/

	/* is the same that componentWillMount */
	useEffect(() => {
		if (card_button.current) {
			if (document.head.parentNode.classList.contains("touch")) {
				card_button.current.addEventListener('touchstart', function (e) {
					e.stopPropagation();
				}, false);

				card.current.addEventListener('touchstart', function (e) {
					this.classList.toggle('cs-hover');
				}, false);
			}
		}
	}, [card_button]);

	return (
		<div className="col-lg-4 col-md-6 col-xs-12 card-tile">
			<Card data-aos="fade" data-aos-delay={150} className="cards-style service-card" >
				{
					loading
						? <LoaderLocal />
						: <figure ref={card}>
							<div>
								<img src={images[imageIndex]['contentUrl']} alt={"Servicio " + nombre} />
							</div>
							<figcaption>
								<h3>{nombre}</h3>
								<p>{descripcion}</p>
								<Link to={`/services/${getIdFromUrl(id)}`} ref={card_button}>Leer más</Link>
							</figcaption>
						</figure>
				}
			</Card>
		</div>
	)
}

export default ServiceCard;