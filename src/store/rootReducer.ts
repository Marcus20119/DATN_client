import { combineReducers } from 'redux';
import adminReducer from './admin/admin.slice';
import managerReducer from './manager/manager.slice';
import authReducer from './auth/auth.slice';
import baseReducer from './base/base.slice';
import clientReducer from './client/client.slice';

export const reducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  manager: managerReducer,
  client: clientReducer,
  base: baseReducer,
});
export type IRootState = ReturnType<typeof reducer>;
