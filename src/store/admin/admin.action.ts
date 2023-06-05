import { createAction } from '@reduxjs/toolkit';
import {
  GetAllDataFromProjectType,
  GetAllDataFromStaffType,
  GetAllDataFromUserType,
  ProjectDataType,
  StaffDataType,
  UserDataType,
} from '../rootType';

export const actionAdminGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('ADMIN/GET-ALL-DATA-FROM-USER');
export const actionAdminGetAllDataFromStaff =
  createAction<GetAllDataFromStaffType>('ADMIN/GET-ALL-DATA-FROM-STAFF');
export const actionAdminGetAllDataFromProject =
  createAction<GetAllDataFromProjectType>('ADMIN/GET-ALL-DATA-FROM-PROJECT');

export const actionAdminSoftDeleteUser = createAction<UserDataType['id']>(
  'ADMIN/SOFT-DELETE-USER'
);
export const actionAdminSoftDeleteStaff = createAction<StaffDataType['id']>(
  'ADMIN/SOFT-DELETE-STAFF'
);
export const actionAdminRestoreUser =
  createAction<UserDataType['id']>('ADMIN/RESTORE-USER');
export const actionAdminRestoreStaff = createAction<StaffDataType['id']>(
  'ADMIN/RESTORE-STAFF'
);
export const actionAdminActivateUser = createAction<UserDataType['id']>(
  'ADMIN/ACTIVATE-USER'
);
export const actionAdminDeactivateUser = createAction<UserDataType['id']>(
  'ADMIN/DEACTIVATE-USER'
);
export const actionAdminHardDeleteUser = createAction<UserDataType['id']>(
  'ADMIN/HARD-DELETE-USER'
);
export const actionAdminFinishProject = createAction<ProjectDataType['id']>(
  'ADMIN/FINISH-PROJECT'
);
export const actionAdminUnFinishProject = createAction<ProjectDataType['id']>(
  'ADMIN/UNFINISH-PROJECT'
);
