import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromUserType, UserDataType } from '../rootType';

export const actionAdminGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('ADMIN/GET-ALL-DATA-FROM-USER');

export const actionAdminSoftDeleteUser = createAction<UserDataType['id']>(
  'ADMIN/SOFT-DELETE-USER'
);
export const actionAdminRestoreUser =
  createAction<UserDataType['id']>('ADMIN/RESTORE-USER');
export const actionAdminActivateUser = createAction<UserDataType['id']>(
  'ADMIN/ACTIVATE-USER'
);
export const actionAdminDeactivateUser = createAction<UserDataType['id']>(
  'ADMIN/DEACTIVATE-USER'
);
export const actionAdminHardDeleteUser = createAction<UserDataType['id']>(
  'ADMIN/HARD-DELETE-USER'
);
