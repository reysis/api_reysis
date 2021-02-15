import React from 'react';
import {useSelector} from "react-redux";

const TermsCondition = () => {
    const terms = useSelector(state=> state.configuration.configurations.termsAndCondition)
    return (
        <div>
            {terms}
        </div>
    );
};

export default TermsCondition;
