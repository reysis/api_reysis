import React from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardImg,
    CardTitle,
} from 'reactstrap';

const ServiceCard = ({ layout, title, text, img }) => {
    return (
        <Card data-aos="fade-up" className={`service-card ${layout ? "service-white-card" : "service-grey-card"}`}>
            <CardBody className="service-card-body">
                <CardTitle className="service-card-title">{title}</CardTitle>
                <CardImg className="service-card-img" src={img} alt={"Servicio " + { title }}></CardImg>
                <CardText className="service-card-text">{text}</CardText>
            </CardBody>
        </Card>
    )
}

export default ServiceCard;