import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReviewCard from "../layouts/ReviewCard";
import { opinionFetch } from "../../redux/opinion/list/opinionListActions";
import {getOpinionsFiltersURL} from "../../redux/requestFilters";

const ListReviews = () => {
    const loading = useSelector(state => state.opinion.list.loading)
    const opinions = useSelector(state => state.opinion.list.opinions)
    const error = useSelector(state => state.opinion.list.error)


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(opinionFetch(getOpinionsFiltersURL(1)))
    }, []);


    return (
        <div className="container">
            {
                opinions ? (
                    opinions['hydra:member'].map( (item) =>{
                        return(
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
                ):(
                 <div/>
                )
            }
        </div>
    );
};

export default ListReviews;
