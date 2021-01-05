import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    Card,
    Container, Form, InputGroup
} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHammer} from "@fortawesome/free-solid-svg-icons";

class Create extends Component {
    render() {
        return (
            <Container className="page ">
                <Card>
                    <Card.Title>
                        <h2>Review!</h2>
                    </Card.Title>
                    <Card.Body>
                    <Form>
                        <Form.Group>
                            <InputGroup>
                                <label className="input-group-text" htmlFor="reviewText" >
                                    <FontAwesomeIcon icon={faHammer} />
                                </label>
                                <Form.Control as="textarea" rows={3} placeholder="Comente su opinión!"/>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group>
                            <Button variant="primary" type="submit" >Hacer Review</Button>
                        </Form.Group>
                    </Form>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
}

Create.propTypes = {};

export default Create;