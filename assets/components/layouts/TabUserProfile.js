import React, {useEffect, useState} from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import PaginationSystem from "../PaginationSystem";
import {useDispatch, useSelector} from "react-redux";
import { opinionFetch } from "../../redux/opinion/list/opinionListActions";
import { useParams } from 'react-router-dom';
import ReviewsContainer from "./ReviewsContainer";
import UserInformationContainer from "./UserInformationContainer";
import TurnosContainer from "./TurnosContainer";

const TabUserProfile = ({user}) => {
    return (
        <Tab.Container className="user-profile-tab__container" id="left-tab" defaultActiveKey="first">
            <Row>
                <Col sm={3}>
                    <Nav variant="pills" className="flex-column shadow-container">
                        <Nav.Item>
                            <Nav.Link eventKey="first">Información</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="second">Reviews</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="third">Turnos</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={9}>
                    <Tab.Content className="reviews-tab-content">
                        <Tab.Pane  eventKey="first">
                            <UserInformationContainer user={user}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className="reviews-tap-pane">
                            <ReviewsContainer />
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <TurnosContainer />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default TabUserProfile;
