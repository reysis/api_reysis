import React, { useState, useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFull } from '@fortawesome/free-solid-svg-icons'

const ModalOpinion = ({ show, onHide }) => {

    const [countStar, setCountStar] = useState(-1)

    const [stars, setStars] = useState([
        { id: 1, marked: false },
        { id: 2, marked: false },
        { id: 3, marked: false },
        { id: 4, marked: false },
        { id: 5, marked: false }
    ])

    const maxlength = 250

    const placeholder = '¿Quiere comentar algo? Nos encantaría leerlo.'

    const setStar = (t = 0) => {
        setStars(() => {
            return [1, 2, 3, 4, 5].map(v => {
                return {
                    id: v,
                    marked: (v <= t ? true : false)
                }
            })
        })
    }

    const clickStar = (s) => {
        if (s == 1) {
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

    const [reviewLength, setReviewLength] = useState(0)

    const [reviewText, setReviewText] = useState('')

    useEffect(() => {
        setReviewLength(reviewText.length)
    }, [reviewText])

    useEffect(() => {
        if (!show) {
            setStar(0)
            setReviewText('')
        }
    }, [show])

    return (
        <Modal
            show={show}
            onHide={onHide}
            className="modal-opinion"
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
                        placeholder={placeholder}
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
                <Button className="modal-opinion__footer-button" variant="primary" onClick={onHide}>Publicar</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalOpinion