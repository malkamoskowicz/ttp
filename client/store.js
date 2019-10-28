import { createStore, applyMiddleware } from 'redux';
import dummerReducer from './reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const store = createStore(
  dummerReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);

export default store;