import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,

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
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            };
        case FINISH_QUIZ:
            return {
                ...state,
                isFinish: true,
            };
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                answerState: null,
                activeQuestions: action.number
            };
        case QUIZ_RETRY:
            return {
                ...state,
                activeQuestions: 0,
                answerState: null,
                isFinish: false,
                results: {}
            };

        default:
            return state
    }
}