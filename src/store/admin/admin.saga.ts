import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  actionAdminActivateUser,
  actionAdminDeactivateUser,
  actionAdminGetAllDataFromUser,
  actionAdminHardDeleteUser,
  actionAdminRestoreUser,
  actionAdminSoftDeleteUser,
} from './admin.action';
import {
  handleAdminActivateUser,
  handleAdminDeactivateUser,
  handleAdminGetAllDataFromUser,
  handleAdminHardDeleteUser,
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
  yield takeLatest(actionAdminActivateUser.type, handleAdminActivateUser);
  yield takeLatest(actionAdminDeactivateUser.type, handleAdminDeactivateUser);
  yield takeLatest(actionAdminHardDeleteUser.type, handleAdminHardDeleteUser);
}
