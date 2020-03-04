import axios from '../../axios/axiosQuiz'
import
{
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS

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