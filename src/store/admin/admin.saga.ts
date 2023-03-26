import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionTest } from './admin.action';
import { handleTest } from './admin.handler';

export default function* adminSaga() {
  yield takeLatest(actionTest.type, handleTest);
}
