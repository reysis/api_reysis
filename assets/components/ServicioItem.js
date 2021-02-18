import React, { useState, useEffect } from 'react'
import {Image, Jumbotron} from "react-bootstrap";

const ServicioItem = ({ htmlState }) => {

    return (
        <div className="servicio-item-container container">
            <div className="service-item-text my-4">
                <div className="info-service-description" dangerouslySetInnerHTML={{ __html: htmlState }} />
            </div>
        </div>
    )
}

export default ServicioItem