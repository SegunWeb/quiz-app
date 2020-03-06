import React from 'react';
import { List } from 'semantic-ui-react'
import AnswersItem from "./AnswerItem/AnswerItem";

import './answerList.css'

const AnswersList = (props) => {

    return (
        <List divided relaxed className={'list-wrapp'}>

            { props.answers.map((answer, index) => {
                return (
                    <AnswersItem
                        key={index}
                        answer={answer}
                        onAnswerClick={props.onAnswerClick}
                        answerState={props.answerState ? props.answerState[answer.id] : null}
                    />
                )
            }) }

            {/*{*/}
            {/*     props.answers.map((answer, i) => {*/}
            {/*        return (*/}
            {/*            <AnswersItem*/}
            {/*                // key={i}*/}
            {/*                // {...answer}*/}
            {/*                // onAnswerClick={onAnswerClick}*/}
            {/*                // answerState={*/}
            {/*                //     answerState ?*/}
            {/*                //         answerState[answer.id]*/}
            {/*                //         : null*/}
            {/*                // }*/}

            {/*                key={i}*/}
            {/*                answer={answer}*/}
            {/*                onAnswerClick={props.onAnswerClick}*/}
            {/*                state={props.state ? props.state[answer.id] : null}*/}
            {/*            />*/}
            {/*        )*/}

            {/*    })*/}
            {/*}*/}

        </List>
    );
};
export default AnswersList;