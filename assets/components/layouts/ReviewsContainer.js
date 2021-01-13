import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReviewCard from "./ReviewCard";
import {opinionFetch} from '../../redux/opinion/list/opinionListActions';

function ReviewsContainer({reviews}) {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <div className="opinions-container container">
            {reviews
                ? (
                    reviews.map(item =>{
                        return (
                            <ReviewCard
                                key={item['@id']}
                                title={item['title']}
                                date={item['datePublished']}
                                likes={item['likes']}
                                stars={item['stars']}
                                reviewText={item['reviewText']}
                                faded={false}
                            />
                        )
                    })
                 ) : (
                    <ReviewCard
                        faded={true}
                    />
                )
            }
        </div>
    );
}

export default ReviewsContainer;