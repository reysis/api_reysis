import React, {useEffect, useState} from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import {useDispatch, useSelector} from 'react-redux';
import {listWhyusFetch} from "../redux/whyus/list/whyusListActions";

const Whyus = () => {

    const whyus = useSelector(state=> state.whyus.list.whyus);
    const error = useSelector(state=> state.whyus.list.error);
    const loading = useSelector(state=> state.whyus.list.loading);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listWhyusFetch())
    }, [])

    return (
        <section id="whyus" className="whyus-component section-padding">
            <div className="whyus-header">
                <h2 className="mx-4 pb-2">¿Por qué <span>nosotros?</span></h2>
                <p>Tener un equipo roto ya es un problema serio que no puede dejarse en manos de principiantes,<br />ayudarlo a solucionarlo con total garantía y profesionalidad es nuestro trabajo</p>
            </div>
            <div className="whyus-container">
                {whyus &&
                    whyus.map((why, index) => {
                        return (
                            <div key={index}
                                 data-aos={index % 2 ? "fade-left" : "fade-right"}
                                 className="d-flex flex-row item-whyus"
                            >
                                <div className="p-2 icon-whyus">
                                    <FontAwesomeIcon icon={faCheckSquare}/>
                                </div>
                                <div className="p-2 reason-whyus">{why['reason']}</div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Whyus