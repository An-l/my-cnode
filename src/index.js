import React from 'react';
import {render} from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Router,browserHistory,hashHistory } from 'react-router';
import {Provider} from 'react-redux';

import store from './store'
import routes from './routes';

import 'normalize.css';
import './index.scss';
// import 'flex.css/dist/data-flex.css';
import App from './containers/App';

render(
    (     
        <Provider store={store}>
            <Router routes={routes} history={hashHistory}/>
        </Provider>
    
    ), document.getElementById('app')
);

if(process.env.NODE_ENV === 'production') {
    console.log('production');
} else {
    console.log('dev');
}