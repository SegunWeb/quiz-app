import React, {Component} from 'react';
import {Link} from "react-router-dom";
import axios from '../../axios/axiosQuiz'
import Loader from '../../component/UI/Loader/Loader'

class QuizList extends Component {

    state = {
        quizes: [],
        loading: true,
    };

    renderQuizes = () => {
        return this.state.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <Link to={'/quiz/' + quiz.id  }>{quiz.name}</Link>
                </li>
            )
        })
    };

    async componentDidMount() {
        try {
            const res = await axios.get('/quizes.json');
            const quizes = [];

            Object.keys(res.data).forEach((key, i) => {
                quizes.push({
                    id: key,
                    name: `тест №${i + 1}`,
                })
            });
            this.setState({
                quizes,
                loading: false
            })
        }
        catch(e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div>
                <h1>Quiz list</h1>
                { this.state.loading ?
                    <Loader/>
                    : <ul>{this.renderQuizes()}</ul>
                }
            </div>
        );
    }
}

export default QuizList;