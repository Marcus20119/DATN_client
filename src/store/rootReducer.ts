import { combineReducers } from 'redux';
import adminReducer from './admin/admin.slice';
import authReducer from './auth/auth.slice';
import baseReducer from './base/base.slice';

export const reducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  base: baseReducer,
});
export type IRootState = ReturnType<typeof reducer>;
