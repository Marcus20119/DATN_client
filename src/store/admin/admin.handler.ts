import { call, put } from 'redux-saga/effects';

import { requestGetAllDataFromUsers } from './admin.request';
import { AllDataFromUsersType } from './admin.type';
import { UserDataType } from '../rootType';
import { setAdminState } from './admin.slice';

export function* handleGetAllDataFromUsers(action: {
  type: string;
  payload: AllDataFromUsersType;
}) {
  yield put(setAdminState({ state: 'loadingGetUsersData', value: true }));
  try {
    const { data } = yield call(requestGetAllDataFromUsers, action.payload);
    if (data) {
      const usersData: UserDataType[] = data.data;
      const tableTotalPage: number = data.totalPages;
      yield put(setAdminState({ state: 'usersData', value: usersData }));
      yield put(
        setAdminState({ state: 'tableTotalPage', value: tableTotalPage })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setAdminState({ state: 'loadingGetUsersData', value: false }));
  }
}
