import React, { useState } from 'react';

import Statistic from './Statistic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartLine, faChartBar } from '@fortawesome/free-solid-svg-icons';

import statsBackground from '../assets/count-bg.jpg';

const Estadisticas = () => {

    const [arrayOfStadistics] = useState([
        { id: "1", title: "Años de experiencia", value: "15", img: faChartArea },
        { id: "2", title: "Media anual de clientes", value: "600", img: faChartLine },
        { id: "3", title: "Rating", value: "4.3", img: faChartBar },
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
                    arrayOfStadistics.map((statistic, index) => {
                        return (
                            <Statistic
                                key={statistic.id}
                                title={statistic.title}
                                value={statistic.value}
                                img={statistic.img}
                                aosDelay={400 * index}
                            />
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Estadisticas