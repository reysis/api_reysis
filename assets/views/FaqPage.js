import React, { Component } from 'react'
import Footer from '../components/Footer'
import Question from '../components/Question';
import {load, reset} from '../actions/faq/list';
import { connect } from 'react-redux';
import PropTypes from "prop-types";

class FaqPage extends Component {
    static propTypes = {
        error: PropTypes.string,
        loading: PropTypes.bool.isRequired,
        loaded: PropTypes.object,
        reset: PropTypes.func.isRequired
    };

    state={
        loading: true,
        error: null,
        loaded: {}
    };

    componentDidMount() {
        this.props.loadData();
    }

    componentWillUnmount() {
        this.props.reset();
    }
    componentWillReceiveProps(nextProps) {
        if(this.props.loaded !== nextProps.loaded){
            this.setState({
                loaded: nextProps.loaded,
                loading: nextProps.loading,
                error: nextProps.error,
            })
        }
    }

    render() {
        const arrayOfQuestion = [
            {id: '1', question:'Are you god', answer:'Consectetur ad cillum ut minim ullamco labore exercitation et commodo qui do labore nulla esse. Incididunt laborum veniam minim ipsum in adipisicing labore anim qui commodo sunt ea magna ullamco. Mollit id nulla adipisicing excepteur anim enim eu officia proident. Est id nisi id irure nulla ullamco minim labore cillum officia. Sit pariatur commodo commodo fugiat non anim incididunt.'},
            {id: '2', question:'Is this going to be awesome', answer: 'Dolore pariatur magna elit sit duis consequat nulla enim. Aliquip Lorem commodo do est excepteur ullamco proident proident voluptate ex exercitation reprehenderit aliquip. Tempor enim aliqua deserunt proident nisi officia sit. Ad pariatur qui do tempor ea esse Lorem. Tempor labore enim eu mollit magna officia consectetur id eiusmod qui sit esse aliqua ipsum. Deserunt et magna eiusmod ut aute velit nisi Lorem consequat. Enim enim officia magna amet eiusmod ea.'},
            {id: '3', question:'Is this going to be awesome', answer: 'Ullamco do elit et cillum sit irure incididunt in anim nulla amet excepteur deserunt velit. Cupidatat ullamco pariatur ipsum anim irure qui labore dolore enim consectetur. Sunt sint excepteur amet id excepteur occaecat non. Duis dolor irure in aute adipisicing officia ex enim consequat culpa sunt fugiat occaecat pariatur. Nulla deserunt velit nostrud ad reprehenderit laboris id cillum nostrud.'},
            {id: '4', question:'This is Lorem ipsum', answer: 'Qui ut est enim occaecat proident enim cupidatat do culpa eu. In occaecat culpa do pariatur. Incididunt elit aute et et tempor. Lorem excepteur excepteur incididunt nostrud. Deserunt ex duis fugiat nulla fugiat ex reprehenderit fugiat eu. Enim exercitation voluptate ullamco irure duis nisi consequat officia cillum fugiat qui. Lorem aliqua deserunt in anim consectetur ipsum.'},
            
        ];
        if(this.state.loading){
            return (
                <main className="content-wrap faq-page page">
                    <div className="alert alert-info" role="status">
                        Loading...
                    </div>
                </main>
            );
        }
        else{
            const questionList = this.props.loaded['hydra:member'].map(question=>{
                return(
                    <Question key={question['@id']} question={question['question']} answer={question['answer']}/>
                )
            })
            return (
                <main className="content-wrap faq-page page">
                    <div className="header">
                        <h1><span>Preguntas Frecuentes</span></h1>
                    </div>
                    <div className="question-container container">
                        <ol className="question-list">
                            {questionList}
                        </ol>
                    </div>
                </main>
            )
        }
    }
}

const mapStateToProps = (state) => {
    const {
        error,
        loading,
        loaded,
    } = state.faq.load

    return {error, loading, loaded}
}

const mapDispatchToProps = (dispatch) =>({
  loadData: data => dispatch(load(data)),
  reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(FaqPage);