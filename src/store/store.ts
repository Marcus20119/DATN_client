import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { reducer } from './rootReducer';
import allSagas from './rootSaga';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer,
  middleware: gDM => gDM().concat(sagaMiddleware),
});

sagaMiddleware.run(allSagas);
