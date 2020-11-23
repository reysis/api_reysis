import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faChartLine, faChartBar, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

const Whyus = () => {

    const [why_us] = useState([
        { id: 1, reason: "Garantía en nuestros servicios" },
        { id: 2, reason: "Garantía en nuestros servicios" },
        { id: 3, reason: "Velocidad de entrega" },
        { id: 4, reason: "Personal capacitado" },
        { id: 5, reason: "Velocidad de entrega" },
        { id: 6, reason: "Garantía en nuestros servicios" },
        { id: 7, reason: "Personal capacitado" }
    ])

    return (
        <section id="whyus" className="whyus-component section-padding">
            <div className="whyus-header">
                <h2 className="mx-4">¿<span>Por qué</span> nosotros?</h2>
            </div>
            <div className="whyus-container">
            {
                why_us.map((why, index) => {
                    return (
                        <div key={why.id} 
                            data-aos={index % 2 ? "fade-left" : "fade-right"} 
                            className="d-flex flex-row item-whyus"
                        >
                            <div className="p-2 icon-whyus">
                                <FontAwesomeIcon icon={faCheckSquare} />
                            </div>
                            <div className="p-2 reason-whyus">
                                {why.reason}
                            </div>
                        </div>
                    )
                })
            }
            </div>
        </section>
    )
}

export default Whyus