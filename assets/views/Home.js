import React, { Component } from 'react'
import Landing from '../components/Landing';
import ServicesHome from '../components/ServicesHome';
import Estadisticas from '../components/Estadisticas';
import Opinions from '../components/Opinions';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <main className="content-wrap">
                <Landing />
                <ServicesHome />
                <Estadisticas />
                <Opinions />
            </main>
        )
    }
}

export default Home;