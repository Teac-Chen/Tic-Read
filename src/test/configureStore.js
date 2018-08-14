import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers';

const loggerMiddleware = createLogger();

export default function configureStore(perloadedState) {
  return createStore(
    rootReducer,
    perloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
    ),
  );
}
