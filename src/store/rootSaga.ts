import { all, fork } from 'redux-saga/effects';
import adminSaga from './admin/admin.saga';
import authSaga from './auth/auth.saga';

export default function* allSagas() {
  yield all([fork(authSaga), fork(adminSaga)]);
}
