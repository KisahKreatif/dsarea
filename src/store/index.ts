import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { user, training, icon, cart, review } from './reducers'

export default createStore(combineReducers({
  user, training, icon, cart, review
}), compose(applyMiddleware(thunk)))
