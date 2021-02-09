import React, { useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUsers,
	faInfo,
	faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import {Link} from "react-router-dom";

const About = () => {

	const aboutUs = useSelector(state => state.configuration.configurations.aboutUs)
	const whoWeAre = useSelector(state => state.configuration.configurations.whoWeAre)
	const whatWeDo = useSelector(state => state.configuration.configurations.whatWeDo)
	const meetOurTeam = useSelector(state => state.configuration.configurations.meetOurTeam)

	return (
		<div id="feature" className="feature-component">
			<div className="container-fluid">
				<div className="row m-0">
					<div className="offset-lg-1 col-lg-5 offset-md-2 col-md-10 offset-sm-2 col-sm-10">
						<div className="text-wrapper px-4">
							<div>
								<div className="feature-header">
									<h2 data-aos="fade-left" data-aos-delay="300" className="pb-2">Acerca de <span>nosotros</span></h2>
									{aboutUs !== undefined && <p>{aboutUs}</p>}
								</div>
								<Link to="/about">
									<button className="acercade-button">Leer más</button>
								</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-6 col-md-12 col-sm-12 p-0 feature-bg">
						<div className="feature-thumb">
							<div data-aos="fade-down" data-aos-delay="300" className="feature-item" >
								<div className="icon">
									<FontAwesomeIcon icon={faInfo} />
								</div>
								<div className="feature-content">
									<h3>Quienes somos</h3>
									{whoWeAre != undefined && <p>{whoWeAre}</p>}
								</div>
							</div>
							<div data-aos="fade-down" data-aos-delay="500" className="feature-item" >
								<div className="icon">
									<FontAwesomeIcon icon={faLayerGroup} />
								</div>
								<div className="feature-content">
									<h3>Que hacemos</h3>
									{whatWeDo != undefined && <p>{whatWeDo}</p>}
								</div>
							</div>
							<div data-aos="fade-down" data-aos-delay="700" className="feature-item" >
								<div className="icon">
									<FontAwesomeIcon icon={faUsers} />
								</div>
								<div className="feature-content">
									<h3>Conoce nuestro equipo</h3>
									{meetOurTeam != undefined && <p>{meetOurTeam}</p>}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About