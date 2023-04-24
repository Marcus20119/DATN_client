import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromUserType, UserDataType } from '../rootType';

export const actionAdminGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('ADMIN/GET-ALL-DATA-FROM-USER');

export const actionAdminSoftDeleteUser = createAction<UserDataType['id']>(
  'ADMIN/SOFT-DELETE-USER'
);
export const actionAdminRestoreUser =
  createAction<UserDataType['id']>('ADMIN/RESTORE-USER');
