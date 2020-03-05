import {AUTH_SUCCESS, LOGOUT} from '../actions/actionsTypes'


const initialState = {
    token: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
            };
        case LOGOUT:
            return {
              ...state,
                token: null,
            };

        default:
            return state
    }
}