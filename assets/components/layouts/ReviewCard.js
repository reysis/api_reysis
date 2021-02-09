import React, {useState} from 'react';
import {Button, Card} from "react-bootstrap";
import ShowStars from "./ShowStars";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ModalOpinion from "./ModalOpinion";

const ReviewCard = ({
        title = "",
        faded,
        date = new Date(),
        likes = 0,
        reviewText = "",
        stars = 0,
        owner = "",
        id = null
}) => {
    const authenticatedUser = useSelector(state=> state.auth.token.authenticatedUser)
    let userId = null;
    if(authenticatedUser)
        userId = authenticatedUser['@id'];

    const [showComentarioModal, setShowComentarioModal] = useState(false)
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

    const handleDelete = (id)=>{
        console.log("eliminar", id)
    }

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
                                        <Button variant="secondary" onClick={() => handleEdit(id)}>Editar</Button>
                                        <Button variant="danger" onClick={() => handleDelete(id)}>Eliminar</Button>
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
