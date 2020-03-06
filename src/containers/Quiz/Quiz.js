import React, {Component} from 'react';
import {Header} from 'semantic-ui-react'
import Loader from '../../components/UI/Loader/Loader'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../components/FinishQuiz/FinishQuiz";
import {connect} from 'react-redux'

import {fetchQuizById, quizAnswerClick, retryQuiz} from "../../redux/actions/quizList_actions";

import './quiz.css'


class Quiz extends Component {


   async componentDidMount() {
       this.props.fetchQuizById(this.props.match.params.id)
    }

    componentWillUnmount() {
       this.props.retryQuiz()
    }

    goToHomePage = () => {
        this.props.history.push({
            pathname: '/'
        })
    };



    render() {
        const {quiz, activeQuestions, answerState, isFinish, results, loading, quizAnswerClick, retryQuiz } = this.props;

        return (
            <div className={'item-wrapp'}>
                <Header as='h2' color='blue' textAlign='center' block>
                    Ответьте на вопросы
                </Header>
                { loading || !quiz ?
                    <Loader/>
                    : isFinish ?
                        <FinishQuiz
                            results={results}
                            quiz={quiz}
                            onRetry={retryQuiz}
                            goToHomePage={this.goToHomePage}
                        />
                        :  <ActiveQuiz
                            answers={quiz[activeQuestions].answer}
                            questions={quiz[activeQuestions].question}
                            onAnswerClick={quizAnswerClick}
                            quizLength={quiz.length}
                            answerNumb={activeQuestions + 1}
                            answerState={answerState}
                        />
                }

            </div>
        );
    }
}

const mapStateToProps = ({quiz: {results, isFinish, activeQuestions, answerState, quiz, loading}}) => {
    return {
        results,
        isFinish,
        activeQuestions,
        answerState,
        quiz,
        loading,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryQuiz: () => dispatch(retryQuiz())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);