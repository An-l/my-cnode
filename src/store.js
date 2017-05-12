import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


//组合之后的reducer
import reducer from './reducers';


const store = createStore(
    reducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);



export default store;