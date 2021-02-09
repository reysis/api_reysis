import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReviewCard from "./ReviewCard";
import {opinionFetch} from '../../redux/opinion/list/opinionListActions';
import PaginationSystem from "../PaginationSystem";
import {
    decodeLastPage,
    changePageNumberFromURL
} from "../../redux/utiles";
import {
    getOpinionsFiltersURL
} from "../../redux/requestFilters";

function ReviewsContainer({userId}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const user = useSelector(state=> state.auth.token.authenticatedUser);
    const reviews = user['reviews'];

    return (
        <div data-aos="fade-up" className="opinions-container container">
            {
                reviews.map(item =>{
                    return (
                        <ReviewCard
                            key={item['@id']}
                            id={item['@id']}
                            title={item['title']}
                            date={item['datePublished']}
                            likes={item['likes']}
                            stars={item['stars']}
                            reviewText={item['reviewText']}
                            owner={item['user']}
                            faded={false}
                        />
                    )
                })
            }
        </div>
    );
}

export default ReviewsContainer;