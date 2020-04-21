import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';
import employeesReducer from './reducer/employees';
import commonReducer from './reducer/common';

const rootReducer = combineReducers({
  common: commonReducer,
  employees: employeesReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
