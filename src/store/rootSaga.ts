import { all, fork } from 'redux-saga/effects';
import adminSaga from './admin/admin.saga';
import authSaga from './auth/auth.saga';
import clientSaga from './client/client.saga';
import managerSaga from './manager/manager.saga';

export default function* allSagas() {
  yield all([
    fork(authSaga),
    fork(adminSaga),
    fork(managerSaga),
    fork(clientSaga),
  ]);
}
