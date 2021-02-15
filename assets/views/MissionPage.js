import React from 'react';
import Mision from "../components/Mision";

const MissionPage = () => {
    return (
        <div className="page container">
            <div className="page-header">
                <h1 className="mx-4 pb-2">Su satisfación es nuestra <span>Misión!</span></h1>
            </div>
            <Mision />
        </div>
    );
};

export default MissionPage;
