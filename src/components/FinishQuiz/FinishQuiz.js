import React from 'react';
import {Header, Button } from "semantic-ui-react";

import './finishQuiz.css'

const FinishQuiz = ({results, quiz, onRetry, goToHomePage }) => {

    const successCount = Object.keys(results).reduce((total, key) => {
        if(results[key]=== 'success') {
            total++
        }
        return total;
    }, 0);



    return (
        <div>
            <Header as='h3' color='green' textAlign='center' block>
                Готово!!!
            </Header>
            <div>
                  <ul>
                      {
                          quiz.map((quizItem, i) => {
                              const cls = [
                                  'fa',
                                  results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                              ];

                              return (
                                  <li key={i}>
                                      <strong>{`${i + 1}.`}</strong>&nbsp;{quizItem.questions}&nbsp;
                                      <i className={`finish-quiz-item ${cls.join(' ')}`}/>
                                  </li>
                              )
                          })
                      }
                  </ul>

                <p>Правильно {successCount} из {quiz.length}</p>

                <div>
                    <Button onClick={goToHomePage} primary>Главная</Button>
                    <Button onClick={onRetry} secondary>Повторить</Button>
                </div>
            </div>
        </div>

    )
};
export default FinishQuiz;