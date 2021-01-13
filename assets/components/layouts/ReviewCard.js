import React from 'react';
import {Card} from "react-bootstrap";
import ShowStars from "./ShowStars";

const ReviewCard = ({title, faded, date, likes, reviewText, stars}) => {
    return (
        <div data-aos="fade-up">
            { !faded
                ? (
                    <Card>
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Subtitle>
                                {date}
                                <ShowStars times={stars}/>
                                {likes}
                            </Card.Subtitle>
                            <Card.Text>{reviewText}</Card.Text>
                            <Card.Link href="">Editar</Card.Link>
                            <Card.Link href="">Eliminar</Card.Link>
                        </Card.Body>
                    </Card>
                ) : (
                    <Card></Card>
                )
            }
        </div>
    )
};

export default ReviewCard;
