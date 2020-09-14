import {createStore, applyMiddleware, compose} from 'redux'
import reducer from './reducers'
export const store = createStore(reducer)