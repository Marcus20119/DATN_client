import { call, put, select } from 'redux-saga/effects';

import {
  requestManagerActivateUser,
  requestManagerDeactivateUser,
  requestManagerGetAllDataFromUser,
  requestManagerHardDeleteUser,
  requestManagerRestoreUser,
  requestManagerSoftDeleteUser,
} from './manager.request';
import { GetAllDataFromUserType, UserDataType } from '../rootType';
import { forceRefetchManagerUsersData, setManagerState } from './manager.slice';
import { IRootState } from '../rootReducer';
import { handleHideBaseModal, setBaseState } from '../base/base.slice';

export function* handleManagerGetAllDataFromUser(action: {
  type: string;
  payload: GetAllDataFromUserType;
}) {
  yield put(setManagerState({ state: 'loadingGetUsersData', value: true }));
  try {
    const { userData } = yield select((state: IRootState) => state.auth);
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
export function* handleManagerSoftDeleteUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestManagerSoftDeleteUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchManagerUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleManagerRestoreUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestManagerRestoreUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchManagerUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleManagerActivateUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestManagerActivateUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchManagerUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleManagerDeactivateUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestManagerDeactivateUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchManagerUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleManagerHardDeleteUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestManagerHardDeleteUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchManagerUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
