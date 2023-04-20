import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionAdminGetAllDataFromUser } from './admin.action';
import { handleAdminGetAllDataFromUser } from './admin.handler';

export default function* adminSaga() {
  yield takeLatest(
    actionAdminGetAllDataFromUser.type,
    handleAdminGetAllDataFromUser
  );
}
