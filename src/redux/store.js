import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';

import reducer from './upload.reducer'; 
import uploadSaga from './upload.saga'; 

const sagaMiddleware = createSagaMiddleware();


const store = createStore(
    reducer,
  // adds all middleware to our project including saga and logger
    applyMiddleware(sagaMiddleware, logger),
);

// tells the saga middleware to use the saga
sagaMiddleware.run(uploadSaga);

export default store;