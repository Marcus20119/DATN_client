import { combineReducers } from 'redux';
import adminReducer from './admin/admin.slice';
import authReducer from './auth/auth.slice';

export const reducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
});
export type IRootState = ReturnType<typeof reducer>;
