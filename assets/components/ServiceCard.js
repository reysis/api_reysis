import React from 'react';
import {
    Card,
    CardBody,
    CardText,
    CardImg,
    CardTitle,
} from 'reactstrap';

const ServiceCard = ({layout,title, text, img}) => {
    return (
        <Card  data-aos="fade-up" className={  layout ? "service-white-card" : "service-grey-card" }>
            <CardBody>
                <CardTitle>{title}</CardTitle>
                <CardImg src={img} alt={"Servicio " + {title} }></CardImg>
                <CardText>{text}</CardText>
            </CardBody>
        </Card>
    )
}

export default ServiceCard;