import React, { useState, useEffect } from 'react'

const ServicioItem = ({ id, nombre, descripcion, shortDescription, images }) => {

    return (
        <div className="servicio-item-container container">
            <div className="service-item-name">
                <h3>{nombre}</h3>
                <span className="text-muted">{shortDescription}</span>
            </div>
            <div className="row service-item-images">
                {
                    images &&
                    images.map(({ id, url }, index) => {
                        return (
                            <div key={id} className="col-lg-3 col-md-4 col-sm-6 service-item-image">
                                <div className="image">
                                    <img src={url} alt={`Servicio ${nombre} ${index}`} />
                                    <div className="overlay">
                                        <div><span>Abrir</span></div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className="service-item-text my-4">
                <div className="service-item-description">
                    <p>{descripcion}</p>
                </div>
            </div>
        </div>
    )
}

export default ServicioItem