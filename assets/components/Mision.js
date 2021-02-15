import React from 'react'
import {useSelector} from "react-redux";

const Mision = () => {
    const mission = useSelector(state=> state.configuration.configurations.mision)
    return (
        <section data-aos="fade-up" className="mision-section">
            {mission}
        </section>
    )
}

export default Mision;
