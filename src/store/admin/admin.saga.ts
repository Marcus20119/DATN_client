import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionGetAllDataFromUsers } from './admin.action';
import { handleGetAllDataFromUsers } from './admin.handler';

export default function* adminSaga() {
  yield takeLatest(actionGetAllDataFromUsers.type, handleGetAllDataFromUsers);
}
