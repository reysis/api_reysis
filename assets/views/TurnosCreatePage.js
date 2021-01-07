import React from 'react'
import Create from "../components/turno/Create"

const TurnosCreatePage = () => {
    return (
        <main className="content-wrap page create-turno-page" >
            <div className="create-turno-header">
                <h1 className="mt-4 mb-5">Busquemos el <span>momento adecuado</span></h1>
            </div>
            <Create />
        </main>
    )
}

export default TurnosCreatePage