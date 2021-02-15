import React from 'react'
import Update from "../components/turno/Update"

const TurnosUpdatePage = () => {
    return (
        <div className="content-wrap turnos-update-page page container">
            <div className="page-header">
                <h1 className="mx-4 pb-2">Reprogamemos su turno, <span>busquemos un mejor momento!</span></h1>
            </div>
            <Update/>
        </div>
    )
}

export default TurnosUpdatePage