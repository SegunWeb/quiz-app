import {combineReducers} from "redux";
import quizListReducer from "./quizList_reducer";
import createReducer from "./create_reducer";
import authReducer from "./auth_reducer";

export default combineReducers({
    quiz: quizListReducer,
    create: createReducer,
    auth: authReducer,
})