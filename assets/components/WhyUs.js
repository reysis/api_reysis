import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const Whyus = () => {

    const why_us = [
        "Garantía en nuestros servicios",
        "Rapides en el trabajo",
        "Personal capacitado",
        "Compromiso en su satisfacción",
        "Servicio a domicilio",
        "Experiencia profesional"
    ]

    return (
        <section id="whyus" className="whyus-component section-padding">
            <div className="whyus-header">
                <h2 className="mx-4 pb-2">¿Por qué <span>nosotros?</span></h2>
                <p>Tener un equipo roto ya es un problema serio que no puede dejarse en manos de principiantes,<br />ayudarlo a solucionarlo con total garantía y profesionalidad es nuestro trabajo</p>
            </div>
            <div className="whyus-container">
                {
                    why_us.map((why, index) => {
                        return (
                            <div key={index}
                                 data-aos={index % 2 ? "fade-left" : "fade-right"}
                                 className="d-flex flex-row item-whyus"
                            >
                                <div className="p-2 icon-whyus">
                                    <FontAwesomeIcon icon={faCheckSquare}/>
                                </div>
                                <div className="p-2 reason-whyus">{why}</div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Whyus