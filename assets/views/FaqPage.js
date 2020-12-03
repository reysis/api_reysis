import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Question from '../components/Question';
import { faqFetch } from '../redux/faq/faqActions';
import PropTypes from "prop-types";
import { Alert, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

const FaqPage = () => {

    const loading = useSelector(state => state.faq.loading)
    const faqs = useSelector(state => state.faq.faqs)
    const error = useSelector(state => state.faq.error)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(faqFetch())
    }, [])

    return (
        <main className="content-wrap faq-page page">
            <div className="question-header">
                <h1 className="mx-4"><span>Preguntas</span> Frecuentes</h1>
            </div>
            <Alert role={"status"} variant={"info"} show={loading}>
                Loading...
            </Alert>
            <Alert role={"alert"} variant={"danger"} show={error} >
                <FontAwesomeIcon icon={faExclamationTriangle} />{' '}
                {error}
            </Alert>
            <div className="question-container container">
                {
                    faqs.map(({ category, faqCategory }, index) => {
                        return (
                            <Row key={index} className="my-4">
                                <Col data-aos="fade-up" md={3}>
                                    <h3 className="question-category">{category}</h3>
                                </Col>
                                <Col className="question-list" md={9}>
                                    {
                                        faqCategory.map(({ id, question, answer }) => {
                                            return (
                                                <Question key={id} question={question} answer={answer} />
                                            )
                                        })
                                    }
                                </Col>
                            </Row>
                        )
                    })
                }
            </div>
        </main>
    )
}

FaqPage.propTypes = {
    loading: PropTypes.bool,
    faqs: PropTypes.array,
    error: PropTypes.string
}

export default FaqPage