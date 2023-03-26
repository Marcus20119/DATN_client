import { createAction } from '@reduxjs/toolkit';
import { TestType } from './admin.type';

export const actionTest = createAction<TestType>('ADMIN/GET-USERS-DATA');
