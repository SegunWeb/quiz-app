import React, {Component} from 'react';
import {Header, Loader,} from 'semantic-ui-react'
import ActiveQuiz from "../../component/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../component/FinishQuiz/FinishQuiz";

import './quiz.css'
import axios from "../../axios/axiosQuiz";

class Quiz extends Component {

    state = {
        results: {},
        isFinish: false,
        activeQuestions: 0,
        answerState: null,
        quiz: [],
        loading: true,
    };

   async componentDidMount() {
       try {
           const res = await axios.get(`/quizes/${this.props.match.params.id}.json`);
           const quiz = res.data;

           this.setState({
               quiz,
               loading: false
           })
       }
       catch(e) {
           console.log(e)
       }
    }

    onAnswerClick = (answerId) => {

        const {quiz, activeQuestions, answerState, results} = this.state;
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
       return this.state.activeQuestions + 1 === this.state.quiz.length;
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
        const {quiz, activeQuestions, answerState, isFinish, results, loading } = this.state;

        return (
            <div className={'item-wrapp'}>
                <Header as='h2' color='blue' textAlign='center' block>
                    Ответьте на вопросы
                </Header>
                { loading ?
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

export default Quiz;