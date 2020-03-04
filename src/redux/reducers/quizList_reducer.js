import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,

} from '../actions/actionsTypes'

const initialState = {
    quizes: [],
    loading: true,
    error: null,
    results: {},
    isFinish: false,
    activeQuestions: 0,
    answerState: null,
    quiz: null,
};

export default function quizListReducer( state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state,
                loading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                quizes: action.quizes,
                loading: false
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state,
                loading: false,
                quiz: action.quiz
            };

        default:
            return state
    }
}