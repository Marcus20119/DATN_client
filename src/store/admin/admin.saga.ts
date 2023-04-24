import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  actionAdminGetAllDataFromUser,
  actionAdminRestoreUser,
  actionAdminSoftDeleteUser,
} from './admin.action';
import {
  handleAdminGetAllDataFromUser,
  handleAdminRestoreUser,
  handleAdminSoftDeleteUser,
} from './admin.handler';

export default function* adminSaga() {
  yield takeLatest(
    actionAdminGetAllDataFromUser.type,
    handleAdminGetAllDataFromUser
  );
  yield takeLatest(actionAdminSoftDeleteUser.type, handleAdminSoftDeleteUser);
  yield takeLatest(actionAdminRestoreUser.type, handleAdminRestoreUser);
}
