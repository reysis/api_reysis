import React from 'react';
import TermsCondition from "../components/TermsCondition";

const TermsConditionPage = () => {
    return (
        <div className="page container">
            <div className="page-header">
                <h1 className="mx-4 pb-2">Dejemos claro nuestros <span>Terminos y Condiciones</span></h1>
            </div>
            <TermsCondition />
        </div>
    );
};

export default TermsConditionPage;
