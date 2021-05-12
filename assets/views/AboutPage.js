import React from 'react'

import LocalizacionSection from '../components/LocalizacionSection';
import HistorySection from '../components/HistorySection'
import Mision from '../components/Mision';

const AboutPage = () => {
    return (
        <main className="content-wrap about-page page">
            <div className="page-header">
                <h1 className="mx-4">¡Acerca de <span>Nosotros!</span></h1>
            </div>
            <div className="section-container container">
                <LocalizacionSection />
                <HistorySection />
                <Mision />
            </div>
        </main>
    )
}

export default AboutPage