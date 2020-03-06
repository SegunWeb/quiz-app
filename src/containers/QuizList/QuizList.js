import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizes} from '../../redux/actions/quizList_actions'

class QuizList extends Component {


    componentDidMount() {
        this.props.fetchQuizes()

    }

    renderQuizes = () => {
        return this.props.quizes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <Link to={'/quiz/' + quiz.id  }>{quiz.name}</Link>
                </li>
            )
        })
    };

    render() {
        return (
            <div>
                <h1>Quiz list</h1>
                { this.props.loading && this.props.quizes.length !== 0 ?
                    <Loader/>
                    : <ul>{this.renderQuizes()}</ul>
                }
            </div>
        );
    }
}

const mapStateToProps = ({quiz: {quizes,loading }}) => {
    return {
        quizes,
        loading
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
       fetchQuizes: () => dispatch(fetchQuizes())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizList);