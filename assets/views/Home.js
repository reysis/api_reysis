import React, { Component } from 'react'
import Landing from '../components/Landing';
import About from '../components/About';
import ServicesHome from '../components/ServicesHome';
import Estadisticas from '../components/Estadisticas';
import Whyus from '../components/Whyus';
import Opinions from '../components/Opinions';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(window.user);
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
}

export default Home;