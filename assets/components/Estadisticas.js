import React, {useEffect, useState} from 'react';

import Statistic from './Statistic';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChartArea, faChartLine, faChartBar, faStar} from '@fortawesome/free-solid-svg-icons';

import statsBackground from '../assets/count-bg.jpg';
import {useDispatch, useSelector} from 'react-redux';
import {statisticsListFetch} from "../redux/statistic/list/statisticsListActions";

const Estadisticas = () => {

    const statistics = useSelector(state => state.statistics.list.statistics)
    const error = useSelector(state => state.statistics.list.error)
    const loading = useSelector(state => state.statistics.list.loading)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(statisticsListFetch())
    }, []);


    const [statistic] = useState([
        { title: "Años de experiencia", img: faChartArea },
        { title: "Rating", img: faStar },
        { title: "Porcentaje de equipos reparados", img: faChartBar },
    ])
    console.log("STATISTICS: ",statistics)
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
                    statistics && statistics.length &&
                    <Statistic
                        title={statistic[0].title}
                        value={statistics[0]['yearsOfExperience']}
                        img={statistic[0].img}
                        aosDelay={300}
                    />
                }
                {
                    statistics && statistics.length &&
                    <Statistic
                        title={statistic[1].title}
                        value={statistics[0]['mediaRating']}
                        img={statistic[1].img}
                        aosDelay={500}
                    />
                }
                {
                    statistics && statistics.length &&
                    <Statistic
                        title={statistic[2].title}
                        value={statistics[0]['fixedEquips']}
                        img={statistic[2].img}
                        aosDelay={700}
                    />
                }
            </div>
        </section>
    )
}

export default Estadisticas