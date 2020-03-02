import React from 'react';
import { List } from 'semantic-ui-react'

import './answerItem.css'

const AnswersItem = (props) => {

    const itemClass = ['item-quiz'];

    if(props.answerState) {
        itemClass.push(props.answerState)
    }

    return (
        <List.Item
            onClick={() => props.onAnswerClick(props.answer.id)}
            className={itemClass.join(' ')}
        >
           {props.answer.text}
        </List.Item>
    );
};
export default AnswersItem;