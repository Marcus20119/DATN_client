import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  actionAdminActivateUser,
  actionAdminDeactivateUser,
  actionAdminGetAllDataFromProject,
  actionAdminGetAllDataFromStaff,
  actionAdminGetAllDataFromUser,
  actionAdminHardDeleteUser,
  actionAdminRestoreStaff,
  actionAdminRestoreUser,
  actionAdminSoftDeleteStaff,
  actionAdminSoftDeleteUser,
} from './admin.action';
import {
  handleAdminActivateUser,
  handleAdminDeactivateUser,
  handleAdminGetAllDataFromProject,
  handleAdminGetAllDataFromStaff,
  handleAdminGetAllDataFromUser,
  handleAdminHardDeleteUser,
  handleAdminRestoreStaff,
  handleAdminRestoreUser,
  handleAdminSoftDeleteStaff,
  handleAdminSoftDeleteUser,
} from './admin.handler';

export default function* adminSaga() {
  yield takeLatest(
    actionAdminGetAllDataFromUser.type,
    handleAdminGetAllDataFromUser
  );
  yield takeLatest(
    actionAdminGetAllDataFromStaff.type,
    handleAdminGetAllDataFromStaff
  );
  yield takeLatest(
    actionAdminGetAllDataFromProject.type,
    handleAdminGetAllDataFromProject
  );
  yield takeLatest(actionAdminSoftDeleteUser.type, handleAdminSoftDeleteUser);
  yield takeLatest(actionAdminSoftDeleteStaff.type, handleAdminSoftDeleteStaff);
  yield takeLatest(actionAdminRestoreUser.type, handleAdminRestoreUser);
  yield takeLatest(actionAdminRestoreStaff.type, handleAdminRestoreStaff);
  yield takeLatest(actionAdminActivateUser.type, handleAdminActivateUser);
  yield takeLatest(actionAdminDeactivateUser.type, handleAdminDeactivateUser);
  yield takeLatest(actionAdminHardDeleteUser.type, handleAdminHardDeleteUser);
}
