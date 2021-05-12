import React from 'react';
import Garantia from '../components/Garantia';
import LocalizacionSection from "../components/LocalizacionSection";
import HistorySection from "../components/HistorySection";
import Mision from "../components/Mision";

const GarantiaPage = () => {
    return (
        <main className="content-wrap about-page page">
            <div className="page-header">
                <h1 className="mx-4">¡Estas son nuestras <span>Garantías!</span></h1>
            </div>
            <div className="container">
                <Garantia />
            </div>
        </main>
    );
};

export default GarantiaPage;
