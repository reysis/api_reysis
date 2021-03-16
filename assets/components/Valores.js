import React from 'react';
import {useSelector} from "react-redux";

const Valores = () => {
    const config = useSelector(state=> state.configuration.configurations);
    return (
        <div>
            {config &&
                config['valores']
            }
        </div>
    );
};

export default Valores;
