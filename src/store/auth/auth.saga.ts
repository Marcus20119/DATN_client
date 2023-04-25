import { takeEvery, takeLatest } from 'redux-saga/effects';
import {
  actionGetThisUserData,
  actionSignIn,
  actionSignUp,
} from './auth.action';
import {
  handleGetThisUserData,
  handleSignIn,
  handleSignUp,
} from './auth.handler';

export default function* authSaga() {
  yield takeLatest(actionSignUp.type, handleSignUp);
  yield takeLatest(actionSignIn.type, handleSignIn);
  yield takeLatest(actionGetThisUserData.type, handleGetThisUserData);
}
