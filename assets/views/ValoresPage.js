import React from 'react';
import Valores from "../components/Valores";

const ValoresPage = () => {
    return (
        <main className="content-wrap about-page page">
            <div className="about-header">
                <h1 className="mx-4">¡Esto nos identifica, <span>nuestros valores!</span></h1>
            </div>
            <div className="container">
                <Valores />
            </div>
        </main>
    );
};

export default ValoresPage;
