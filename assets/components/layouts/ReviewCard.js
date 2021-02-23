import React, {useEffect, useState} from 'react';
import {Button, Card} from "react-bootstrap";
import ShowStars from "./ShowStars";
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ModalOpinion from "./ModalOpinion";
import Toast from "../Utils/Toast";

const ReviewCard = ({
        title = "",
        faded,
        date = new Date(),
        likes = 0,
        reviewText = "",
        stars = 0,
        owner = "",
        id = null,
        handleDeleteReview
}) => {
    const authenticatedUser = useSelector(state=> state.auth.token.authenticatedUser)
    const opinionDeleted = useSelector(state=> state.opinion.del.opinion);
    const errorDeleting = useSelector(state=> state.opinion.del.error);
    const loadingDelete = useSelector(state=> state.opinion.del.loading);
    const [showComentarioModal, setShowComentarioModal] = useState(false)
    const [deleteButtonText, setDeleteButtonText] = useState("Eliminar");
    const dispatch = useDispatch();

    let userId = null;
    if(authenticatedUser)
        userId = authenticatedUser['@id'];


    const values = {
        title,
        date,
        likes,
        reviewText,
        stars,
        owner,
        id
    };

    const handleCloseComentarioModal = () => {
        setShowComentarioModal(false)
    }

    const handleEdit = (id) => {
        setShowComentarioModal(true);
    }

    useEffect(()=>{
        if(errorDeleting){
            Toast.error(errorDeleting);
            setDeleteButtonText("Error!");
            setTimeout(()=> { setDeleteButtonText("Eliminar")}, 1000)
        }
    }, [errorDeleting])

    useEffect(()=>{
        if(opinionDeleted){
            Toast.success("Opinión eliminada satisfactoriamente!")
        }
    }, [opinionDeleted])

    return (
        <div>
            { !faded
                ? (
                    <Card className="review-card__container">
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle>
                                {date}
                                <ShowStars times={stars}/>
                                {likes}
                            </Card.Subtitle>
                            <Card.Text>{reviewText}</Card.Text>
                            {userId === owner
                                ? (
                                    <div>
                                        <Button variant="primary" onClick={() => handleEdit(id)}>Editar</Button>
                                        <Button variant="danger" onClick={handleDeleteReview}>{deleteButtonText}</Button>
                                    </div>
                                ) : (
                                    <footer>{owner}</footer>
                                )
                            }
                        </Card.Body>
                    </Card>
                ) : (
                    <Card></Card>
                )
            }
            <ModalOpinion
                show={showComentarioModal}
                onHide={handleCloseComentarioModal}
                values={values}
            />
        </div>
    )
};

export default ReviewCard;
