import {combineReducers} from "redux";
import quizListReducer from "./quizList_reducer";

export default combineReducers({
    quiz: quizListReducer
})