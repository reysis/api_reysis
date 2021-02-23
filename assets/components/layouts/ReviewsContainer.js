import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import ReviewCard from "./ReviewCard";
import {opinionListFetch, opinionListSuccess} from '../../redux/opinion/list/opinionListActions';
import PaginationSystem from "../PaginationSystem";
import {
    decodeLastPage,
    changePageNumberFromURL
} from "../../redux/utiles";
import {
    getOpinionsFiltersURL
} from "../../redux/requestFilters";
import ModalOpinion from "./ModalOpinion";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import {Button} from "react-bootstrap";
import {opinionDelete} from "../../redux/opinion/delete/deleteOpinionActions";
import {listTurnoSuccess} from "../../redux/turno/list/listTurnoActions";
import Toast from "../Utils/Toast";
import {servicesFetch} from "../../redux/service/list/serviceListActions";

function ReviewsContainer() {
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    const user = useSelector(state=> state.auth.token.authenticatedUser);
    const reviews = useSelector(state=> state.opinion.list.opinions);
    const loadingReviews = useSelector(state=> state.opinion.list.loading);
    const errorListReviews = useSelector(state=> state.opinion.list.error);
    const reviewDeleted = useSelector(state=> state.opinion.del.opinion);
    const errorDelete = useSelector(state=> state.opinion.del.error);
    const loadingDelete = useSelector(state=> state.opinion.del.loading)

    const [showComentarioModal, setShowComentarioModal] = useState(false);
    const [deleted, setDeleted] = useState(null);


    const dispatch = useDispatch();

    const values = {
        title:"",
        date: new Date(),
        likes: 0,
        reviewText: "",
        stars: 0,
        id: null
    };

    useEffect(()=>{
        if(reviews && reviews['hydra:view']){
            setTotalItems(reviews['hydra:view']['hydra:totalItems']);
            setLastPage(decodeLastPage(reviews['hydra:view']['hydra:last']))
        }else{
            setLastPage(1);
        }
    }, [reviews])

    useEffect(()=>{
        dispatch(opinionListFetch(getOpinionsFiltersURL(1, user['@id'])))
    }, [])

    const handleCloseComentarioModal = () => {
        setShowComentarioModal(false)
    }

    const handleDeleteReview = (id)=>{
        dispatch(opinionDelete(id))
        setDeleted(id);
    }

    useEffect(()=>{
        if(deleted){
            dispatch(opinionListSuccess(
                reviews.filter( (value)=>{
                        return value['@id'] !== deleted
                    }
                ))
            )
            Toast.success("Su opinion ha sido eliminada correctamente!")
        }
    }, [deleted])

    useEffect(()=>{
        if(errorDelete){
            Toast.error(errorDelete);
        }
    }, [errorDelete])

    const goToPage = (pageNumber)=>{
        if(pageNumber !== currentPage){
            setCurrentPage(pageNumber);
            if(reviews['hydra:view']){
                dispatch(
                    opinionListFetch(
                        getOpinionsFiltersURL(pageNumber, user['@id'])
                    )
                );
            }else{
                dispatch(
                    opinionListFetch(getOpinionsFiltersURL(1, user['@id']))
                );
            }
        }
    }

    return (
        <div id="reviews" data-aos="fade-up" className="opinions-container container shadow-container">
            {reviews && reviews['hydra:view'] &&
                <PaginationSystem
                    loading={loadingReviews}
                    totalItems={totalItems}
                    lastPage={lastPage}
                    currentPage={currentPage}
                    goToPage={goToPage}
                />
            }
            {reviews && reviews['hydra:member'] &&
            <Button variant="primary" block type="submit" onClick={()=>setShowComentarioModal(true)}>
                <FontAwesomeIcon icon={faComment} />
            </Button>
            }
            {reviews && reviews['hydra:member'] &&
                reviews['hydra:member'].map((item, index) =>{
                    return <ReviewCard
                        key={index}
                        id={item['@id']}
                        title={item['title']}
                        date={item['datePublished']}
                        likes={item['likes']}
                        stars={item['stars']}
                        reviewText={item['reviewText']}
                        owner={item['user']['@id']}
                        faded={false}
                        handleDeleteReview={()=>handleDeleteReview(item['@id'])}
                    />
                })
            }
            {!reviews &&
                <div className="flex-centered-container">
                    <p>No ha enviado ninguna opinion aun... Ayúdenos a crecer!</p>
                    <button onClick={()=> setShowComentarioModal(true)} className="standard-button">Enviar Opinión!</button>
                </div>

            }
            {reviews && reviews['hydra:view'] &&
            <PaginationSystem
                loading={loadingReviews}
                totalItems={reviews['hydra:view']['hydra:totalItems']}
                lastPage={reviews['hydra:view']['hydra:last']}
                currentPage={reviews['hydra:view']['@id']}
                goToPage={goToPage}
            />
            }
            <ModalOpinion
                show={showComentarioModal}
                onHide={handleCloseComentarioModal}
                values={values}
            />
        </div>
    );
}

export default ReviewsContainer;