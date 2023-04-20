import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromUserType } from '../rootType';

export const actionManagerGetAllDataFromUser =
  createAction<GetAllDataFromUserType>('MANAGER/GET-ALL-DATA-FROM-USER');
