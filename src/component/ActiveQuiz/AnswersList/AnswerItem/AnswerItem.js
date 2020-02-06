import React from 'react';
import { List } from 'semantic-ui-react'

import './answerItem.css'

const AnswersItem = ({text, onAnswerClick, id, answerState}) => {

    const itemClass = ['item-quiz'];

    if(answerState) {
        itemClass.push(answerState)
    }

    return (
        <List.Item
            onClick={() => onAnswerClick(id)}
            className={itemClass.join(' ')}
        >
           {text}
        </List.Item>
    );
};
export default AnswersItem;