import React from 'react';
import {Card} from "react-bootstrap";

function ReviewCard(props) {
    const {
        reviews
    } = props;
    return (
        <Card>
            <Card.Title>
                <h2>{user}</h2>

            </Card.Title>
            <Card.Body>
                <blockquote className="blockquote mb-0">
                    <p>
                        {text}
                    </p>
                    <footer className="blockquote-footer">
                        Date:  <cite title="Source Title">{date}</cite>
                    </footer>
                </blockquote>
            </Card.Body>
        </Card>
    );
}

export default ReviewCard;