import React, {Component} from 'react';
import {Header} from 'semantic-ui-react'
import Loader from '../../component/UI/Loader/Loader'
import ActiveQuiz from "../../component/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../component/FinishQuiz/FinishQuiz";
import {connect} from 'react-redux'

import {fetchQuizById} from "../../redux/actions/quizList_actions";

import './quiz.css'


class Quiz extends Component {


   async componentDidMount() {
       this.props.fetchQuizById(this.props.match.params.id)
    }

    onAnswerClick = (answerId) => {

        const {quiz, activeQuestions, answerState, results} = this.props;
        const question = quiz[activeQuestions];

        if(answerState) {
            const key = Object.keys(answerState)[0];
            if(answerState[key] === 'success') {
                return
            }
        }

        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timer = setTimeout(() => {
                if(this.isQuizFinished()){
                    this.setState({
                        isFinish: true,
                    })

                } else {
                    this.setState({
                        activeQuestions: activeQuestions + 1,
                        answerState: null
                    })
                }
                clearTimeout(timer)
            }, 500);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId] : 'error'},
                results,
            });
        }
    };

   isQuizFinished() {
       return this.props.activeQuestions + 1 === this.props.quiz.length;
   }

    retryHandler = () => {
        this.setState({
            activeQuestions: 0,
            answerState: null,
            isFinish: false,
            results: {}

        })
    };

    goToHomePage = () => {
        this.props.history.push({
            pathname: '/'
        })
    };



    render() {
        const {quiz, activeQuestions, answerState, isFinish, results, loading } = this.props;

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
                            onRetry={this.retryHandler}
                            goToHomePage={this.goToHomePage}
                        />
                        :  <ActiveQuiz
                            answers={quiz[activeQuestions].answer}
                            questions={quiz[activeQuestions].question}
                            onAnswerClick={this.onAnswerClick}
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
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);