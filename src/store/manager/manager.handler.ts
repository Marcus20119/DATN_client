import { call, put, select } from 'redux-saga/effects';

import { requestManagerGetAllDataFromUser } from './manager.request';
import { GetAllDataFromUserType, UserDataType } from '../rootType';
import { setManagerState } from './manager.slice';
import { IRootState } from '../rootReducer';

export function* handleManagerGetAllDataFromUser(action: {
  type: string;
  payload: GetAllDataFromUserType;
}) {
  yield put(setManagerState({ state: 'loadingGetUsersData', value: true }));
  try {
    const { userData } = yield select((state: IRootState) => state.auth);
    console.log('userData:', userData);
    const { data } = yield call(requestManagerGetAllDataFromUser, {
      ...action.payload,
      project: userData.project_key,
    });
    if (data) {
      const usersData: UserDataType[] = data.data;
      const tableTotalPage: number = data.totalPages;
      yield put(setManagerState({ state: 'usersData', value: usersData }));
      yield put(
        setManagerState({ state: 'tableTotalPage', value: tableTotalPage })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setManagerState({ state: 'loadingGetUsersData', value: false }));
  }
}
