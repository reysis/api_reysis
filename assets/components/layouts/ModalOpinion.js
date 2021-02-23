import React, { useState, useEffect, useDebugValue } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { updateOpinionFetch } from "../../redux/opinion/update/updateOpinionActions";
import { createOpinionFetch } from "../../redux/opinion/create/createOpinionActions";
import Toast from "../Utils/Toast";
import {opinionListFetch, opinionListSuccess} from "../../redux/opinion/list/opinionListActions";
import {getOpinionsFiltersURL} from "../../redux/requestFilters";

const ModalOpinion = ({ show, onHide, values }) => {

    const [countStar, setCountStar] = useState(values.stars)
    const user = useSelector(state => state.auth.token.authenticatedUser)
    const reviews = useSelector(state=>state.opinion.list.opinions);
    // const opinion = useSelector(state => state.opinion.create.opinion)
    const loading = useSelector(state => state.opinion.create.loading)
    const error = useSelector(state => state.opinion.create.error)

    const dispatch = useDispatch();
    const [stars, setStars] = useState([
        { id: 1, marked: values.stars >= 1 },
        { id: 2, marked: values.stars >= 2 },
        { id: 3, marked: values.stars >= 3 },
        { id: 4, marked: values.stars >= 4 },
        { id: 5, marked: values.stars >= 5 }
    ])

    const maxlength = 250;

    const setStar = (t = 0) => {
        setStars(() => {
            return [1, 2, 3, 4, 5].map(v => {
                return {
                    id: v,
                    marked: (v <= t)
                }
            })
        })
    }

    const clickStar = (s) => {
        if (s === 1) {
            if (stars[0].marked && !stars[1].marked) {
                setStar(0)
                setCountStar(0)
            }
            else {
                setStar(1)
                setCountStar(1)
            }
        }
        else {
            setStar(s)
            setCountStar(s)
        }
    }

    const [reviewLength, setReviewLength] = useState(values.reviewText.length)
    const [buttonText, setButtonText] = useState("Enviar")
    const [reviewText, setReviewText] = useState(values.reviewText)
    const [disabledSubmit, setDisabledSubmit] = useState(true);
    // const [toasted, setToasted] = useState(false)

    const clearVariables = () => {
        setReviewText("");
        setCountStar(0);
        // setToasted(false);
        setStar(0);
    }

    useEffect(() => {
        setReviewLength(reviewText.length)
    }, [reviewText])

    const responseOK = () => {
        onHide();
        Toast.success("Gracias por enviarnos su opinión! Sus sugerencias nos ayudan a mejorar nuestro trabajo.")
        clearVariables();
    }

    const responseError = (error) => {
        Toast.error(error)
    }

    useEffect(() => {
        if (countStar !== 0 && reviewText !== "")
            setDisabledSubmit(false);
        else
            setDisabledSubmit(true);
    }, [countStar, reviewText])

    useEffect(() => {
        if (loading) {
            setButtonText("Enviando ...")
        }
        else if (error != null) {
            setButtonText("Error")
        }

        if (!loading) {
            setTimeout(() => {
                setButtonText("Enviar")
            }, 2000);
        }
    }, [loading])

    const handleSubmit = () => {
        if (values.id) {
            dispatch(updateOpinionFetch({
                reviewText,
                stars: countStar,
                iri: values.id
            }))
                .then(res => {
                    dispatch(opinionListFetch(getOpinionsFiltersURL(1, user['@id'])))
                    responseOK()
                })
                .catch(error => responseError(error))
        } else {
            dispatch(createOpinionFetch({
                reviewText,
                stars: countStar,
                user: user['@id']
            }))
                .then(res => {
                    dispatch(opinionListFetch(getOpinionsFiltersURL(1, user['@id'])))
                    responseOK()
                })
                .catch(error => responseError(error))
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            className="modal-opinion"
            centered
        >
            <Modal.Header className="modal-opinion__header" closeButton>
                <h3 className="modal-opinion__header-title">Enviar comentarios a Reysis</h3>
            </Modal.Header>
            <Modal.Body className="modal-opinion__body">
                <div className="modal-opinion__body-review">
                    {/* <span className="modal-opinion__body-review__header">Comentario</span>
                    <span className="modal-opinion__body-review__rest">{reviewLength}/{maxlength}</span> */}
                    <textarea
                        value={reviewText}
                        placeholder={values.reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="modal-opinion__body-review__textarea"
                        rows={6}
                        maxLength={maxlength}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer className="modal-opinion__footer">
                <div className="modal-opinion__footer-stars">
                    {/* <span>Puntuación</span> */}
                    <div className="modal-opinion__footer-stars-list">
                        {
                            stars.map(({ id, marked }) => {
                                return <FontAwesomeIcon
                                    key={id}
                                    icon={marked ? faStarFull : faStarEmpty}
                                    onClick={() => clickStar(id)}
                                    className="modal-opinion__footer-stars-list__item"
                                />
                            })
                        }
                    </div>
                </div>
                <div className="modal-opinion__footer-review_length">
                    <span>{reviewLength}/{maxlength}</span>
                </div>
                <Button disabled={disabledSubmit} className="modal-opinion__footer-button" variant="primary" onClick={handleSubmit}>{buttonText}</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalOpinion