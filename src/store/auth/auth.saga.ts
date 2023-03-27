import { takeEvery, takeLatest } from 'redux-saga/effects';
import { actionSignIn, actionSignUp } from './auth.action';
import { handleSignIn, handleSignUp } from './auth.handler';

export default function* authSaga() {
  yield takeLatest(actionSignUp.type, handleSignUp);
  yield takeLatest(actionSignIn.type, handleSignIn);
}
