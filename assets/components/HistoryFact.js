import React from 'react'

const HistoryFact = ({date, fact}) => {
    return (
        <div data-aos="fade-up" className="history-fact-container">
            <div className="history-date">{date}</div>
            <div className="history-fact">{fact}</div>
        </div>
    )
}

export default HistoryFact;
