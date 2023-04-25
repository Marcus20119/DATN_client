import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromUserType, UserDataType } from '../rootType';

export const actionManagerGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('MANAGER/GET-ALL-DATA-FROM-USER');
export const actionManagerSoftDeleteUser = createAction<UserDataType['id']>(
  'MANAGER/SOFT-DELETE-USER'
);
export const actionManagerRestoreUser = createAction<UserDataType['id']>(
  'MANAGER/RESTORE-USER'
);
export const actionManagerActivateUser = createAction<UserDataType['id']>(
  'MANAGER/ACTIVATE-USER'
);
export const actionManagerDeactivateUser = createAction<UserDataType['id']>(
  'MANAGER/DEACTIVATE-USER'
);
export const actionManagerHardDeleteUser = createAction<UserDataType['id']>(
  'MANAGER/HARD-DELETE-USER'
);
