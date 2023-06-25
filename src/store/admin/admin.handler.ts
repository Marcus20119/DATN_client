import { call, put } from 'redux-saga/effects';
import { handleHideBaseModal, setBaseState } from '../base/base.slice';

import {
  GetAllDataFromProjectType,
  GetAllDataFromStaffType,
  GetAllDataFromUserType,
  ProjectDataType,
  StaffDataType,
  UserDataType,
} from '../rootType';
import {
  requestAdminActivateUser,
  requestAdminDeactivateUser,
  requestAdminFinishProject,
  requestAdminGetAllDataFromProject,
  requestAdminGetAllDataFromStaff,
  requestAdminGetAllDataFromUser,
  requestAdminHardDeleteUser,
  requestAdminRestoreStaff,
  requestAdminRestoreUser,
  requestAdminSoftDeleteStaff,
  requestAdminSoftDeleteUser,
  requestAdminUnfinishProject,
} from './admin.request';
import {
  forceRefetchAdminProjectsData,
  forceRefetchAdminStaffsData,
  forceRefetchAdminUsersData,
  setAdminState,
} from './admin.slice';

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

export function* handleAdminGetAllDataFromStaff(action: {
  type: string;
  payload: GetAllDataFromStaffType;
}) {
  yield put(setAdminState({ state: 'loadingGetStaffsData', value: true }));
  try {
    const { data } = yield call(
      requestAdminGetAllDataFromStaff,
      action.payload
    );
    if (data) {
      console.log('data:', data);
      const staffsData: StaffDataType[] = data.data;
      const tableTotalPage: number = data.totalPages;
      yield put(setAdminState({ state: 'staffsData', value: staffsData }));
      yield put(
        setAdminState({ state: 'tableTotalPage', value: tableTotalPage })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setAdminState({ state: 'loadingGetStaffsData', value: false }));
  }
}

export function* handleAdminGetAllDataFromProject(action: {
  type: string;
  payload: GetAllDataFromProjectType;
}) {
  yield put(setAdminState({ state: 'loadingGetProjectsData', value: true }));
  try {
    const { data } = yield call(
      requestAdminGetAllDataFromProject,
      action.payload
    );
    if (data) {
      const projectsData: ProjectDataType[] = data.data;
      const tableTotalPage: number = data.totalPages;
      yield put(setAdminState({ state: 'projectsData', value: projectsData }));
      yield put(
        setAdminState({ state: 'tableTotalPage', value: tableTotalPage })
      );
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setAdminState({ state: 'loadingGetProjectsData', value: false }));
  }
}

export function* handleAdminSoftDeleteUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminSoftDeleteUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminSoftDeleteStaff(action: {
  type: string;
  payload: StaffDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminSoftDeleteStaff, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminStaffsData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminRestoreUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminRestoreUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminRestoreStaff(action: {
  type: string;
  payload: StaffDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminRestoreStaff, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminStaffsData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminActivateUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminActivateUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminDeactivateUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminDeactivateUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminHardDeleteUser(action: {
  type: string;
  payload: UserDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminHardDeleteUser, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminUsersData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminFinishProject(action: {
  type: string;
  payload: ProjectDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminFinishProject, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminProjectsData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
export function* handleAdminUnFinishProject(action: {
  type: string;
  payload: ProjectDataType['id'];
}) {
  yield put(setBaseState({ state: 'loadingModalConfirm', value: true }));
  try {
    yield call(requestAdminUnfinishProject, action.payload);
    yield put(handleHideBaseModal());
    yield put(forceRefetchAdminProjectsData());
  } catch (err) {
    console.log(err);
  } finally {
    yield put(setBaseState({ state: 'loadingModalConfirm', value: false }));
  }
}
