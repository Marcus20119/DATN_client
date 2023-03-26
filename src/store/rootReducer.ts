import { combineReducers } from 'redux';
import adminReducer from './admin/admin.slice';

export const reducer = combineReducers({
  admin: adminReducer,
});
export type IRootState = ReturnType<typeof reducer>;
