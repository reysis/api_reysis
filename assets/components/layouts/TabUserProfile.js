import React, {useEffect, useState} from 'react';
import {Col, Nav, Row, Tab} from "react-bootstrap";
import ReviewCard from "./ReviewCard";
import PaginationSystem from "../PaginationSystem";
import {useDispatch, useSelector} from "react-redux";
import { opinionFetch } from "../../redux/opinion/list/opinionListActions";
import { useParams } from 'react-router-dom';
import ReviewsContainer from "./ReviewsContainer";
import UserInformationContainer from "./UserInformationContainer";

const TabUserProfile = ({user}) => {
    return (
        <Tab.Container id="left-tab" defaultActiveKey="first">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
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
                <Col sm={10}>
                    <Tab.Content className="reviews-tab-content">
                        <Tab.Pane eventKey="first">
                            <UserInformationContainer user={user}/>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second" className="reviews-tap-pane">
                            <ReviewsContainer userId={user['@id']}/>
                            {/*<PaginationSystem*/}
                            {/*    totalItems={reviews.length}*/}
                            {/*    currentPage={1}*/}
                            {/*    lastPage={reviews.length / 10}*/}
                            {/*    loading={opinionsLoading}*/}
                            {/*/>*/}
                        </Tab.Pane>
                        <Tab.Pane eventKey="third">
                            <p>Turnos pendientes</p>
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    );
};

export default TabUserProfile;
