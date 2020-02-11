import React, {Component} from 'react';
import { Header, } from 'semantic-ui-react'
import ActiveQuiz from "../../component/ActiveQuiz/ActiveQuiz";
import FinishQuiz from "../../component/FinishQuiz/FinishQuiz";

import './quiz.css'

class Quiz extends Component {

    state = {
        results: {},
        isFinish: false,
        activeQuistions: 0,
        answerState: null,
        quiz: [
            {
                questions: 'Какого цвета море?',
                rightAnswerId: 1,
                id: 1,
                answers: [
                    {text: 'Черное', id: 1},
                    {text: 'Синее', id: 2},
                    {text: 'Красное', id: 3},
                    {text: 'Зеленое', id: 4}
                ]
            },
            {
                questions: 'Какого черта?',
                rightAnswerId: 2,
                id: 2,
                answers: [
                    {text: 'Потому что', id: 1},
                    {text: 'Незнаю', id: 2},
                    {text: 'Так уж бывает', id: 3},
                    {text: 'Зеленый', id: 4}
                ]
            }
        ]
    };


    componentDidMount() {
        console.log('Quiz Id = ', this.props.match.params.id)
    }

    onAnswerClick = (answerId) => {
        console.log(answerId);
        const {quiz, activeQuistions, answerState, results} = this.state;
        const question = quiz[activeQuistions];

        if(answerState) {
            const key = Object.keys(answerState)[0];
            if(answerState[key]=== 'success') {
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
                if(activeQuistions + 1 === quiz.length){
                    console.log('end');
                    this.setState({
                        isFinish: true,
                    })

                } else {
                    this.setState({
                        activeQuistions: activeQuistions + 1,
                        answerState: null
                    })
                }
                clearTimeout(timer)
            }, 500);
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[question.id] : 'error'},
                results,
            });
        }
    };

    retryHandler = () => {
        this.setState({
            activeQuistions: 0,
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
        const {quiz, activeQuistions, answerState, isFinish, results} = this.state;

        return (
            <div className={'item-wrapp'}>
                <Header as='h2' color='blue' textAlign='center' block>
                    Ответьте на вопросы
                </Header>
                {
                    isFinish ?
                        <FinishQuiz
                            results={results}
                            quiz={quiz}
                            onRetry={this.retryHandler}
                            goToHomePage={this.goToHomePage}
                        />
                        :  <ActiveQuiz
                            answers={quiz[activeQuistions].answers}
                            questions={quiz[activeQuistions].questions}
                            onAnswerClick={this.onAnswerClick}
                            quizLength={quiz.length}
                            answerNumb={activeQuistions + 1}
                            answerState={answerState}
                        />
                }

            </div>
        );
    }
}

export default Quiz;