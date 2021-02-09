import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListReviews from "../components/reviews/ListReviews";

class ReviewsListPage extends Component {
    render() {
        return (
            <div className="reviews-page page">
                <div className="page-header">
                    <h1>Opiniones de nuestros <span>Usuarios!</span></h1>
                </div>
                <ListReviews />
            </div>
        );
    }
}

ReviewsListPage.propTypes = {};

export default ReviewsListPage;