import React, {Component} from 'react';
import {Link} from "react-router-dom";

class QuizList extends Component {

    renderQuizes = () => {
        return [1,2,3].map((quiz, i) => {
            return (
                <li key={i}>
                    <Link to={'/quiz/' + quiz  }>Test {quiz}</Link>
                </li>
            )
        })
    };

    render() {
        return (
            <div>
                <h1>Quiz list</h1>
                <ul>
                    { this.renderQuizes() }
                </ul>
            </div>
        );
    }
}

export default QuizList;