import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Jumbotron, Button } from 'react-bootstrap';
import logo from '../../assets/landing-image.png';

class NotFoundPage extends Component {
    render() {
        return (
            <div className="content-wrap page">
                <Jumbotron className="mt-4 col-md-10 col-sm-12 text-center mx-auto">
                    <p className="lead"><img src={logo} width="150px" /></p>
                    <h1 className="display-4">404 - Not Found</h1>
                    <p className="lead">Can't find what you're looking for? <a href="#">Open</a> up an issue.</p>
                    <p className="lead mb-0">
                        <Link to="/"><Button variant="danger" outline className="btn-not-found">Get Started</Button></Link>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}
export default NotFoundPage;