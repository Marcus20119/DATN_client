import { createAction } from '@reduxjs/toolkit';
import { GetAllDataFromErrorType } from '../rootType';

export const actionClientGetAllDataFromError =
  createAction<GetAllDataFromErrorType>('CLIENT/GET-ALL-DATA-FROM-ERROR');
