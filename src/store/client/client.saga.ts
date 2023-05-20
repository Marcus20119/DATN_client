import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionClientGetAllDataFromError } from './client.action';
import { handleClientGetAllDataFromError } from './client.handler';

export default function* clientSaga() {
  yield takeLatest(
    actionClientGetAllDataFromError.type,
    handleClientGetAllDataFromError
  );
}
