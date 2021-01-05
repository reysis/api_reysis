import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Create from '../components/reviews/Create'

class ReviewsCreatePage extends Component {
    render() {
        return (
            <main className="content-wrap page create-turno-page" >
                <div className="create-turno-header">
                    <h1 className="mt-4 mb-5">Comparta su opinión con la <span>comunidad!</span></h1>
                </div>
                <Create />
            </main>
        );
    }
}

ReviewsCreatePage.propTypes = {};

export default ReviewsCreatePage;