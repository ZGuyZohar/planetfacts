import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk'
import { planetReducer } from './reducers/planetReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    planetReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))