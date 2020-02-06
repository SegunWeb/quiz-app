import React from 'react';
import { Grid, Label, } from 'semantic-ui-react'
import AnswersList from "./AnswersList/AnswersList";

import './activeQuiz.css'

const ActiveQuiz = ({questions, answers, onAnswerClick, quizLength, answerNumb, answerState}) => {
        return (
            <Grid columns={1} className={'items-wrapp'}>
                <Grid.Column>
                    <Label as='a' color='red' ribbon>
                        {answerNumb} из {quizLength}
                    </Label>
                    <h3><strong>{answerNumb}</strong>&nbsp;{questions}</h3>
                </Grid.Column>

                <AnswersList
                    answers={answers}
                    onAnswerClick={onAnswerClick}
                    answerState={answerState}
                />
            </Grid>
        );
};
export default ActiveQuiz;