import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css';
import {createStore, compose, applyMiddleware} from "redux";
import {Provider} from 'react-redux';
import rootReducers from "./redux/reducers/rootReducers";
import thunk from 'redux-thunk';


const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(
    rootReducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )

);

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);


ReactDOM.render(app, document.getElementById('root'));


