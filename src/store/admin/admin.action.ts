import { createAction } from '@reduxjs/toolkit';
import { AllDataFromUsersType } from './admin.type';

export const actionGetAllDataFromUsers = createAction<AllDataFromUsersType>(
  'ADMIN/GET-ALL-DATA-FROM_USERS'
);
