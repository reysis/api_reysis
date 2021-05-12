import React, { Component } from 'react'
import Footer from '../components/Footer'
import ServicesHome from "../components/ServicesHome";

class ServiciosPage extends Component {
    render() {
        return (
            <main className="content-wrap services-page page">
                <ServicesHome />
            </main>
        )
    }
}

export default ServiciosPage;