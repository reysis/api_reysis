import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { useSelector } from 'react-redux';

const Whyus = () => {

    const why_us = useSelector(state => state.configuration.configurations.whyUs)

    return (
        <section id="whyus" className="whyus-component section-padding">
            <div className="whyus-header">
                <h2 className="mx-4 pb-2">¿<span>Por qué</span> nosotros?</h2>
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste omnis <br />atque explicabo rerum enim ullam?</p>
            </div>
            <div className="whyus-container">
                {
                    why_us != undefined &&
                    why_us.map((why, index) => {
                        return (
                            <div key={index}
                                data-aos={index % 2 ? "fade-left" : "fade-right"}
                                className="d-flex flex-row item-whyus"
                            >
                                <div className="p-2 icon-whyus">
                                    <FontAwesomeIcon icon={faCheckSquare} />
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