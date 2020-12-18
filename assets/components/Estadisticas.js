import React, { useState } from 'react';

import Statistic from './Statistic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons';

import statsBackground from '../assets/count-bg.jpg';
import { useSelector } from 'react-redux';

const Estadisticas = () => {

    const experienceYears = useSelector(state => state.configuration.configurations.experienceYears)
    const clientsPerYear = useSelector(state => state.configuration.configurations.clientsPerYear)
    const rating = useSelector(state => state.configuration.configurations.rating)

    const [statistic] = useState([
        { title: "Años de experiencia", img: faChartArea },
        { title: "Media anual de clientes", img: faChartLine },
        { title: "Rating", img: faChartBar },
    ])

    return (
        <section
            id="statistic"
            className="statistic-component section-padding"
            style={{
                backgroundImage: `url(${statsBackground})`
            }}
        >
            <div className="overlay" />
            <div className="statistic-container container">
                {
                    experienceYears != undefined &&
                    <Statistic
                        title={statistic[0].title}
                        value={experienceYears}
                        img={statistic[0].img}
                        aosDelay={300}
                    />
                }
                {
                    clientsPerYear != undefined &&
                    <Statistic
                        title={statistic[1].title}
                        value={clientsPerYear}
                        img={statistic[1].img}
                        aosDelay={500}
                    />
                }
                {
                    rating != undefined &&
                    <Statistic
                        title={statistic[2].title}
                        value={rating}
                        img={statistic[2].img}
                        aosDelay={700}
                    />
                }
            </div>
        </section>
    )
}

export default Estadisticas