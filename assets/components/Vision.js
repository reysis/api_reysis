import React from 'react';
import {useSelector} from "react-redux";

const Vision = () => {
    const visionText = useSelector(state=> state.configuration.configurations.vision);
    return (
        <div className="container">
            {visionText}
        </div>
    );
};

export default Vision;
