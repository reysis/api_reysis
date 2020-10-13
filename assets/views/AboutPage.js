import React, { Component } from 'react'
import HistorySection from '../components/HistorySection'
import Footer from '../components/Footer';
import LocalizacionSection from '../components/LocalizacionSection';
import Mision from '../components/Mision';

class AboutPage extends Component {
    render() {
        return (
            <main className="about-page page">
                <div className="section-container container">
                    <LocalizacionSection/>
                    <HistorySection/>
                    <Mision />
                </div>
                <Footer />
            </main>
        )
    }
}

export default AboutPage;