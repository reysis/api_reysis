import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faUsers,
	faInfo,
	faLayerGroup
} from '@fortawesome/free-solid-svg-icons'

const About = () => {
	return (
		<div id="feature" className="feature-component">
			<div className="container-fluid">
				<div className="row m-0">
					<div className="col-lg-6 col-md-12 col-sm-12">
						<div className="text-wrapper">
							<div>
								<div className="feature-header">
									<h2 data-aos="fade-left" data-aos-delay="300" className="pb-2">Acerca de <span>nosotros</span></h2>
									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con- sequuntur magni dolores</p>
								</div>
								<a href="#">
									<button className="acercade-button">Leer más</button>
								</a>
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
									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con- sequuntur magni dolores </p>
								</div>
							</div>
							<div data-aos="fade-down" data-aos-delay="500" className="feature-item" >
								<div className="icon">
									<FontAwesomeIcon icon={faLayerGroup} />
								</div>
								<div className="feature-content">
									<h3>Que hacemos</h3>
									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con- sequuntur magni dolores </p>
								</div>
							</div>
							<div data-aos="fade-down" data-aos-delay="700" className="feature-item" >
								<div className="icon">
									<FontAwesomeIcon icon={faUsers} />
								</div>
								<div className="feature-content">
									<h3>Conoce nuestro equipo</h3>
									<p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia con- sequuntur magni dolores </p>
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