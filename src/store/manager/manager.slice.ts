import { createSlice } from '@reduxjs/toolkit';
import { UserDataType } from '../rootType';

type InitialStateType = {
  usersData: UserDataType[];
  loadingGetUsersData: boolean;
  tableTotalPage: number;
};
type ManagerStateType<T extends keyof InitialStateType> = {
  state: T;
  value: InitialStateType[T];
};
const initialState: InitialStateType = {
  usersData: [],
  loadingGetUsersData: false,
  tableTotalPage: 1,
};

export const managerSlice = createSlice({
  name: 'manager',
  initialState,
  reducers: {
    setManagerState: (
      state,
      { payload }: { payload: ManagerStateType<keyof InitialStateType> }
    ) => ({
      ...state,
      [payload.state]: payload.value,
    }),
  },
});

// Action creators are generated for each case reducer function
export const { setManagerState } = managerSlice.actions;

export default managerSlice.reducer;
