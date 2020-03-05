import axios from '../../axios/axiosQuiz'
import
{
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    QUIZ_NEXT_QUESTION,
    FINISH_QUIZ,
    QUIZ_RETRY,

} from './actionsTypes'

export const fetchQuizById = (quizId) => {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const res = await axios.get(`/quizes/${quizId}.json`);
            const quiz = res.data;
            dispatch(fetchQuizSuccess(quiz))
        }
        catch(error) {
            dispatch(fetchQuizesError(error))
        }
    }
};

export const fetchQuizSuccess = quiz => {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz,
    }
};

export const fetchQuizes = () => {
    return async dispatch => {
        dispatch(fetchQuizesStart());

        try {
            const res = await axios.get('/quizes.json');
            const quizes = [];

            Object.keys(res.data).forEach((key, i) => {
                quizes.push({
                    id: key,
                    name: `тест №${i + 1}`,
                })
            });
            dispatch(fetchQuizesSuccess(quizes))
        }
        catch(error) {
            console.log(error);
            dispatch(fetchQuizesError(error))
        }
    }
};
export const fetchQuizesStart = () => {
    return {
        type: FETCH_QUIZES_START,
    }
};
export const fetchQuizesSuccess = (quizes) => {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes
    }
};
export const fetchQuizesError = (error) => {
    return {
        type: FETCH_QUIZES_ERROR,
        error: error
    }
};

export const quizSetState = (answerState, results) => {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
};
export const finishQuiz = () => {
    return {
        type: FINISH_QUIZ,
    }
};

export const quizNextQuestion = (number) => {
    return {
        type: QUIZ_NEXT_QUESTION,
        number,
    }
};

export const isQuizFinished = (state) => {
    return state.activeQuestions + 1 === state.quiz.length;
};
export const retryQuiz = () => {
    return {
        type: QUIZ_RETRY,
    }
};

export const quizAnswerClick = (answerId) => {
    return (dispatch, getState) => {
        const state = getState().quiz;
        const {quiz, activeQuestions, answerState, results} = state;
        const question = quiz[activeQuestions];

        if(answerState) {
            const key = Object.keys(answerState)[0];
            if(answerState[key] === 'success') {
                return
            }
        }
        if(question.rightAnswerId === answerId) {
            if(!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(quizSetState({[answerId]: 'success'}, results));

            const timer = setTimeout(() => {
                if(isQuizFinished(state)){
                    dispatch(finishQuiz())
                } else {
                    dispatch(quizNextQuestion(state.activeQuestions + 1))
                }
                clearTimeout(timer)
            }, 500);
        } else {
            results[question.id] = 'error';
            dispatch(quizSetState({[answerId]: 'error'}, results));
        }
    }
};

