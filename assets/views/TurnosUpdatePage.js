import React from 'react'
import { Update } from "../components/turno"

const TurnosUpdatePage = () => {
    return (
        <div className="content-wrap turnos-update-page">
            <div className="update-turno-header">
                <h1 className="mx-4"><span>Editar</span> turno</h1>
            </div>
            <Update />
        </div>
    )
}

export default TurnosUpdatePage