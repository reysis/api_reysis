import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faThumbsUp} from "@fortawesome/free-solid-svg-icons";
import {useDispatch, useSelector} from "react-redux";
import ModalLogin from "./ModalLogin";
import {likeReviewClearAll, likeReviewFetch} from "../../redux/opinion/like/likeReviewActions";
import Toast from "../Utils/Toast";
import {getLikeReviewFilters} from "../../redux/requestFilters";
import {showLikeFetch} from "../../redux/opinion/showLike/showLikeActions";
import {unlikeOpinionDelete, unlikeReviewClearAll} from "../../redux/opinion/unlike/unlikeReviewActions";
import {opinionListSuccess} from "../../redux/opinion/list/opinionListActions";

const LikeReviewSystem = ({likes, idReview, alreadyLiked}) => {
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [unlikedReview, setUnlikedReview] = useState(null);

    const user = useSelector(state=> state.auth.token.authenticatedUser);
    const unliked = useSelector(state=> state.opinion.unlike.unliked);
    const errorUnlike = useSelector(state=> state.opinion.unlike.error);
    const loadingUnlike = useSelector(state=> state.opinion.unlike.loading);

    const liked = useSelector(state=> state.opinion.like.liked);
    const errorLike = useSelector(state=> state.opinion.like.error);
    const loadingLike = useSelector(state=> state.opinion.like.loading);
    const opinions = useSelector(state=> state.opinion.list.opinions);
    const dispatch = useDispatch();

    let array = null;
    useEffect(()=>{
        if(liked && idReview === liked['idReview']){
            array = opinions;
            let index = array['hydra:member'].findIndex(value => {
                return value['@id'] === liked['idReview']
            })
            array['hydra:member'][index]['likes']++;
            array['hydra:member'][index]['likedByMe'] = true;
            dispatch(likeReviewClearAll())
            dispatch(opinionListSuccess({...array}));
        }
    }, [liked])

    useEffect(()=>{
        if(unliked && idReview === unlikedReview){
            array = opinions;
            let index = array['hydra:member'].findIndex(value => {
                return value['@id'] === unlikedReview
            })
            array['hydra:member'][index]['likes']--;
            array['hydra:member'][index]['likedByMe'] = false;
            dispatch(unlikeReviewClearAll())
            dispatch(opinionListSuccess({...array}));
        }
    }, [unliked])

    const likeClick = () =>{
        if(!user){
            setShowModalLogin(true);
        }else{
            if(!alreadyLiked){
                dispatch(likeReviewFetch({
                    idUser: user['@id'],
                    idReview
                })).then( res =>{
                    Toast.success("Gracias por su aporte a la comunidad!");
                }).catch(error =>{
                    Toast.error(error);
                })
            }else{
                setUnlikedReview(idReview);
                dispatch(showLikeFetch(getLikeReviewFilters(null,user['@id'], idReview)))
                    .then(res=>{
                        dispatch(unlikeOpinionDelete(res['hydra:member'][0]['@id']))
                            .then(()=>{
                                Toast.success("Lamentamos que no le guste esta opinión... :(");
                            })
                            .catch(error=>{
                                Toast.error(error);
                            })
                    }).catch(error=>{
                        Toast.error(error);
                    })
                /** TODO unlike request **/
            }
        }
    }

    const handleHideModal = () =>{
        setShowModalLogin(false);
    }

    return (
        <div onClick={likeClick} className="carousel-likes">
            <FontAwesomeIcon className={
                (!alreadyLiked ? "svg-not-like bounce" : "")
            } icon={faThumbsUp} />
            <span>{likes} Likes</span>
            <ModalLogin show={showModalLogin} onHide={handleHideModal}/>
        </div>
    );
};

export default LikeReviewSystem;
