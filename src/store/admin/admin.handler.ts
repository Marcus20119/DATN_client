import { call, put, select } from 'redux-saga/effects';
import { IRootState } from '../rootReducer';

import { GetAllDataFromUserType, UserDataType } from '../rootType';
import { requestAdminGetAllDataFromUser } from './admin.request';
import { setAdminState } from './admin.slice';

export function* handleAdminGetAllDataFromUser(action: {
  type: string;
  payload: GetAllDataFromUserType;
}) {
  yield put(setAdminState({ state: 'loadingGetUsersData', value: true }));
  try {
    const { data } = yield call(requestAdminGetAllDataFromUser, action.payload);
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
