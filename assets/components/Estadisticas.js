import React, { Component } from 'react';

import statBackground from '../assets/estadisticas-background.jpg';
import Statistic from './Statistic';

class Estadisticas extends Component {
    render() {
        const arrayOfStadistics = [
            {id:"1", title:"Años de experiencia", value: "15", img:"area-chart"},
            {id:"2", title:"Media anual de clientes", value: "600", img:"fa-bar-chart"},
            {id:"3", title:"Rating", value: "4.3", img:"fa-line-chart"},
        ];

        const Statistics = arrayOfStadistics.map(statistic =>{
            return (
                <Statistic 
                    key={statistic.id} 
                    title={statistic.title} 
                    value={statistic.value} 
                    img={statistic.img}
                    alt={statistic.alt}
                />
            )
        })
        return (
            <section data-aos="fade-up" id="statistic" className="statistic-component">
                <div className="statistic-container container">
                    {Statistics}
                </div>
            </section>
        )
    }
}

export default Estadisticas;