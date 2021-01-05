import React, {Component} from 'react';
import PropTypes from 'prop-types';
import List from '../components/reviews/List';

class ReviewsListPage extends Component {
    render() {
        return (
            <div>
                <List/>
            </div>
        );
    }
}

ReviewsListPage.propTypes = {};

export default ReviewsListPage;