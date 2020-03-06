import React, {Component, Fragment } from 'react';
import Input from "../../components/UI/Input/Input";
import SelectIn from "../../components/UI/Select/Select";
import {Button, Form} from "semantic-ui-react";
import {createControl, validate, validateForm} from '../../formFrame/FormFramework'
import {connect} from 'react-redux'
import {finishCreateQuiz, createQuizQuestion} from '../../redux/actions/create_actions'

import './qiuz-creactor.css'


function createOptionsControl(number) {
    return createControl({
        label: `Вариант ${number}`,
        errorMessage: `Вариант ответа ${number} не может быть пустым`,
        id: number,
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
            option1: createOptionsControl(1),
        option2: createOptionsControl(2),
        option3: createOptionsControl(3),
        option4: createOptionsControl(4),
    }
}


class QuizCreator extends Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
    };

    subHandler = (e) => {
        e.preventDefault()
    };

    addQuestionHandler = (e) => {
        e.preventDefault();

        // const quiz = this.props.quiz.concat();
        // const index = quiz.length + 1;
        const {question, option1, option2, option3, option4 } = this.state.formControls;

        const questionItem = {
            question: question.value,
            id: this.props.quiz.length + 1,
            rightAnswerId: this.state.rightAnswerId,
            answer: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id}
            ]
        };

        this.props.createQuizQuestion(questionItem);

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        })
    };

    createQuizHandler = (e) => {
        e.preventDefault();

        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls(),
        });
        this.props.finishCreateQuiz()
    };

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};

        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;

        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })
    };

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, i) => {
            const controls = this.state.formControls[controlName];
            return (
                <Fragment
                    key={controlName + i}>
                 <Input
                    value={controls.value}
                    valid={controls.valid}
                    touched={controls.touched}
                    label={controls.label}
                    errorMessage={controls.errorMessage}
                    shouldValidate={!!controls.validation}
                    onChange={e => this.onChangeHandler(e.target.value, controlName)}
                 />
                {i === 0 ? <hr /> : null}
                </Fragment>
            )
        })
    };

    selectChangeHandler = (e) => {
        this.setState({
            rightAnswerId: +e.target.value,
        })
    };

    render() {
        return (
            <div className='qc-wrap'>
                <h1 className='qc-title'>Quiz creator</h1>
                <Form onSubmit={this.subHandler}>
                    {this.renderControls() }

                    <hr/>
                    <SelectIn
                        label='Выберите праильный ответ'
                        value={this.state.rightAnswerId}
                        onChange={this.selectChangeHandler}
                        options={[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4},
                        ]}
                    />

                    <Button
                        color='blue'
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >Add questions</Button>
                    <Button
                        color='green'
                        onClick={this.createQuizHandler}
                        disabled={this.props.quiz.length === 0}
                    >Create quiz</Button>
                </Form>
            </div>
        );
    }
}

const mapStateToProps = ({create: {quiz}}) => {
    return {
        quiz
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        createQuizQuestion: item => dispatch(createQuizQuestion(item)),
        finishCreateQuiz: () => dispatch(finishCreateQuiz()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator);