import React, {Component} from 'react';
import ActiveQuiz from "../../component/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {

    state = {
        qiuz: []
    }

    render() {
        return (
            <div>
                <h3>quiz</h3>
                <ActiveQuiz/>
            </div>
        );
    }
}

export default Quiz;