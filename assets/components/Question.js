import React, { useRef } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const Question = ({ question, answer }) => {

    const answerRef = useRef(null)
    const faqRef = useRef(null)

    const hideAnswer = () => {
        if (answerRef && faqRef) {
            faqRef.current.classList.toggle('active')
            // answerRef.current.classList.toggle('d-none')
            if (answerRef.current.style.maxHeight) {
                answerRef.current.style.maxHeight = null;
            } else {
                answerRef.current.style.maxHeight = answerRef.current.scrollHeight + "px";
            }
        }
    }

    return (
        <div ref={faqRef} data-aos="fade-up" className="question-item mb-3" >
            <div className="d-flex align-items-start bg-light px-4 py-3">
                <div className="question-icon" >
                    <FontAwesomeIcon icon={faQuestionCircle} size="2x" />
                </div>
                <div onClick={hideAnswer} className="d-flex question-title">
                    <div className="text-dark question-caption">
                        <h6>{question}</h6>
                    </div>
                    <div className="text-dark question-expand">
                        <FontAwesomeIcon icon={faChevronUp} />
                    </div>
                </div>
            </div>
            <div ref={answerRef} className="bg-light px-4 question-answer">
                <p className="text-secondary mb-4" >
                    {answer}
                </p>
            </div>
        </div>
    )
}

export default Question;