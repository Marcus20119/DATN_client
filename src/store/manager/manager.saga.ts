import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  actionManagerActivateUser,
  actionManagerDeactivateUser,
  actionManagerGetAllDataFromUser,
  actionManagerHardDeleteUser,
  actionManagerRestoreUser,
  actionManagerSoftDeleteUser,
} from './manager.action';
import {
  handleManagerActivateUser,
  handleManagerDeactivateUser,
  handleManagerGetAllDataFromUser,
  handleManagerHardDeleteUser,
  handleManagerRestoreUser,
  handleManagerSoftDeleteUser,
} from './manager.handler';

export default function* managerSaga() {
  yield takeLatest(
    actionManagerGetAllDataFromUser.type,
    handleManagerGetAllDataFromUser
  );
  yield takeLatest(
    actionManagerSoftDeleteUser.type,
    handleManagerSoftDeleteUser
  );
  yield takeLatest(actionManagerRestoreUser.type, handleManagerRestoreUser);
  yield takeLatest(actionManagerActivateUser.type, handleManagerActivateUser);
  yield takeLatest(
    actionManagerDeactivateUser.type,
    handleManagerDeactivateUser
  );
  yield takeLatest(
    actionManagerHardDeleteUser.type,
    handleManagerHardDeleteUser
  );
}
