import React from 'react'
import { Create } from "../components/turno"

const TurnosCreatePage = () => {
    return (
        <main className="content-wrap turnos-crete-page page" >
            <div className="create-turno-header">
                <h1 className="mx-4">Busquemos el <span>momento adecuado</span></h1>
            </div>
            <Create />
        </main>
    )
}

export default TurnosCreatePage