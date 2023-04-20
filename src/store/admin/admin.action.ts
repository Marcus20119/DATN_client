import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromUserType } from '../rootType';

export const actionAdminGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('ADMIN/GET-ALL-DATA-FROM_USER');
