import { all, fork } from 'redux-saga/effects';
import adminSaga from './admin/admin.saga';

export default function* allSagas() {
  yield all([fork(adminSaga)]);
}
