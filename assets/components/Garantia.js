import React from 'react';
import {useSelector} from "react-redux";

const Garantia = () => {
    const config = useSelector(state=> state.configuration.configurations);
    return (
        <div className="page container">
            {config && config['garantia']}
        </div>
    );
};

export default Garantia;
