import React from 'react'
import Landing from '../components/Landing';
import About from '../components/About';
import ServicesHome from '../components/ServicesHome';
import Estadisticas from '../components/Estadisticas';
import Whyus from '../components/WhyUs';
import Opinions from '../components/Opinions';
import Contact from '../components/Contact';

const Home = () => {

    return (
        <main className="content-wrap">
            <Landing />
            <ServicesHome />
            <About />
            <Estadisticas />
            <Whyus />
            <Opinions />
            <Contact />
        </main>
    )
}

export default Home