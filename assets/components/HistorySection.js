import React, { Component } from 'react'
import HistoryFact from './HistoryFact';

class HistorySection extends Component {
    render() {
        const arrayHistoryFacts = [
            { id: "1", date: "2010", fact: "Creation of the company" },
            { id: "2", date: "2011", fact: "Ullamco in sint dolore ipsum veniam cupidatat nisi duis do. Ullamco dolore anim sunt esse. Cillum aliqua irure exercitation voluptate incididunt cillum. Duis aute esse sit nulla. Eiusmod velit officia laborum duis reprehenderit amet elit adipisicing deserunt reprehenderit. Tempor ullamco eu in sit eiusmod dolore dolor veniam ea. Non laboris consequat est dolor duis aliquip officia ex ex mollit laborum veniam nulla." },
            { id: "3", date: "2012", fact: "Eiusmod non pariatur anim aliqua reprehenderit tempor incididunt. Dolore labore culpa eiusmod quis eu qui ut. Eu ullamco cillum amet anim elit consectetur id. Reprehenderit enim deserunt laboris fugiat mollit aliquip enim excepteur reprehenderit mollit excepteur velit mollit. Ad nostrud consectetur ipsum et est aute dolore est duis esse laborum dolor consectetur." },
            { id: "4", date: "2013", fact: "Eiusmod non pariatur anim aliqua reprehenderit tempor incididunt. Dolore labore culpa eiusmod quis eu qui ut. Eu ullamco cillum amet anim elit consectetur id. Reprehenderit enim deserunt laboris fugiat mollit aliquip enim excepteur reprehenderit mollit excepteur velit mollit. Ad nostrud consectetur ipsum et est aute dolore est duis esse laborum dolor consectetur." },
            { id: "6", date: "2014", fact: "Eiusmod non pariatur anim aliqua reprehenderit tempor incididunt. Dolore labore culpa eiusmod quis eu qui ut. Eu ullamco cillum amet anim elit consectetur id. Reprehenderit enim deserunt laboris fugiat mollit aliquip enim excepteur reprehenderit mollit excepteur velit mollit. Ad nostrud consectetur ipsum et est aute dolore est duis esse laborum dolor consectetur." },
            { id: "7", date: "2015", fact: "Eiusmod non pariatur anim aliqua reprehenderit tempor incididunt. Dolore labore culpa eiusmod quis eu qui ut. Eu ullamco cillum amet anim elit consectetur id. Reprehenderit enim deserunt laboris fugiat mollit aliquip enim excepteur reprehenderit mollit excepteur velit mollit. Ad nostrud consectetur ipsum et est aute dolore est duis esse laborum dolor consectetur." },
            { id: "8", date: "2016", fact: "Eiusmod non pariatur anim aliqua reprehenderit tempor incididunt. Dolore labore culpa eiusmod quis eu qui ut. Eu ullamco cillum amet anim elit consectetur id. Reprehenderit enim deserunt laboris fugiat mollit aliquip enim excepteur reprehenderit mollit excepteur velit mollit. Ad nostrud consectetur ipsum et est aute dolore est duis esse laborum dolor consectetur." },
        ];
        const historyFactsList = arrayHistoryFacts.map(history => {
            return (
                <HistoryFact key={history.id} date={history.date} fact={history.fact} />
            );
        })
        return (
            <section data-aos="fade-up" className="history-section">
                <h2>Nuestra Historia</h2>
                {historyFactsList}
            </section>
        )
    }
}
export default HistorySection;