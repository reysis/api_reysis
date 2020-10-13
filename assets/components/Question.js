import React from 'react'

const Question = ({question, answer}) => {
    return (
        <li data-aos="fade-up" className="question-container">
            <div className="flexbox-centered">
                <span className="question-p-box">P</span>
                <h3 className="question-title">{question}?</h3>
            </div>
            <div className="flexbox-centered">
                <span className="question-r-box">R</span>
                <p className="question-answer">{answer}</p>
            </div>
        </li>
    )
}

export default Question;
