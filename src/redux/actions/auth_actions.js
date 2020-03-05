import axios from 'axios'

import {AUTH_SUCCESS, LOGOUT} from '../actions/actionsTypes'


export const auth = (email, password, isLogin) => {
    return async dispatch => {
        const authData = {
            email,
            password,
            returnSecureToken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA3HRrpLACHD6TPwoQ_PLSKPJtXEs98VK4';

        if(isLogin) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA3HRrpLACHD6TPwoQ_PLSKPJtXEs98VK4'
        }

        const res = await axios.post(url, authData);
        const data = res.data;
        const expirationDate = new Date(new Date().getTime() + data.expiresIn * 1000);

        console.log(data)

        localStorage.setItem('token', data.idToken);
        localStorage.setItem('userId', data.localId);
        localStorage.setItem('expirationDate', expirationDate);

        dispatch(authSuccess(data.idToken));
        dispatch(autoLogout(data.expiresIn));

    }
};

export const authSuccess = (token) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expirationDate');

    return {
        type: AUTH_SUCCESS,
        token,
    }
};
export const logout = () => {
    return {
        type: LOGOUT,

    }
};
export const autoLogout = (time) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, time * 1000)
    }
};