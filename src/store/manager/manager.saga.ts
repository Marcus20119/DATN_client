import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionManagerGetAllDataFromUser } from './manager.action';
import { handleManagerGetAllDataFromUser } from './manager.handler';

export default function* managerSaga() {
  yield takeLatest(
    actionManagerGetAllDataFromUser.type,
    handleManagerGetAllDataFromUser
  );
}
