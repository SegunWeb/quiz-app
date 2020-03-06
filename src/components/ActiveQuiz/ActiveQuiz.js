import React from 'react';
import { Grid, Label, } from 'semantic-ui-react'
import AnswersList from "./AnswersList/AnswersList";

import './activeQuiz.css'

const ActiveQuiz = (props) => {
        return (
            <Grid columns={1} className={'items-wrapp'}>
                <Grid.Column>
                    <Label as='a' color='red' ribbon>
                        {props.answerNumb} из {props.quizLength}
                    </Label>
                    <h3><strong>{props.answerNumb}</strong>&nbsp;{props.questions}</h3>
                </Grid.Column>

                <AnswersList
                    answers={props.answers}
                    onAnswerClick={props.onAnswerClick}
                    answerState={props.answerState}
                />
            </Grid>
        );
};
export default ActiveQuiz;