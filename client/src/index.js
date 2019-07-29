import React from 'react';
import ReactDOM from 'react-dom';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './css/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {store} from "./store/configuration";
import {Provider} from "react-redux";
import {AUTHENTICATED} from "./store/dataMapping/auth";
import {CONNECT_TO_DEFAULT_SOCKET} from "./store/dataMapping/socket";

const user = localStorage.getItem('user');
if(user) {
    store.dispatch({ type: AUTHENTICATED });
    store.dispatch({ type: CONNECT_TO_DEFAULT_SOCKET});
}

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
