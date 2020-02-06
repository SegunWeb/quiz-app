import React from 'react';
import { List } from 'semantic-ui-react'
import AnswersItem from "./AnswerItem/AnswerItem";

import './answerList.css'

const AnswersList = ({answers, onAnswerClick, answerState}) => {
    return (

        <List divided relaxed className={'list-wrapp'}>
            {
                 answers.map((answer, i) => {
                    return (
                        <AnswersItem
                            key={i}
                            {...answer}
                            onAnswerClick={onAnswerClick}
                            answerState={
                                answerState ?
                                    answerState[answer.id]
                                    : null
                            }
                        />
                    )

                })
            }
        </List>
    );
};
export default AnswersList;